<template>
  <footer class="bg-gray-900 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="md:col-span-2 animate-fade-in-up">
          <div class="mb-6">
            <h3 class="text-2xl font-bold mb-3 text-white">FastDeals Hub</h3>
            <p class="text-gray-300 text-base leading-relaxed max-w-md">
              Premium quality products at unbeatable prices. Your trusted online
              shopping destination with over 1,000 satisfied customers.
            </p>
          </div>

          <div
            class="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700"
          >
            <h4 class="font-semibold text-white mb-3 flex items-center gap-2">
              <FontAwesomeIcon :icon="faMapMarkerAlt" class="text-gray-400" />
              Our Location
            </h4>
            <div class="text-gray-300 text-sm space-y-1">
              <p class="font-medium">FastDeals Hub GmbH</p>
              <p>Mittelstraße 24, 10117 Berlin</p>
              <p>Deutschland</p>
            </div>
          </div>
        </div>

        <div class="animate-fade-in-delayed">
          <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div
              class="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center"
            >
              <FontAwesomeIcon :icon="faBox" class="text-gray-300 text-sm" />
            </div>
            Quick Links
          </h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink
                to="/#"
                class="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
              >
                <FontAwesomeIcon
                  :icon="faSearch"
                  class="w-4 h-4 group-hover:scale-110 transition-transform"
                />
                <span class="group-hover:translate-x-1 transition-transform"
                  >Track My Order</span
                >
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#"
                class="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
              >
                <FontAwesomeIcon
                  :icon="faQuestionCircle"
                  class="w-4 h-4 group-hover:scale-110 transition-transform"
                />
                <span class="group-hover:translate-x-1 transition-transform"
                  >Customer Help</span
                >
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="animate-fade-in-up">
          <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div
              class="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center"
            >
              <FontAwesomeIcon
                :icon="faShieldAlt"
                class="text-gray-300 text-sm"
              />
            </div>
            Policies
          </h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink
                to="/#"
                class="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
              >
                <FontAwesomeIcon
                  :icon="faUndo"
                  class="w-4 h-4 group-hover:scale-110 transition-transform"
                />
                <span class="group-hover:translate-x-1 transition-transform"
                  >Return Policy</span
                >
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#"
                class="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
              >
                <FontAwesomeIcon
                  :icon="faShippingFast"
                  class="w-4 h-4 group-hover:scale-110 transition-transform"
                />
                <span class="group-hover:translate-x-1 transition-transform"
                  >Shipping Policy</span
                >
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#"
                class="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
              >
                <FontAwesomeIcon
                  :icon="faUserShield"
                  class="w-4 h-4 group-hover:scale-110 transition-transform"
                />
                <span class="group-hover:translate-x-1 transition-transform"
                  >Privacy Policy</span
                >
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#"
                class="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
              >
                <FontAwesomeIcon
                  :icon="faCookie"
                  class="w-4 h-4 group-hover:scale-110 transition-transform"
                />
                <span class="group-hover:translate-x-1 transition-transform"
                  >Cookie Policy</span
                >
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#"
                class="group text-gray-300 hover:text-white transition-all duration-300 text-sm flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
              >
                <FontAwesomeIcon
                  :icon="faFileAlt"
                  class="w-4 h-4 group-hover:scale-110 transition-transform"
                />
                <span class="group-hover:translate-x-1 transition-transform"
                  >DMCA</span
                >
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="animate-fade-in-delayed">
          <h3
            class="text-lg font-semibold text-white mb-4 flex items-center gap-2"
          >
            <FontAwesomeIcon :icon="faShieldAlt" class="text-gray-400" />
            Legal
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/#"
                class="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
              >
                <FontAwesomeIcon :icon="faUserShield" class="w-3 h-3" />
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#"
                class="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
              >
                <FontAwesomeIcon :icon="faCookie" class="w-3 h-3" />
                Cookie Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/#"
                class="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
              >
                <FontAwesomeIcon :icon="faFileAlt" class="w-3 h-3" />
                DMCA
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-8 text-center">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-gray-400 text-sm">
            &copy; {{ currentYear }} FastDeals Hub. All rights reserved.
          </p>
          <div class="flex items-center gap-4 text-sm text-gray-400">
            <span>Made with</span>
            <FontAwesomeIcon
              :icon="faHeart"
              class="text-gray-500 animate-pulse"
            />
            <span>in Berlin</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBox,
  faSearch,
  faQuestionCircle,
  faUndo,
  faShippingFast,
  faShieldAlt,
  faUserShield,
  faCookie,
  faFileAlt,
  faMapMarkerAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const currentYear = computed(() => {
  if (import.meta.client) {
    return new Date().getFullYear();
  }
  return 2025;
});
</script>
