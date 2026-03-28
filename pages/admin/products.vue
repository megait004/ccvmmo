<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 space-y-8">
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
                :src="getProductCoverImage(p)"
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
                <div class="mt-2 flex flex-wrap items-center gap-2">
                  <div class="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                    {{ p.variants?.length || 0 }} màu
                  </div>
                  <div class="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                    {{ getActiveVariantCount(p.variants) }} đang hiển thị
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <div
                v-for="variant in p.variants || []"
                :key="`${p.id}-${variant.id}`"
                class="flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs"
                :class="Number(variant.is_active) === 1 ? 'border-orange-200 text-orange-700' : 'border-gray-200 text-gray-500'"
              >
                <span
                  class="h-3 w-3 rounded-full border border-white shadow-sm"
                  :style="getColorStyle(variant.color_code)"
                ></span>
                <span>{{ variant.color_name }}</span>
                <span v-if="Number(variant.is_default) === 1">• mặc định</span>
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
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div class="space-y-6 xl:col-span-2">
            <div class="text-lg font-bold text-gray-900 mb-4">Thông Tin Cơ Bản</div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div>
                  <label for="product-name" class="block text-sm font-bold text-gray-700 mb-2">Tên Sản Phẩm</label>
                  <input
                    id="product-name"
                    v-model="form.name"
                    type="text"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                  />
                </div>

                <div>
                  <label for="product-description" class="block text-sm font-bold text-gray-700 mb-2">Mô Tả</label>
                  <textarea
                    id="product-description"
                    v-model="form.description"
                    rows="4"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm resize-none"
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="product-price" class="block text-sm font-bold text-gray-700 mb-2">Giá Gốc / Fallback ($)</label>
                    <input
                      id="product-price"
                      v-model.number="form.price"
                      type="number"
                      step="0.01"
                      min="0"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                    />
                  </div>
                  <div>
                    <label for="product-discount" class="block text-sm font-bold text-gray-700 mb-2">Giảm Giá (%)</label>
                    <input
                      id="product-discount"
                      v-model.number="form.discount"
                      type="number"
                      min="0"
                      max="100"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="product-total-stock" class="block text-sm font-bold text-gray-700 mb-2">Tổng Tồn Kho</label>
                    <input
                      id="product-total-stock"
                      :value="totalVariantStock"
                      type="number"
                      readonly
                      class="w-full px-4 py-3 border-2 border-gray-100 bg-gray-50 rounded-xl text-gray-700 shadow-sm"
                    />
                  </div>
                  <div>
                    <label for="product-active-variants" class="block text-sm font-bold text-gray-700 mb-2">Màu Đang Hiển Thị</label>
                    <input
                      id="product-active-variants"
                      :value="activeVariantCount"
                      type="number"
                      readonly
                      class="w-full px-4 py-3 border-2 border-gray-100 bg-gray-50 rounded-xl text-gray-700 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label for="product-care" class="block text-sm font-bold text-gray-700 mb-2">Hướng Dẫn Bảo Quản</label>
                  <textarea
                    id="product-care"
                    v-model="form.care_instructions"
                    rows="3"
                    placeholder="Nhập hướng dẫn bảo quản..."
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm resize-none"
                  ></textarea>
                </div>
              </div>

              <div class="space-y-6">
                <div class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon :icon="faPalette" class="w-4 h-4 text-orange-500" />
                  <span>Biến Thể Theo Màu</span>
                </div>

                <div class="space-y-4">
                  <div
                    v-for="(variant, index) in variantList"
                    :key="`variant-${index}`"
                    class="rounded-2xl border-2 p-4 transition-all duration-300"
                    :class="getVariantCardClass(variant)"
                  >
                    <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="h-11 w-11 rounded-full border-2 border-white shadow-md"
                          :style="getColorStyle(variant.color_code)"
                        ></div>
                        <div>
                          <div class="font-bold text-gray-900">
                            {{ variant.color_name || `Màu ${index + 1}` }}
                          </div>
                          <div class="text-xs text-gray-500">
                            {{ variant.is_active ? "Đang hiển thị" : "Đang ẩn" }}
                            <span v-if="variant.is_default">• Mặc định</span>
                          </div>
                        </div>
                      </div>

                      <div class="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          @click="setDefaultVariant(index)"
                          class="rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200"
                          :class="variant.is_default ? 'bg-orange-500 shadow-lg ring-2 ring-orange-200' : 'border border-orange-200 bg-white text-orange-600 hover:bg-orange-50'"
                        >
                          <span :class="variant.is_default ? 'text-white' : ''">Mặc định</span>
                        </button>
                        <button
                          type="button"
                          @click="toggleVariantActive(index)"
                          class="rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
                          :class="variant.is_active ? 'bg-green-50 hover:bg-green-100' : 'bg-gray-100 hover:bg-gray-200'"
                        >
                          <FontAwesomeIcon :icon="variant.is_active ? faEye : faEyeSlash" class="w-3 h-3" :class="variant.is_active ? 'text-green-600' : 'text-gray-600'" />
                          <span :class="variant.is_active ? 'text-green-600' : 'text-gray-600'">{{ variant.is_active ? "Hiển thị" : "Ẩn" }}</span>
                        </button>
                        <button
                          type="button"
                          @click="removeVariant(index)"
                          class="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-100"
                        >
                          Xóa màu
                        </button>
                      </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label :for="`variant-color-code-${index}`" class="block text-sm font-bold text-gray-700 mb-2">Mã Màu (HEX)</label>
                        <div class="flex min-w-0 items-center gap-2">
                          <div class="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border-2 border-gray-200 shadow-sm">
                            <div
                              class="h-full w-full"
                              :style="getColorStyle(variant.color_code)"
                            ></div>
                            <input
                              v-model="variant.color_code"
                              type="color"
                              class="absolute inset-0 h-full w-full cursor-pointer opacity-0 outline-none"
                            />
                          </div>
                          <input
                            :id="`variant-color-code-${index}`"
                            v-model="variant.color_code"
                            type="text"
                            placeholder="#F5CBA7"
                            class="min-w-0 flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm uppercase"
                          />
                        </div>
                      </div>

                      <div>
                        <label :for="`variant-image-${index}`" class="block text-sm font-bold text-gray-700 mb-2">Ảnh Đúng Màu</label>
                        <input
                          :id="`variant-image-${index}`"
                          v-model="variant.image"
                          type="url"
                          placeholder="https://example.com/variant-image.jpg"
                          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                        />
                      </div>

                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label :for="`variant-price-${index}`" class="block text-sm font-bold text-gray-700 mb-2">Giá Riêng ($)</label>
                          <input
                            :id="`variant-price-${index}`"
                            v-model.number="variant.price"
                            type="number"
                            step="0.01"
                            min="0"
                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                          />
                        </div>

                        <div>
                          <label :for="`variant-stock-${index}`" class="block text-sm font-bold text-gray-700 mb-2">Tồn Kho</label>
                          <input
                            :id="`variant-stock-${index}`"
                            v-model.number="variant.stock"
                            type="number"
                            min="0"
                            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 transition-all duration-300 hover:border-gray-300 shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mt-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                      <img
                        :src="variant.image || '/img/cotton_short.webp'"
                        :alt="variant.color_name || `Variant ${index + 1}`"
                        class="h-16 w-16 rounded-xl border border-gray-200 object-cover"
                      />
                      <div class="text-sm text-gray-600">
                        <div class="font-semibold text-gray-900">
                          {{ variant.color_name || `Màu ${index + 1}` }}
                        </div>
                        <div>{{ formatCurrency(getVariantFinalPrice(variant)) }} sau giảm giá</div>
                        <div>{{ variant.stock || 0 }} sản phẩm tồn kho</div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  @click="addVariant"
                  class="w-full rounded-2xl border-2 border-dashed border-orange-300 px-4 py-4 text-orange-600 transition-all duration-300 hover:border-orange-500 hover:bg-orange-50"
                >
                  <div class="flex items-center justify-center gap-2 font-semibold">
                    <FontAwesomeIcon :icon="faPlus" class="w-4 h-4" />
                    <span>Thêm Màu Mới</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="text-lg font-bold text-gray-900 mb-4">Hình Ảnh Chung & Xem Trước</div>

            <div>
              <span class="block text-sm font-bold text-gray-700 mb-2">Hình Ảnh Fallback / Gallery</span>
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
                  <span class="text-gray-700 font-semibold text-sm">Giá Màu Mặc Định:</span>
                  <span class="font-bold text-green-600">{{ formatCurrency(defaultVariantFinalPrice) }}</span>
                </div>
                <div class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                  <span class="text-gray-700 font-semibold text-sm">Tiền Giảm:</span>
                  <span class="font-bold text-orange-600">{{ formatCurrency(defaultVariantDiscountAmount) }}</span>
                </div>
                <div class="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                  <span class="text-gray-700 font-semibold text-sm">Màu Mặc Định:</span>
                  <span class="font-bold text-gray-900">{{ defaultVariantLabel }}</span>
                </div>
              </div>
            </div>

            <div class="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4">
              <div class="mb-3 text-sm font-bold text-gray-800">Xem Trước Màu Mặc Định</div>
              <div class="mb-4 flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                <div
                  class="h-12 w-12 rounded-full border-2 border-white shadow-md"
                  :style="getColorStyle(defaultVariant.color_code)"
                ></div>
                <div>
                  <div class="font-semibold text-gray-900">{{ defaultVariantLabel }}</div>
                  <div class="text-sm text-gray-500">
                    {{ defaultVariant.is_active ? "Đang hiển thị ngoài storefront" : "Đang ẩn ngoài storefront" }}
                  </div>
                </div>
              </div>
              <img
                :src="formPreviewImage"
                :alt="form.name"
                class="w-full h-48 rounded-2xl object-cover border-2 border-gray-200 shadow-md"
              />
            </div>

            <div class="rounded-2xl bg-gray-50 p-4 border border-gray-200">
              <div class="text-sm font-bold text-gray-800 mb-2">Gợi ý quản trị</div>
              <div class="space-y-2 text-sm text-gray-600">
                <p>Mỗi màu nên có ảnh riêng để storefront hiển thị đúng thực tế.</p>
                <p>Chỉ nên để một màu mặc định. Màu ẩn sẽ không xuất hiện ở frontend.</p>
                <p>Giá và tồn kho khách nhìn thấy sẽ lấy từ màu đang chọn.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBoxOpen,
  faEye,
  faEyeSlash,
  faPalette,
  faPencil,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

