<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50"
  >
    <div
      class="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100"
    >
      <div
        class="bg-gradient-to-r from-gray-50 to-orange-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center"
      >
        <div>
          <h3 class="text-xl font-bold text-gray-900">Cấu Hình Sản Phẩm</h3>
          <p class="text-sm text-gray-600">Chỉnh sửa thông tin sản phẩm</p>
        </div>
        <button
          @click="saveProduct"
          :disabled="loading"
          class="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon
            :icon="faSave"
            class="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
          />
          <span>{{ loading ? "Đang lưu..." : "Lưu" }}</span>
        </button>
      </div>
      <div class="px-2 py-3 sm:px-4 sm:py-5 lg:p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="space-y-6">
            <h4 class="text-lg font-bold text-gray-900 mb-4">
              Thông Tin Cơ Bản
            </h4>

            <div>
              <label
                for="productName"
                class="block text-sm font-bold text-gray-700 mb-2"
                >Tên Sản Phẩm</label
              >
              <input
                id="productName"
                v-model="product.name"
                type="text"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm hover:shadow-md"
              />
            </div>

            <div>
              <label
                for="productDescription"
                class="block text-sm font-bold text-gray-700 mb-2"
                >Mô Tả</label
              >
              <textarea
                id="productDescription"
                v-model="product.description"
                rows="4"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm hover:shadow-md resize-none"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  for="productPrice"
                  class="block text-sm font-bold text-gray-700 mb-2"
                  >Giá ($)</label
                >
                <input
                  id="productPrice"
                  v-model.number="product.price"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm hover:shadow-md"
                />
              </div>

              <div>
                <label
                  for="productDiscount"
                  class="block text-sm font-bold text-gray-700 mb-2"
                  >Giảm Giá (%)</label
                >
                <input
                  id="productDiscount"
                  v-model.number="product.discount"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            <div>
              <label
                for="productStock"
                class="block text-sm font-bold text-gray-700 mb-2"
                >Số Lượng Tồn Kho</label
              >
              <input
                id="productStock"
                v-model.number="product.stock"
                type="number"
                min="0"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm hover:shadow-md"
              />
            </div>
          </div>

          <div class="space-y-6">
            <h4 class="text-lg font-bold text-gray-900 mb-4">
              Thông Tin Bổ Sung
            </h4>

            <div>
              <label
                for="careInstructions"
                class="block text-sm font-bold text-gray-700 mb-2"
                >Hướng Dẫn Bảo Quản</label
              >
              <textarea
                id="careInstructions"
                v-model="product.care_instructions"
                rows="4"
                placeholder="Nhập hướng dẫn bảo quản..."
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm hover:shadow-md resize-none"
              ></textarea>
            </div>

            <div>
              <span class="block text-sm font-bold text-gray-700 mb-2"
                >Hình Ảnh Sản Phẩm</span
              >
              <div class="space-y-3">
                <div
                  v-for="(_, index) in imageList"
                  :key="index"
                  class="flex items-center space-x-3"
                >
                  <input
                    v-model="imageList[index]"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm hover:shadow-md"
                    :aria-label="`URL hình ảnh ${index + 1}`"
                  />
                  <button
                    v-if="index !== 0"
                    @click="removeImage(index)"
                    type="button"
                    class="group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    <FontAwesomeIcon
                      :icon="faTrash"
                      class="w-4 h-4 group-hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                </div>
                <button
                  @click="addImage"
                  type="button"
                  class="w-full px-4 py-3 border-2 border-dashed border-orange-300 hover:border-orange-500 text-orange-600 hover:text-orange-700 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:bg-orange-50 shadow-sm hover:shadow-md"
                >
                  <FontAwesomeIcon :icon="faPlus" class="w-4 h-4" />
                  <span class="font-semibold">Thêm hình ảnh</span>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-2">
                Nhập URL hình ảnh. Hình ảnh đầu tiên sẽ được dùng làm ảnh chính.
              </p>
            </div>

            <div
              class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200"
            >
              <h4 class="text-sm font-bold text-gray-800 mb-3">
                Giá Trị Tính Toán
              </h4>
              <div class="space-y-2">
                <div
                  class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                >
                  <span class="text-gray-700 font-semibold text-sm"
                    >Giá Cuối:</span
                  >
                  <span class="font-bold text-green-600"
                    >${{ finalPrice.toFixed(2) }}</span
                  >
                </div>
                <div
                  class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm"
                >
                  <span class="text-gray-700 font-semibold text-sm"
                    >Tiền Giảm:</span
                  >
                  <span class="font-bold text-orange-600"
                    >${{ discountAmount.toFixed(2) }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100 mt-8"
    >
      <div
        class="bg-gradient-to-r from-gray-50 to-orange-50 px-6 py-4 border-b border-gray-200"
      ></div>
      <div class="px-2 py-3 sm:px-4 sm:py-5 lg:p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div class="space-y-4">
            <div class="relative group">
              <div
                class="absolute -inset-2 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
              ></div>
              <img
                :src="previewImage || '/img/cotton_short.webp'"
                :alt="product.name"
                class="relative w-full h-80 lg:h-96 rounded-2xl object-cover border-2 border-gray-200 shadow-xl"
              />
            </div>
            <div v-if="imageList.length > 1" class="grid grid-cols-4 gap-2">
              <div
                v-for="(image, index) in imageList.slice(0, 4)"
                :key="index"
                class="relative group cursor-pointer"
                @click="currentImageIndex = index"
              >
                <img
                  :src="image || '/img/cotton_short.webp'"
                  :alt="`Product ${index + 1}`"
                  class="w-full h-20 rounded-lg object-cover border-2 transition-all duration-300"
                  :class="
                    currentImageIndex === index
                      ? 'border-orange-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  "
                />
              </div>
            </div>
          </div>
          <div class="space-y-6">
            <div>
              <h4 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {{ product.name || "Tên Sản Phẩm" }}
              </h4>
              <p class="text-gray-600 text-lg leading-relaxed">
                {{
                  product.description || "Mô tả sản phẩm sẽ hiển thị ở đây..."
                }}
              </p>
            </div>

            <div class="flex items-center space-x-4">
              <div class="text-3xl font-bold text-green-600">
                ${{ finalPrice.toFixed(2) }}
              </div>
              <div
                v-if="product.discount > 0"
                class="text-xl text-gray-500 line-through"
              >
                ${{ product.price || "0.00" }}
              </div>
              <div
                v-if="product.discount > 0"
                class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
              >
                -{{ product.discount }}%
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div
                class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 shadow-sm"
              >
                <span class="text-sm text-blue-600 font-semibold"
                  >Tồn Kho:</span
                >
                <div
                  class="text-xl font-bold"
                  :class="getStockClass(product.stock)"
                >
                  {{ product.stock || 0 }}
                </div>
              </div>
              <div
                class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 shadow-sm"
              >
                <span class="text-sm text-green-600 font-semibold"
                  >Tiết Kiệm:</span
                >
                <div class="text-xl font-bold text-green-600">
                  ${{ discountAmount.toFixed(2) }}
                </div>
              </div>
            </div>

            <div
              v-if="product.care_instructions"
              class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200 shadow-sm"
            >
              <span class="text-sm text-orange-600 font-semibold"
                >Hướng Dẫn Bảo Quản:</span
              >
              <p class="text-gray-700 mt-2 leading-relaxed">
                {{ product.care_instructions }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSave, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Cấu Hình Sản Phẩm - Admin",
});

