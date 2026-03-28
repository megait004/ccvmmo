<template>
  <div class="min-h-screen bg-gray-50">
    <div class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-7xl px-4 py-4">
        <nav class="flex items-center space-x-2 text-sm">
          <NuxtLink
            to="/"
            class="text-gray-500 transition hover:text-orange-600"
            >Home</NuxtLink
          >
          <FontAwesomeIcon
            :icon="faChevronRight"
            class="h-3 w-3 text-gray-400"
          />
          <NuxtLink to="/products" class="text-gray-500 transition hover:text-orange-600">
            Products
          </NuxtLink>
          <FontAwesomeIcon
            :icon="faChevronRight"
            class="h-3 w-3 text-gray-400"
          />
          <span class="font-medium text-gray-900">{{
            product.name || "Loading..."
          }}</span>
        </nav>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:py-12">
      <div v-if="pending" class="flex min-h-[320px] items-center justify-center">
        <div
          class="h-12 w-12 animate-spin rounded-full border-b-2 border-orange-500"
        ></div>
      </div>

      <div
        v-else-if="!productData"
        class="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm"
      >
        <div class="text-2xl font-bold text-gray-900">Product not found</div>
        <div class="mt-2 text-sm text-gray-500">
          The link may no longer be valid or the product has been removed from the store.
        </div>
        <NuxtLink
          to="/products"
          class="mt-6 inline-flex rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
        >
          Back to products
        </NuxtLink>
      </div>

      <div v-else class="space-y-10">
        <div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div class="space-y-4">
            <ProductGallery
              :images="productImages"
              :selectedLabel="selectedColor"
              :discount="product.discount"
              :name="product.name"
            />
          </div>

          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div
                v-for="highlight in serviceHighlights"
                :key="highlight.label"
                class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <FontAwesomeIcon :icon="highlight.icon" class="h-4 w-4" />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-gray-900">{{ highlight.label }}</div>
                    <div class="text-xs text-gray-500">{{ highlight.value }}</div>
                  </div>
                </div>
              </div>
            </div>

            <ProductInfo
              :product="product"
              :selectedVariantId="selectedVariantId"
              :selectedSize="selectedSize"
              :quantity="quantity"
              @update:variant="selectedVariantId = $event"
              @update:size="selectedSize = $event"
              @update:quantity="quantity = $event"
              @add-to-cart="handleAddToCart"
            />
          </div>
        </div>

        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <ProductTabs :product="product" />
        </div>

        <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <ProductReviews />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronRight,
  faShippingFast,
  faUndo,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

import ProductGallery from "~/components/product/ProductGallery.vue";
import ProductInfo from "~/components/product/ProductInfo.vue";
import ProductTabs from "~/components/product/ProductTabs.vue";
import ProductReviews from "~/components/product/ProductReviews.vue";

const productSizes = [
  "small",
  "medium",
  "large",
  "large tall",
  "x-large",
  "2x-large",
  "3x-large",
  "4x-large",
];

const serviceHighlights = [
  {
    icon: faShippingFast,
    label: "Fast Delivery",
    value: "Free on orders over $30",
  },
  {
    icon: faUndo,
    label: "Returns",
    value: "Supported within 30 days",
  },
  {
    icon: faCreditCard,
    label: "Payment",
    value: "Secure and safe",
  },
];

const selectedVariantId = ref(null);
const selectedSize = ref("medium");
const quantity = ref(1);

const route = useRoute();
const slug = route.params.slug;

const { data: productData, pending } = await useFetch("/api/admin/product", {
  server: true,
  transform: (response) => {
    if (response.success && Array.isArray(response.data) && response.data.length > 0) {
      return response.data.find((p) => String(p.id) === String(slug)) ?? null;
    }
    return null;
  },
});

const fallbackVariant = {
  id: 0,
  product_id: 0,
  color_code: "#D1D5DB",
  color_name: "Default",
  image: "",
  price: 0,
  stock: 0,
  is_active: 1,
  is_default: 1,
  display_order: 0,
};

const getParsedImages = (images) => {
  if (typeof images !== "string" || images.trim() === "") {
    return [];
  }

  try {
    const parsedImages = JSON.parse(images);
    return Array.isArray(parsedImages)
      ? parsedImages.filter((image) => typeof image === "string" && image.trim() !== "")
      : [];
  } catch {
    return [];
  }
};