definePageMeta({ layout: "admin" });
useHead({ title: "Quản Lý Sản Phẩm - Admin" });

const products = ref([]);
const loadingList = ref(false);
const saving = ref(false);
const showForm = ref(false);
const isEditing = ref(false);
const editProduct = ref(null);
const imageList = ref(["https://"]);
const variantList = ref([]);

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
const createVariant = (overrides = {}) => ({
  color_name: "",
  color_code: "#d1d5db",
  image: "",
  price: Number(form.value.price) || 0,
  stock: 0,
  is_active: true,
  is_default: variantList.value.length === 0,
  ...overrides,
});

const normalizeVariant = (variant, index) => ({
  color_name: variant.color_name || `Màu ${index + 1}`,
  color_code: normalizeColorCode(variant.color_code),
  image: typeof variant.image === "string" ? variant.image.trim() : "",
  price: Number(variant.price) || 0,
  stock: Number(variant.stock) || 0,
  is_active: Boolean(variant.is_active),
  is_default: Boolean(variant.is_default),
});

const defaultVariant = computed(() => {
  return (
    variantList.value.find((variant) => variant.is_default) ??
    variantList.value[0] ??
    createVariant({ color_name: "Default", is_default: true })
  );
});

const defaultVariantLabel = computed(() => {
  return defaultVariant.value.color_name || "Chưa đặt tên";
});