const product = ref({
  name: "",
  description: "",
  price: 0,
  discount: 0,
  care_instructions: "",
  images: "",
  stock: 0,
});

const loading = ref(false);
const imageList = ref(["/img/cotton_short.webp"]);
const currentImageIndex = ref(0);

const finalPrice = computed(() => {
  const price = product.value.price || 0;
  const discount = product.value.discount || 0;
  return price * (1 - discount / 100);
});

const discountAmount = computed(() => {
  const price = product.value.price || 0;
  const discount = product.value.discount || 0;
  return price * (discount / 100);
});

const previewImage = computed(() => {
  const validImages = imageList.value.filter((img) => img.trim() !== "");
  if (validImages.length === 0) return "/img/cotton_short.webp";
  return validImages[currentImageIndex.value] || validImages[0];
});

watch(
  imageList,
  (newValue) => {
    const filteredImages = newValue.filter((img) => img.trim() !== "");
    product.value.images = JSON.stringify(filteredImages);
  },
  { deep: true },
);

onMounted(async () => {
  try {
    loading.value = true;
    const { data } = await $fetch("/api/admin/product");

    if (data) {
      product.value = {
        name: data.name || "",
        description: data.description || "",
        price: data.price || 0,
        discount: data.discount || 0,
        care_instructions: data.care_instructions || "",
        images: data.images || "[]",
        stock: data.stock || 0,
      };
      try {
        const images = JSON.parse(data.images || "[]");
        imageList.value =
          images.length > 0 ? images : ["/img/cotton_short.webp"];
      } catch {
        imageList.value = ["/img/cotton_short.webp"];
      }
    }
  } catch {
  } finally {
    loading.value = false;
  }
});

const saveProduct = async () => {
  try {
    loading.value = true;

    const filteredImages = imageList.value.filter((img) => img.trim() !== "");
    product.value.images = JSON.stringify(filteredImages);

    await $fetch("/api/admin/product", {
      method: "PUT",
      body: product.value,
    });

    alert("Lưu thành công!");
  } catch {
    alert("Lỗi khi lưu!");
  } finally {
    loading.value = false;
  }
};

const getStockClass = (stock) => {
  if (stock === 0) return "text-red-600";
  if (stock < 10) return "text-yellow-600";
  return "text-green-600";
};

const addImage = () => {
  imageList.value.push("/img/cotton_short.webp");
};

const removeImage = (index) => {
  if (imageList.value.length > 1) {
    imageList.value.splice(index, 1);
  } else {
    imageList.value[0] = "/img/cotton_short.webp";
  }
};
</script>
