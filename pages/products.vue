<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 relative">
    <div class="absolute inset-0 opacity-5 pointer-events-none">
      <div
        class="absolute inset-0"
        style="
          background-image:
            radial-gradient(circle at 25% 25%, #f97316 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #ea580c 1px, transparent 1px);
          background-size: 50px 50px;
        "
      ></div>
    </div>

    <!-- Header banner -->
    <div class="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 py-3 sm:py-5 relative">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="max-w-7xl mx-auto px-4 relative z-10 text-center text-white">
        <div class="text-2xl sm:text-3xl font-bold tracking-tight">Our Collection</div>
        <p class="text-orange-100 text-sm sm:text-base mt-1">High-quality fashion at unbeatable prices</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8 sm:py-12 relative z-10">
      <!-- Loading -->
      <div v-if="pending" class="flex flex-col items-center justify-center py-24 gap-4">
        <div class="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-gray-500 text-sm">Loading products...</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
        <FontAwesomeIcon :icon="faBoxOpen" class="w-16 h-16 opacity-30" />
        <div class="text-xl font-semibold">No products available</div>
        <p class="text-sm">Check back soon!</p>
      </div>

      <!-- Product grid -->
      <div v-else>
        <div class="flex items-center justify-between mb-6 sm:mb-8">
          <div class="text-gray-700 text-sm sm:text-base">
            <span class="font-bold text-gray-900">{{ products.length }}</span> products found
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <NuxtLink
            v-for="product in products"
            :key="product.id"
            :to="`/product/${product.id}`"
            class="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            <!-- Image -->
            <div class="relative overflow-hidden bg-gray-50 aspect-square">
              <img
                :src="getFirstImage(product.images)"
                :alt="product.name"
                class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
              />
              <div v-if="product.discount > 0" class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                -{{ product.discount }}%
              </div>
              <div v-if="product.stock === 0" class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span class="text-white font-bold text-sm bg-black/60 px-3 py-1 rounded-full">Out of Stock</span>
              </div>
            </div>

            <!-- Info -->
            <div class="p-4 flex flex-col flex-1 gap-2">
              <div class="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 group-hover:text-orange-600 transition-colors">
                {{ product.name || 'Unnamed Product' }}
              </div>

              <div class="flex items-center gap-2 mt-auto pt-2">
                <span class="text-lg font-bold text-orange-600">${{ finalPrice(product).toFixed(2) }}</span>
                <span v-if="product.discount > 0" class="text-sm text-gray-400 line-through">${{ Number(product.price).toFixed(2) }}</span>
              </div>

              <div class="flex items-center justify-between">
                <div class="text-xs" :class="product.stock > 0 ? 'text-green-600' : 'text-red-500'">
                  {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
                </div>
                <div class="flex items-center gap-1 text-xs text-gray-400 group-hover:text-orange-500 transition-colors">
                  <span>View</span>
                  <FontAwesomeIcon :icon="faArrowRight" class="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowRight, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

useHead({
  title: 'All Products - Shop Our Collection',
  meta: [
    {
      name: 'description',
      content: 'Browse our full collection of high-quality fashion products at unbeatable prices.',
    },
  ],
});

definePageMeta({
  layout: 'default',
});

const { data, pending } = await useFetch('/api/admin/product', {
  server: false,
});

const products = computed(() => data.value?.data ?? []);

const getFirstImage = (images) => {
  try {
    const parsed = typeof images === 'string' ? JSON.parse(images) : images;
    if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
  } catch {}
  return '/img/logo.webp';
};

const finalPrice = (product) => {
  const price = Number(product.price) || 0;
  const discount = Number(product.discount) || 0;
  return price * (1 - discount / 100);
};
</script>