const getVariantFinalPrice = (variant) => {
  const price = Number(variant?.price) || 0;
  const discount = Number(form.value.discount) || 0;
  return price * (1 - discount / 100);
};

const defaultVariantFinalPrice = computed(() => {
  return getVariantFinalPrice(defaultVariant.value);
});

const defaultVariantDiscountAmount = computed(() => {
  const price = Number(defaultVariant.value?.price) || 0;
  return price - defaultVariantFinalPrice.value;
});

const totalVariantStock = computed(() => {
  return variantList.value.reduce((total, variant) => {
    return total + (Number(variant.stock) || 0);
  }, 0);
});

const activeVariantCount = computed(() => {
  return variantList.value.filter((variant) => variant.is_active).length;
});

const formPreviewImage = computed(() => {
  const defaultImage = defaultVariant.value?.image?.trim() || "";
  if (defaultImage) {
    return defaultImage;
  }

  const validImage = imageList.value.find((img) => img.trim() !== "" && img.startsWith("http"));
  return validImage || "/img/cotton_short.webp";
});

watch(imageList, (newValue) => {
  const filtered = newValue.filter((img) => img.trim() !== "");
  form.value.images = JSON.stringify(filtered);
}, { deep: true });

watch(totalVariantStock, (newValue) => {
  form.value.stock = newValue;
}, { immediate: true });

