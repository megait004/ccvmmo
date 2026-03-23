<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 space-y-8">
    <!-- Danh sách sản phẩm -->
    <div class="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
      <div class="bg-gradient-to-r from-gray-50 to-orange-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <div class="text-xl font-bold text-gray-900">Danh Sách Sản Phẩm</div>
          <p class="text-sm text-gray-600">{{ products.length }} sản phẩm</p>
        </div>
        <button
          @click="openAddForm"
          class="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <FontAwesomeIcon :icon="faPlus" class="w-4 h-4" />
          <span>Thêm Sản Phẩm</span>
        </button>
      </div>

      <div class="p-6">
        <div v-if="loadingList" class="text-center py-12 text-gray-400">Đang tải...</div>

        <div v-else-if="products.length === 0" class="text-center py-12 text-gray-400">
          <FontAwesomeIcon :icon="faBoxOpen" class="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p class="text-lg font-semibold">Chưa có sản phẩm nào</p>
          <p class="text-sm mt-1">Nhấn "Thêm Sản Phẩm" để bắt đầu</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div
            v-for="p in products"
            :key="p.id"
            class="border-2 rounded-2xl p-4 transition-all duration-300 hover:shadow-lg"
            :class="editProduct?.id === p.id ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white hover:border-gray-300'"
          >
            <div class="flex items-start space-x-3">
              <img
                :src="getFirstImage(p.images)"
                :alt="p.name"
                class="w-16 h-16 rounded-xl object-cover border border-gray-200 flex-shrink-0"
              />
              <div class="flex-1 min-w-0">
                <div class="font-bold text-gray-900 truncate">{{ p.name || '(Chưa đặt tên)' }}</div>
                <div class="text-sm text-gray-500 mt-0.5">
                  <span class="font-semibold text-green-600">${{ finalPrice(p).toFixed(2) }}</span>
                  <span v-if="p.discount > 0" class="ml-1 text-xs text-red-500">-{{ p.discount }}%</span>
                </div>
                <div class="text-xs text-gray-400 mt-0.5">
                  Tồn kho: <span :class="getStockClass(p.stock)" class="font-semibold">{{ p.stock }}</span>
                </div>
              </div>
            </div>
            <div class="flex space-x-2 mt-3">
              <button
                @click="openEditForm(p)"
                class="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold rounded-xl text-sm transition-all duration-200"
              >
                <FontAwesomeIcon :icon="faPencil" class="w-3.5 h-3.5" />
                <span>Sửa</span>
              </button>
              <button
                @click="confirmDelete(p)"
                class="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl text-sm transition-all duration-200"
              >
                <FontAwesomeIcon :icon="faTrash" class="w-3.5 h-3.5" />
                <span>Xóa</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form thêm / sửa -->
    <div v-if="showForm" class="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
      <div class="bg-gradient-to-r from-gray-50 to-orange-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <div class="text-xl font-bold text-gray-900">{{ isEditing ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới' }}</div>
          <p class="text-sm text-gray-600">{{ isEditing ? `#${editProduct.id} — ${editProduct.name}` : 'Điền thông tin sản phẩm mới' }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <button
            @click="closeForm"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
          >
            Huỷ
          </button>
          <button
            @click="saveProduct"
            :disabled="saving"
            class="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <FontAwesomeIcon :icon="faSave" class="w-4 h-4" />
            <span>{{ saving ? 'Đang lưu...' : 'Lưu' }}</span>
          </button>
        </div>
      </div>

      <div class="px-2 py-3 sm:px-4 sm:py-5 lg:p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div class="text-lg font-bold text-gray-900 mb-4">Thông Tin Cơ Bản</div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Tên Sản Phẩm</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Mô Tả</label>
              <textarea
                v-model="form.description"
                rows="4"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm resize-none"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Giá ($)</label>
                <input
                  v-model.number="form.price"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Giảm Giá (%)</label>
                <input
                  v-model.number="form.discount"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Số Lượng Tồn Kho</label>
              <input
                v-model.number="form.stock"
                type="number"
                min="0"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2">Hướng Dẫn Bảo Quản</label>
              <textarea
                v-model="form.care_instructions"
                rows="3"
                placeholder="Nhập hướng dẫn bảo quản..."
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm resize-none"
              ></textarea>
            </div>
          </div>

          <div class="space-y-6">
            <div class="text-lg font-bold text-gray-900 mb-4">Hình Ảnh & Xem Trước</div>

            <div>
              <span class="block text-sm font-bold text-gray-700 mb-2">Hình Ảnh Sản Phẩm</span>
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
                    class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                    :aria-label="`URL hình ảnh ${index + 1}`"
                  />
                  <button
                    v-if="index !== 0"
                    @click="removeImage(index)"
                    type="button"
                    class="bg-red-100 hover:bg-red-200 text-red-600 p-3 rounded-xl transition-all duration-200"
                  >
                    <FontAwesomeIcon :icon="faTrash" class="w-4 h-4" />
                  </button>
                </div>
                <button
                  @click="addImage"
                  type="button"
                  class="w-full px-4 py-3 border-2 border-dashed border-orange-300 hover:border-orange-500 text-orange-600 hover:text-orange-700 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:bg-orange-50"
                >
                  <FontAwesomeIcon :icon="faPlus" class="w-4 h-4" />
                  <span class="font-semibold">Thêm hình ảnh</span>
                </button>
              </div>
            </div>

            <div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
              <div class="text-sm font-bold text-gray-800 mb-3">Giá Trị Tính Toán</div>
              <div class="space-y-2">
                <div class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                  <span class="text-gray-700 font-semibold text-sm">Giá Cuối:</span>
                  <span class="font-bold text-green-600">${{ formFinalPrice.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                  <span class="text-gray-700 font-semibold text-sm">Tiền Giảm:</span>
                  <span class="font-bold text-orange-600">${{ formDiscountAmount.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="relative group">
              <img
                :src="formPreviewImage"
                :alt="form.name"
                class="w-full h-48 rounded-2xl object-cover border-2 border-gray-200 shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSave, faPlus, faTrash, faPencil, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

definePageMeta({ layout: "admin" });
useHead({ title: "Quản Lý Sản Phẩm - Admin" });

const products = ref([]);
const loadingList = ref(false);
const saving = ref(false);
const showForm = ref(false);
const isEditing = ref(false);
const editProduct = ref(null);
const imageList = ref(["https://"]);

const emptyForm = () => ({
  name: "",
  description: "",
  price: 0,
  discount: 0,
  care_instructions: "",
  images: "[]",
  stock: 0,
});

const form = ref(emptyForm());

const formFinalPrice = computed(() => {
  const price = form.value.price || 0;
  const discount = form.value.discount || 0;
  return price * (1 - discount / 100);
});

const formDiscountAmount = computed(() => {
  const price = form.value.price || 0;
  const discount = form.value.discount || 0;
  return price * (discount / 100);
});

const formPreviewImage = computed(() => {
  const valid = imageList.value.filter((img) => img.trim() !== "" && img.startsWith("http"));
  return valid[0] || "/img/cotton_short.webp";
});

watch(imageList, (newValue) => {
  const filtered = newValue.filter((img) => img.trim() !== "");
  form.value.images = JSON.stringify(filtered);
}, { deep: true });

const getFirstImage = (imagesJson) => {
  try {
    const arr = JSON.parse(imagesJson || "[]");
    return arr[0] || "/img/cotton_short.webp";
  } catch {
    return "/img/cotton_short.webp";
  }
};

const finalPrice = (p) => {
  return (p.price || 0) * (1 - (p.discount || 0) / 100);
};

const getStockClass = (stock) => {
  if (stock === 0) return "text-red-600";
  if (stock < 10) return "text-yellow-600";
  return "text-green-600";
};

const loadProducts = async () => {
  try {
    loadingList.value = true;
    const { data } = await $fetch("/api/admin/product");
    products.value = data || [];
  } catch {
    products.value = [];
  } finally {
    loadingList.value = false;
  }
};

const openAddForm = () => {
  isEditing.value = false;
  editProduct.value = null;
  form.value = emptyForm();
  imageList.value = ["https://"];
  showForm.value = true;
  nextTick(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
};

const openEditForm = (p) => {
  isEditing.value = true;
  editProduct.value = p;
  form.value = {
    id: p.id,
    name: p.name || "",
    description: p.description || "",
    price: p.price || 0,
    discount: p.discount || 0,
    care_instructions: p.care_instructions || "",
    images: p.images || "[]",
    stock: p.stock || 0,
  };
  try {
    const images = JSON.parse(p.images || "[]");
    imageList.value = images.length > 0 ? images : ["https://"];
  } catch {
    imageList.value = ["https://"];
  }
  showForm.value = true;
  nextTick(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
};

const closeForm = () => {
  showForm.value = false;
  editProduct.value = null;
};

const saveProduct = async () => {
  try {
    saving.value = true;
    const filtered = imageList.value.filter((img) => img.trim() !== "" && img.startsWith("http"));
    form.value.images = JSON.stringify(filtered);

    if (isEditing.value) {
      await $fetch("/api/admin/product", { method: "PUT", body: form.value });
    } else {
      await $fetch("/api/admin/product", { method: "POST", body: form.value });
    }

    await loadProducts();
    closeForm();
    alert(isEditing.value ? "Cập nhật thành công!" : "Thêm sản phẩm thành công!");
  } catch {
    alert("Lỗi khi lưu!");
  } finally {
    saving.value = false;
  }
};

const confirmDelete = async (p) => {
  if (!confirm(`Xóa sản phẩm "${p.name || '(Chưa đặt tên)'}"?`)) return;
  try {
    await $fetch("/api/admin/product", { method: "DELETE", body: { id: p.id } });
    await loadProducts();
    if (editProduct.value?.id === p.id) closeForm();
  } catch {
    alert("Lỗi khi xóa!");
  }
};

const addImage = () => {
  imageList.value.push("https://");
};

const removeImage = (index) => {
  if (imageList.value.length > 1) {
    imageList.value.splice(index, 1);
  } else {
    imageList.value[0] = "https://";
  }
};

onMounted(loadProducts);
</script>