const getNormalizedVariants = (data) => {
  if (!data) {
    return [fallbackVariant];
  }

  const variants = Array.isArray(data.variants) ? data.variants : [];
  const activeVariants = variants.filter((variant) => Number(variant.is_active) !== 0);

  if (activeVariants.length > 0) {
    return activeVariants;
  }

  const fallbackImages = getParsedImages(data.images);

  return [
    {
      ...fallbackVariant,
      product_id: data.id || 0,
      image: fallbackImages[0] || "",
      price: Number(data.price) || 0,
      stock: Number(data.stock) || 0,
    },
  ];
};

const getDefaultVariantId = (variants) => {
  return (
    variants.find((variant) => Number(variant.is_default) === 1)?.id ??
    variants[0]?.id ??
    null
  );
};

watch(
  productData,
  (newData) => {
    const variants = getNormalizedVariants(newData);
    selectedVariantId.value = getDefaultVariantId(variants);
    quantity.value = 1;
  },
  { immediate: true },
);

const variants = computed(() => {
  return getNormalizedVariants(productData.value);
});

const selectedVariant = computed(() => {
  return (
    variants.value.find(
      (variant) => String(variant.id) === String(selectedVariantId.value),
    ) ?? variants.value[0]
  );
});

const selectedColor = computed(() => {
  return selectedVariant.value?.color_name || "Default";
});

watch(
  selectedVariant,
  (variant) => {
    const maxStock = Math.max(Number(variant?.stock) || 0, 1);
    quantity.value = Math.min(Math.max(quantity.value, 1), maxStock);
  },
  { immediate: true },
);

const product = computed(() => {
  if (!productData.value) {
    return {
      id: null,
      name: "",
      description: "",
      price: 0,
      discount: 0,
      care_instructions: "",
      images: "[]",
      stock: 0,
      originalPrice: 0,
      salePrice: 0,
      selectedVariant: fallbackVariant,
      variants: [fallbackVariant],
      sizes: productSizes,
      features: [],
      careInstructions: [],
    };
  }

  const data = productData.value;
  const basePrice = Number(data.price) || 0;
  const discount = Number(data.discount) || 0;
  const currentVariant = selectedVariant.value ?? fallbackVariant;
  const currentPrice = Number(currentVariant.price) || basePrice;
  const currentStock = Number(currentVariant.stock) || 0;

  return {
    id: data.id,
    name: data.name || "",
    description: data.description || "",
    price: currentPrice,
    discount,
    care_instructions: data.care_instructions || "",
    images: data.images || "[]",
    stock: currentStock,
    originalPrice: currentPrice,
    salePrice: currentPrice - (currentPrice * discount) / 100,
    selectedVariant: currentVariant,
    variants: variants.value,
    sizes: productSizes,
    features: [],
    careInstructions: data.care_instructions
      ? data.care_instructions.split("\n")
      : [],
  };
});

const productImages = computed(() => {
  const variantImage = selectedVariant.value?.image?.trim() || "";
  const fallbackImages = getParsedImages(productData.value?.images);
  const mergedImages = [variantImage, ...fallbackImages].filter(
    (image, index, allImages) => image && allImages.indexOf(image) === index,
  );

  return mergedImages.length > 0 ? mergedImages : ["/img/cotton_short.webp"];
});

const { addToCart } = useCart();

const handleAddToCart = () => {
  if (!selectedVariant.value || product.value.stock <= 0) {
    return;
  }

  const productWithImage = {
    ...product.value,
    image: selectedVariant.value.image || productImages.value[0],
    variantId: selectedVariant.value.id,
  };

  addToCart(
    productWithImage,
    selectedVariant.value,
    selectedSize.value,
    quantity.value,
  );
  navigateTo("/checkout");
};

const formatPriceForTitle = (price) => {
  const normalizedPrice = Number(price) || 0;
  return `$${normalizedPrice.toFixed(2)}`;
};

useHead(() => ({
  title: product.value.name
    ? `${product.value.name} - ${formatPriceForTitle(product.value.salePrice)}`
    : "Product",
  meta: [
    {
      name: "description",
      content:
        product.value.description ||
        "Premium quality product with great discount.",
    },
  ],
}));

definePageMeta({
  layout: "default",
});
</script>