watch(variantList, (newValue) => {
  if (newValue.length === 0) {
    variantList.value = [createVariant({ is_default: true })];
    return;
  }

  const hasDefault = newValue.some((variant) => variant.is_default);
  if (!hasDefault) {
    newValue[0].is_default = true;
  }
}, { deep: true });

const getFirstImage = (imagesJson) => {
  try {
    const arr = JSON.parse(imagesJson || "[]");
    return arr[0] || "/img/cotton_short.webp";
  } catch {
    return "/img/cotton_short.webp";
  }
};

const getProductCoverImage = (product) => {
  const defaultVariantImage = product?.variants?.find((variant) => Number(variant.is_default) === 1)?.image;
  return defaultVariantImage || getFirstImage(product.images);
};

const finalPrice = (p) => {
  return (p.price || 0) * (1 - (p.discount || 0) / 100);
};

const getStockClass = (stock) => {
  if (stock === 0) return "text-red-600";
  if (stock < 10) return "text-yellow-600";
  return "text-green-600";
};

const formatCurrency = (value) => {
  return `$${(Number(value) || 0).toFixed(2)}`;
};

const normalizeColorCode = (value) => {
  if (typeof value !== "string") {
    return "#D1D5DB";
  }

  const trimmedValue = value.trim();
  if (trimmedValue === "") {
    return "#D1D5DB";
  }

  const prefixedValue = trimmedValue.startsWith("#") ? trimmedValue : `#${trimmedValue}`;
  return prefixedValue.toUpperCase();
};

const getColorStyle = (colorCode) => {
  return {
    backgroundColor: normalizeColorCode(colorCode),
  };
};

const getActiveVariantCount = (variants = []) => {
  return variants.filter((variant) => Number(variant.is_active) === 1).length;
};

const getVariantCardClass = (variant) => {
  if (variant.is_default) {
    return "border-orange-300 bg-orange-50";
  }

  if (variant.is_active) {
    return "border-green-200 bg-green-50";
  }

  return "border-gray-200 bg-gray-50";
};

