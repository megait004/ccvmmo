<template>
  <div class="space-y-4">
    <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div class="relative aspect-square bg-gray-100">
        <img
          :src="currentImage"
          :alt="productLabel"
          class="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
          @error="handleImageError"
        />

        <div class="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-end p-4">
          <div
            v-if="showDiscount"
            class="rounded-full bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
          >
            -{{ discount }}%
          </div>
        </div>

        <div
          v-if="images.length > 1"
          class="absolute inset-x-0 bottom-4 flex items-center justify-between px-4"
        >
          <button
            type="button"
            @click="previousImage"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm transition hover:bg-white hover:text-orange-600"
            aria-label="Previous image"
          >
            <FontAwesomeIcon :icon="faChevronLeft" class="h-4 w-4" />
          </button>

          <div class="rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
            {{ currentImageIndex + 1 }} / {{ images.length }}
          </div>

          <button
            type="button"
            @click="nextImage"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm transition hover:bg-white hover:text-orange-600"
            aria-label="Next image"
          >
            <FontAwesomeIcon :icon="faChevronRight" class="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        v-if="images.length > 1"
        class="grid grid-cols-4 gap-3 border-t border-gray-100 bg-gray-50/80 p-3 sm:grid-cols-5"
      >
        <button
          v-for="(image, index) in images"
          :key="index"
          type="button"
          @click="setCurrentImage(index)"
          class="overflow-hidden rounded-2xl border-2 bg-white transition"
          :class="
            currentImageIndex === index
              ? 'border-orange-500 shadow-sm'
              : 'border-transparent hover:border-orange-200'
          "
          :aria-label="`Open image ${index + 1}`"
        >
          <img
            :src="image"
            :alt="`${productLabel} ${index + 1}`"
            class="aspect-square h-full w-full object-cover"
            @error="handleImageError"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
  images: {
    type: Array,
    default: () => [""],
  },
  name: {
    type: String,
    default: "Product",
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const currentImageIndex = ref(0);

const currentImage = computed(() => {
  return props.images[currentImageIndex.value] || "/img/placeholder.svg";
});

const productLabel = computed(() => {
  return props.name || "Sản phẩm";
});

const showDiscount = computed(() => {
  return Number(props.discount) > 0;
});

watch(
  () => props.images,
  () => {
    currentImageIndex.value = 0;
  },
  { deep: true },
);

const setCurrentImage = (index) => {
  currentImageIndex.value = index;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % props.images.length;
};

const previousImage = () => {
  currentImageIndex.value =
    currentImageIndex.value === 0
      ? props.images.length - 1
      : currentImageIndex.value - 1;
};

const handleImageError = (event) => {
  event.target.src = "/img/placeholder.svg";
};
</script>
