<template>
  <div class="space-y-6 sm:space-y-8 animate-fade-in-delayed">
    <div class="space-y-4">
      <div
        class="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold animate-bounce-gentle shadow-lg"
      >
        <FontAwesomeIcon :icon="faFire" class="w-4 h-4 animate-flicker" />
        Hot Deal
      </div>

      <div class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        {{ product.name }}
      </div>

      <div class="flex flex-wrap items-center gap-4 mb-4">
        <div class="flex items-center gap-3">
          <span
            class="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
            >{{ formatPrice(product.salePrice) }}</span
          >
          <span class="text-xl sm:text-2xl text-gray-500 line-through"
            >{{ formatPrice(product.originalPrice) }}</span
          >
        </div>
        <div
          class="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-slow"
        >
          Save {{ product.discount }}%
        </div>
      </div>

      <div class="flex items-center gap-3 text-sm text-gray-600">
        <div class="flex items-center">
          <FontAwesomeIcon
            v-for="i in 5"
            :key="i"
            :icon="faStar"
            class="w-4 h-4"
            :class="i <= 4 ? 'text-yellow-400' : 'text-gray-300'"
          />
        </div>
        <span class="font-medium text-gray-900">4.8</span>
        <span>(2,847 reviews)</span>
        <span v-if="product.stock > 0" class="text-blue-600 font-medium"
          >✓ {{ product.stock }} In Stock</span
        >
        <span v-else class="text-red-600 font-medium">✗ Out of Stock</span>
      </div>
    </div>

    <div class="space-y-6">
      <div>
        <h3 class="block text-lg font-bold text-gray-900 mb-4">Choose Color</h3>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="variant in product.variants"
            :key="variant.id"
            type="button"
            @click="$emit('update:variant', variant.id)"
            :title="variant.color_name"
            :style="{ backgroundColor: variant.color_code || '#D1D5DB' }"
            class="relative w-10 h-10 rounded-full shadow-md transition-all duration-200 focus:outline-none"
            :class="[
              String(variant.id) === String(selectedVariantId)
                ? 'ring-[3px] ring-orange-500 ring-offset-2 scale-110'
                : 'hover:ring-2 hover:ring-orange-300 hover:ring-offset-1 hover:scale-110',
              Number(variant.stock) <= 0 ? 'opacity-40 cursor-not-allowed' : ''
            ]"
          >
            <FontAwesomeIcon
              v-if="String(variant.id) === String(selectedVariantId)"
              :icon="faCheck"
              class="absolute inset-0 m-auto h-3.5 w-3.5 text-white drop-shadow"
            />
          </button>
        </div>
      </div>

      <div>
        <h3 class="block text-lg font-bold text-gray-900 mb-4">Choose Size</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          <button
            v-for="size in product.sizes"
            :key="size"
            @click="$emit('update:size', size)"
            class="py-3 px-4 border-2 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            :class="
              selectedSize === size
                ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 text-orange-800 scale-105'
                : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
            "
          >
            {{ size }}
          </button>
        </div>
        <p class="text-sm text-gray-600 mt-2">
          Selected:
          <span class="font-medium text-gray-900">{{ selectedSize }}</span>
        </p>
      </div>

      <div>
        <h3 class="block text-lg font-bold text-gray-900 mb-4">Quantity</h3>
        <div
          class="flex items-center bg-white border-2 border-gray-300 hover:border-orange-400 rounded-xl w-36 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <button
            @click="decreaseQuantity"
            class="flex items-center justify-center w-12 h-12 hover:bg-orange-50 transition-all duration-300 rounded-l-xl group"
            :disabled="quantity <= 1"
            :class="quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''"
          >
            <FontAwesomeIcon
              :icon="faMinus"
              class="w-4 h-4 text-gray-600 group-hover:text-orange-600 transition-colors"
            />
          </button>
          <div
            class="flex-1 text-center py-3 font-bold text-xl text-gray-900 bg-gray-50"
          >
            {{ quantity }}
          </div>
          <button
            @click="increaseQuantity"
            class="flex items-center justify-center w-12 h-12 hover:bg-orange-50 transition-all duration-300 rounded-r-xl group"
            :disabled="quantity >= product.stock"
            :class="
              quantity >= product.stock ? 'opacity-50 cursor-not-allowed' : ''
            "
          >
            <FontAwesomeIcon
              :icon="faPlus"
              class="w-4 h-4 text-gray-600 group-hover:text-orange-600 transition-colors"
            />
          </button>
        </div>
        <p
          v-if="quantity >= product.stock"
          class="text-sm text-red-600 mt-2 font-medium"
        >
          Maximum available: {{ product.stock }} units
        </p>
      </div>
    </div>

    <div class="space-y-4">
      <button
        @click="$emit('add-to-cart')"
        :disabled="product.stock === 0"
        class="w-full font-bold py-4 sm:py-5 px-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl border-2 flex items-center justify-center"
        :class="
          product.stock === 0
            ? 'bg-gray-400 border-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-orange-500'
        "
      >
        <FontAwesomeIcon :icon="faShoppingCart" class="w-5 h-5 mr-3" />
        {{ product.stock === 0 ? "Out of Stock" : "Add to Cart" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faStar,
  faCheck,
  faMinus,
  faPlus,
  faShoppingCart,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
  product: Object,
  selectedVariantId: { type: [String, Number], default: null },
  selectedSize: String,
  quantity: Number,
});

const emit = defineEmits([
  "update:variant",
  "update:size",
  "update:quantity",
  "add-to-cart",
]);

const formatPrice = (price) => {
  const normalizedPrice = Number(price) || 0;
  return `$${normalizedPrice.toFixed(2)}`;
};

const decreaseQuantity = () => {
  if (props.quantity > 1) {
    emit("update:quantity", props.quantity - 1);
  }
};

const increaseQuantity = () => {
  if (props.quantity < props.product.stock) {
    emit("update:quantity", props.quantity + 1);
  }
};
</script>