const prepareVariantsForSave = () => {
  const normalizedVariants = variantList.value.map((variant, index) => normalizeVariant(variant, index));

  if (normalizedVariants.length === 0) {
    return {
      isValid: false,
      message: "Sản phẩm cần ít nhất 1 màu.",
      variants: [],
    };
  }

  const duplicateColorCode = normalizedVariants.find((variant, index) => {
    return normalizedVariants.findIndex((item) => item.color_code === variant.color_code) !== index;
  });

  if (duplicateColorCode) {
    return {
      isValid: false,
      message: `Mã màu ${duplicateColorCode.color_code} đang bị trùng. Mỗi màu phải có HEX riêng.`,
      variants: [],
    };
  }

  const activeVariantIndexes = normalizedVariants.reduce((indexes, variant, index) => {
    if (variant.is_active) {
      indexes.push(index);
    }
    return indexes;
  }, []);

  if (activeVariantIndexes.length === 0) {
    return {
      isValid: false,
      message: "Cần ít nhất 1 màu đang hiển thị.",
      variants: [],
    };
  }

  const currentDefaultIndex = normalizedVariants.findIndex((variant) => variant.is_default);
  const nextDefaultIndex = activeVariantIndexes.includes(currentDefaultIndex)
    ? currentDefaultIndex
    : activeVariantIndexes[0];

  normalizedVariants.forEach((variant, index) => {
    variant.is_default = index === nextDefaultIndex;
  });

  variantList.value = normalizedVariants.map((variant) => ({ ...variant }));

  return {
    isValid: true,
    message: "",
    variants: normalizedVariants,
  };
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
  variantList.value = [createVariant({ color_name: "Default", is_default: true, is_active: true })];
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
  variantList.value = Array.isArray(p.variants) && p.variants.length > 0
    ? p.variants.map((variant, index) => normalizeVariant(variant, index))
    : [createVariant({ color_name: "Default", price: p.price || 0, stock: p.stock || 0, is_default: true, is_active: true })];
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
  variantList.value = [];
};

const saveProduct = async () => {
  try {
    saving.value = true;
    const filtered = imageList.value.filter((img) => img.trim() !== "" && img.startsWith("http"));
    form.value.images = JSON.stringify(filtered);
    form.value.stock = totalVariantStock.value;
    const validationResult = prepareVariantsForSave();
    if (!validationResult.isValid) {
      alert(validationResult.message);
      return;
    }

    const payload = {
      ...form.value,
      variants: validationResult.variants,
    };

    if (isEditing.value) {
      await $fetch("/api/admin/product", { method: "PUT", body: payload });
    } else {
      await $fetch("/api/admin/product", { method: "POST", body: payload });
    }

    await loadProducts();
    closeForm();
    alert(isEditing.value ? "Cập nhật thành công!" : "Thêm sản phẩm thành công!");
  } catch (error) {
    alert(error?.data?.statusMessage || error?.data?.message || "Lỗi khi lưu!");
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

const setDefaultVariant = (index) => {
  variantList.value = variantList.value.map((variant, variantIndex) => ({
    ...variant,
    is_default: variantIndex === index,
  }));
};

const toggleVariantActive = (index) => {
  const targetVariant = variantList.value[index];
  if (!targetVariant) {
    return;
  }

  const nextActiveState = !targetVariant.is_active;
  const activeCount = variantList.value.filter((variant) => variant.is_active).length;
  if (!nextActiveState && activeCount <= 1) {
    alert("Cần giữ lại ít nhất 1 màu đang hiển thị.");
    return;
  }

  targetVariant.is_active = nextActiveState;

  if (!nextActiveState && targetVariant.is_default) {
    const fallbackIndex = variantList.value.findIndex((variant, variantIndex) => variantIndex !== index && variant.is_active);
    if (fallbackIndex >= 0) {
      setDefaultVariant(fallbackIndex);
    } else {
      targetVariant.is_active = true;
    }
  }
};

const addVariant = () => {
  variantList.value.push(createVariant({
    color_name: `Màu ${variantList.value.length + 1}`,
    price: Number(form.value.price) || 0,
  }));
};

const removeVariant = (index) => {
  if (variantList.value.length === 1) {
    variantList.value = [createVariant({ color_name: "Default", price: Number(form.value.price) || 0, is_default: true, is_active: true })];
    return;
  }

  const removedVariant = variantList.value[index];
  const activeCount = variantList.value.filter((variant) => variant.is_active).length;
  if (removedVariant?.is_active && activeCount <= 1) {
    alert("Không thể xóa màu active cuối cùng.");
    return;
  }

  variantList.value.splice(index, 1);

  if (removedVariant?.is_default && variantList.value.length > 0) {
    setDefaultVariant(0);
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
