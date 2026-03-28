<template>
  <div
    class="flex items-center gap-4 p-3 bg-white rounded-lg border border-orange-100"
  >
    <img
      :src="item.image"
      :alt="item.name"
      class="w-16 h-16 object-cover rounded-lg"
    />

    <div class="flex-1">
      <h4 class="font-semibold text-gray-900">{{ item.name }}</h4>
      <p class="text-sm text-gray-600">{{ item.color }} • {{ item.size }}</p>

      <div class="flex items-center gap-2 mt-2">
        <button
          @click="decreaseQuantity"
          :disabled="item.quantity <= 1"
          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon :icon="faMinus" class="w-3 h-3" />
        </button>

        <span class="w-12 text-center font-medium">{{ item.quantity }}</span>

        <button
          @click="increaseQuantity"
          class="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-orange-50"
        >
          <FontAwesomeIcon :icon="faPlus" class="w-3 h-3" />
        </button>

        <button
          @click="removeItem"
          class="ml-2 w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg"
        >
          <FontAwesomeIcon :icon="faTrash" class="w-3 h-3" />
        </button>
      </div>
    </div>

    <div class="text-right">
      <p class="font-bold text-orange-600">
        ${{ ((item.salePrice || 0) * (item.quantity || 1)).toFixed(2) }}
      </p>
      <p
        v-if="(item.originalPrice || 0) > (item.salePrice || 0)"
        class="text-sm text-gray-500 line-through"
      >
        ${{ ((item.originalPrice || 0) * (item.quantity || 1)).toFixed(2) }}
      </p>
      <p class="text-xs text-gray-500">
        ${{ (item.salePrice || 0).toFixed(2) }} each
      </p>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const { updateQuantity, removeFromCart } = useCart();

const increaseQuantity = () => {
  updateQuantity(props.item.itemKey, props.item.quantity + 1);
};

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    updateQuantity(props.item.itemKey, props.item.quantity - 1);
  }
};

const removeItem = () => {
  removeFromCart(props.item.itemKey);
};
</script>
