<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
        <div id="paypal-button-container" style="position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none;"></div>
        <div class="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 py-8">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center text-white space-y-6">
                    <h1 class="text-3xl md:text-4xl font-bold">Express Checkout</h1>

                    <div class="flex items-center justify-center space-x-4 md:space-x-8">
                        <div class="flex items-center">
                            <div class="flex items-center justify-center w-10 h-10 bg-white text-orange-600 rounded-full font-bold text-lg shadow-lg">1</div>
                            <span class="ml-3 font-semibold text-white">Shopping Cart</span>
                        </div>

                        <div class="w-8 md:w-16 h-1 bg-orange-300 rounded-full"></div>

                        <div class="flex items-center">
                            <div class="flex items-center justify-center w-10 h-10 bg-orange-300 text-orange-800 rounded-full font-bold text-lg shadow-lg">2</div>
                            <span class="ml-3 font-semibold text-orange-100">Shipping and Checkout</span>
                        </div>

                        <div class="w-8 md:w-16 h-1 bg-orange-200 rounded-full opacity-50"></div>

                        <div class="flex items-center">
                            <div class="flex items-center justify-center w-10 h-10 bg-orange-200 text-orange-600 rounded-full font-bold text-lg shadow-lg opacity-50">3</div>
                            <span class="ml-3 font-semibold text-orange-100 opacity-50">Confirmation</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-8">
            <div class="grid lg:grid-cols-2 gap-8">
                <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in-up">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <FontAwesomeIcon :icon="faFileInvoice" class="text-orange-500" />
                        Invoice Details
                    </h2>

                    <div class="space-y-6">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label for="firstName" class="block text-sm font-semibold text-gray-700"> First name <span class="text-red-500">*</span> </label>
                                <input id="firstName" v-model="form.firstName" type="text" required autocomplete="given-name" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="Enter your first name" />
                            </div>
                            <div class="space-y-2">
                                <label for="lastName" class="block text-sm font-semibold text-gray-700"> Last name <span class="text-red-500">*</span> </label>
                                <input id="lastName" v-model="form.lastName" type="text" required autocomplete="family-name" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="Enter your last name" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="country" class="block text-sm font-semibold text-gray-700"> Land / Region <span class="text-red-500">*</span> </label>
                            <select id="country" v-model="form.country" required autocomplete="country" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300 bg-white">
                                <option value="">Select country</option>
                                <option v-for="country in countriesData" :key="country.code" :value="country.code">
                                    {{ country.name }}
                                </option>
                            </select>
                        </div>

                        <div class="space-y-2">
                            <label for="street" class="block text-sm font-semibold text-gray-700"> Street <span class="text-red-500">*</span> </label>
                            <input id="street" v-model="form.street" type="text" required autocomplete="address-line1" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="Street name and house number" />
                        </div>

                        <div class="space-y-2">
                            <label for="apartment" class="block text-sm font-semibold text-gray-700"> Apartment, suite, room, etc. (optional) </label>
                            <input id="apartment" v-model="form.apartment" type="text" autocomplete="address-line2" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="Apartment, suite, etc." />
                        </div>

                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label for="postalCode" class="block text-sm font-semibold text-gray-700"> Postal code <span class="text-red-500">*</span> </label>
                                <input id="postalCode" v-model="form.postalCode" type="text" required autocomplete="postal-code" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="12345" />
                            </div>
                            <div class="space-y-2">
                                <label for="city" class="block text-sm font-semibold text-gray-700"> Place / City <span class="text-red-500">*</span> </label>
                                <input id="city" v-model="form.city" type="text" required autocomplete="address-level2" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="Enter your city" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="state" class="block text-sm font-semibold text-gray-700"> State / County (optional) </label>
                            <input id="state" v-model="form.state" type="text" autocomplete="address-level1" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="Enter your state or county" />
                        </div>

                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label for="phone" class="block text-sm font-semibold text-gray-700"> Telefon (optional) </label>
                                <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="+49 123 456 7890" />
                            </div>
                            <div class="space-y-2">
                                <label for="email" class="block text-sm font-semibold text-gray-700"> Email Address <span class="text-red-500">*</span> </label>
                                <input id="email" v-model="form.email" type="email" required autocomplete="email" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="your@email.com" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in-up">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <FontAwesomeIcon :icon="faCreditCard" class="text-orange-500" />
                        Payment Information
                    </h2>

                    <div class="space-y-4 mb-6">
                        <h3 class="text-lg font-semibold text-gray-800">Select Payment Method</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <label class="relative cursor-pointer">
                                <input v-model="payment.method" type="radio" value="visa" class="sr-only" />
                                <div class="border-2 rounded-xl p-4 transition-all duration-300 hover:border-orange-300" :class="payment.method === 'visa' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'">
                                    <div class="flex items-center justify-center gap-3">
                                        <img src="/img/visa.png" alt="Visa" class="h-6" />
                                        <span class="font-semibold text-gray-700">Visa</span>
                                    </div>
                                </div>
                            </label>
                            <label class="relative cursor-pointer">
                                <input v-model="payment.method" type="radio" value="mastercard" class="sr-only" />
                                <div class="border-2 rounded-xl p-4 transition-all duration-300 hover:border-orange-300" :class="payment.method === 'mastercard' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'">
                                    <div class="flex items-center justify-center gap-3">
                                        <img src="/img/master-card.svg" alt="Mastercard" class="h-6" />
                                        <span class="font-semibold text-gray-700">Mastercard</span>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div v-if="payment.method" class="space-y-6">
                        <input type="hidden" :value="payment.method === 'visa' ? 'Visa' : 'Mastercard'" autocomplete="cc-type" />

                        <div class="space-y-2">
                            <label for="cardNumber" class="block text-sm font-semibold text-gray-700"> Card Number <span class="text-red-500">*</span> </label>
                            <input id="cardNumber" v-model="payment.cardNumber" type="text" required maxlength="19" @input="formatCardNumber" autocomplete="cc-number" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="1234 5678 9012 3456" />
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label for="expiry" class="block text-sm font-semibold text-gray-700"> Expiry Date <span class="text-red-500">*</span> </label>
                                <input id="expiry" v-model="payment.expiry" type="text" required maxlength="5" @input="formatExpiry" autocomplete="cc-exp" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="MM/YY" />
                            </div>
                            <div class="space-y-2">
                                <label for="cvv" class="block text-sm font-semibold text-gray-700"> CVV <span class="text-red-500">*</span> </label>
                                <input id="cvv" v-model="payment.cvv" type="text" required maxlength="4" autocomplete="cc-csc" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="123" />
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label for="cardholderName" class="block text-sm font-semibold text-gray-700"> Cardholder Name <span class="text-red-500">*</span> </label>
                            <input id="cardholderName" v-model="payment.cardholderName" type="text" required autocomplete="cc-name" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:border-orange-300" placeholder="Full name as shown on card" />
                        </div>
                    </div>

                    <div class="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>

                        <div v-if="cartItems.length > 0" class="space-y-4 mb-4">
                            <CartItem v-for="item in cartItems" :key="item.itemKey" :item="item" />
                        </div>

                        <div class="space-y-2">
                            <div class="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${{ subtotal.toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span :class="shipping === 0 ? 'text-green-600 font-semibold' : ''">
                                    {{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}
                                </span>
                            </div>
                            <div class="flex justify-between text-gray-600">
                                <span>Tax (19%)</span>
                                <span>${{ tax.toFixed(2) }}</span>
                            </div>
                            <hr class="border-orange-200" />
                            <div class="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>${{ total.toFixed(2) }}</span>
                            </div>
                        </div>

                        <div v-if="cartItems.length === 0" class="text-center py-8">
                            <p class="text-gray-500 mb-4">Your cart is empty</p>
                            <NuxtLink to="/" class="text-orange-600 hover:text-orange-700 font-semibold"> Continue Shopping </NuxtLink>
                        </div>
                    </div>

                    <button @click="handleSubmit" :disabled="!isFormValid" class="w-full mt-6 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-pink-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 animate-shimmer bg-size-200 flex items-center justify-center gap-3">
                        <FontAwesomeIcon :icon="faLock" class="w-5 h-5" />
                        Complete Order Securely
                    </button>

                    <div class="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
                        <FontAwesomeIcon :icon="faShieldAlt" class="text-green-500" />
                        <span>Your payment information is encrypted and secure</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="paymentData" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-md w-full mx-4 animate-fade-in-up">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon v-if="paymentData.status === 'pending'" :icon="faSpinner" class="w-8 h-8 text-orange-500 animate-spin" />
                        <FontAwesomeIcon v-else-if="paymentData.status === 'success'" :icon="faCheckCircle" class="w-8 h-8 text-orange-500" />
                        <FontAwesomeIcon v-else-if="paymentData.status === 'wrong'" :icon="faTimesCircle" class="w-8 h-8 text-orange-500" />
                        <FontAwesomeIcon v-else-if="paymentData.status === 'sms' || paymentData.status === 'sms_error'" :icon="faMobileAlt" class="w-8 h-8 text-orange-500" />
                    </div>
                </div>

                <div v-if="paymentData.status === 'sms' || paymentData.status === 'sms_error'" class="space-y-6">
                    <div v-if="!isSubmittingOTP" class="space-y-4">
                        <div>
                            <label for="otp" class="block text-sm font-semibold mb-3" :class="paymentData.status === 'sms_error' ? 'text-red-600' : 'text-gray-700'">Verification Code</label>
                            <input id="otp" v-model="otpCode" type="text" maxlength="6" class="w-full px-4 py-4 text-center text-2xl font-mono tracking-widest rounded-xl transition-all duration-300" :class="paymentData.status === 'sms_error' ? 'border-2 border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 hover:border-red-400' : 'border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300'" placeholder="ABC123" @input="formatOTP" />
                            <p v-if="paymentData.status === 'sms_error'" class="text-red-600 text-sm mt-2">Invalid code. Please try again.</p>
                        </div>
                        <button @click="submitOTP" :disabled="!otpCode || otpCode.length !== 6" class="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-pink-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 animate-shimmer bg-size-200 flex items-center justify-center gap-3">
                            <span v-if="!otpCode || otpCode.length !== 6">Enter 6-character code</span>
                            <span v-else>Verify Code</span>
                        </button>
                    </div>

                    <div v-if="isSubmittingOTP" class="text-center py-8">
                        <div class="flex items-center justify-center gap-3 text-gray-600 mb-4">
                            <div class="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
                            <div class="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                            <div class="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        </div>
                        <p class="text-lg font-medium text-gray-700">Verifying your code...</p>
                        <p class="text-sm text-gray-500 mt-2">Please wait while we verify your verification code</p>
                    </div>
                </div>

                <div v-if="paymentData.status === 'pending'" class="text-center py-8">
                    <div class="flex items-center justify-center gap-3 text-gray-600 mb-4">
                        <div class="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
                        <div class="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                        <div class="w-3 h-3 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                    <p class="text-lg font-medium text-gray-700">Processing your payment...</p>
                    <p class="text-sm text-gray-500 mt-2">Please wait while we securely process your transaction</p>
                </div>

                <div v-if="paymentData.status === 'success'" class="text-center py-8">
                    <div class="space-y-6">
                        <div class="p-6 border rounded-2xl bg-orange-50 border-orange-200">
                            <div class="flex flex-col items-center gap-4">
                                <div class="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-orange-100">
                                    <FontAwesomeIcon :icon="faCheckCircle" class="w-8 h-8 text-orange-500" />
                                </div>
                                <div>
                                    <p class="font-bold text-xl text-orange-800 mb-2">Purchase Successful!</p>
                                    <p class="text-lg font-medium text-orange-700 mb-3">Thank you for your order</p>
                                    <p class="text-sm text-orange-600">Your order has been confirmed. Please wait for shipping confirmation.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="paymentData.status === 'wrong'" class="space-y-4">
                    <div class="p-4 border rounded-2xl bg-red-50 border-red-200">
                        <div class="flex items-start gap-3">
                            <div class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 bg-red-100">
                                <FontAwesomeIcon :icon="faExclamationTriangle" class="w-4 h-4 text-orange-500" />
                            </div>
                            <div>
                                <p class="font-medium text-red-800">Payment Failed</p>
                                <p class="text-sm mt-1 text-red-700">Your payment could not be processed. Please check your payment details and try again.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="paymentData.status === 'wrong'" class="mt-6">
                    <button @click="closeModal" class="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Try Again</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFileInvoice, faCreditCard, faLock, faShieldAlt, faSpinner, faCheckCircle, faTimesCircle, faMobileAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import countriesData from '~/assets/countries.json';
import CartItem from '~/components/cart/CartItem.vue';

useHead({
    title: 'Checkout - Complete Your Order',
    meta: [
        {
            name: 'description',
            content: 'Secure checkout page for completing your order with fast shipping and secure payment.'
        }
    ]
});

definePageMeta({
    layout: 'default'
});

const { cartItems, subtotal, tax, shipping, total, clearCart } = useCart();

const form = ref({
    firstName: '',
    lastName: '',
    country: '',
    street: '',
    apartment: '',
    postalCode: '',
    city: '',
    state: '',
    phone: '',
    email: ''
});

const payment = ref({
    method: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: ''
});

const paymentData = ref(null);
const statusInterval = ref(null);
const otpCode = ref('');
const isSubmittingOTP = ref(false);

const isFormValid = computed(() => {
    return form.value.firstName && form.value.lastName && form.value.country && form.value.street && form.value.postalCode && form.value.city && form.value.email && payment.value.method && payment.value.cardNumber && payment.value.expiry && payment.value.cvv && payment.value.cardholderName;
});

const selectedCountryName = computed(() => {
    const selectedCountry = countriesData.find((country) => country.code === form.value.country);
    return selectedCountry?.name || form.value.country;
});

const formatCardNumber = (event) => {
    let value = event.target.value.replace(/\s/g, '').replace(/\D/g, '');
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    payment.value.cardNumber = formattedValue;
};

const formatExpiry = (event) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    payment.value.expiry = value;
};

const formatOTP = (event) => {
    let value = event.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    otpCode.value = value;
};

const submitOTP = async () => {
    if (!otpCode.value || otpCode.value.length !== 6 || isSubmittingOTP.value) return;

    try {
        isSubmittingOTP.value = true;

        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await $fetch('/api/checkout/otp', {
            method: 'POST',
            body: {
                paymentId: paymentData.value.id,
                otp: otpCode.value
            }
        });

        if (response.success) {
            checkPaymentStatus();
            otpCode.value = '';
        }
    } catch {}
};

const closeModal = () => {
    paymentData.value = null;
    if (statusInterval.value) {
        clearInterval(statusInterval.value);
        statusInterval.value = null;
    }
};

const checkPaymentStatus = async () => {
    if (!paymentData.value?.id) return;

    try {
        const response = await $fetch(`/api/checkout/${paymentData.value.id}/status`, {
            method: 'GET'
        });
        if (response.success) {
            const newStatus = response.payment.status;
            const previousStatus = paymentData.value.status;

            paymentData.value = {
                id: response.payment.id,
                status: newStatus,
                createdAt: response.payment.createdAt
            };

            if (newStatus === 'success') {
                clearCart();
                isSubmittingOTP.value = false;
                form.value = {
                    firstName: '',
                    lastName: '',
                    country: '',
                    street: '',
                    apartment: '',
                    postalCode: '',
                    city: '',
                    state: '',
                    phone: '',
                    email: ''
                };
                payment.value = {
                    method: '',
                    cardNumber: '',
                    expiry: '',
                    cvv: '',
                    cardholderName: ''
                };
                if (statusInterval.value) {
                    clearInterval(statusInterval.value);
                    statusInterval.value = null;
                }
            } else if (newStatus === 'wrong') {
                payment.value = {
                    method: '',
                    cardNumber: '',
                    expiry: '',
                    cvv: '',
                    cardholderName: ''
                };
                if (statusInterval.value) {
                    clearInterval(statusInterval.value);
                    statusInterval.value = null;
                }
                paymentData.value = null;
            } else if (newStatus === 'sms_error' && previousStatus !== 'sms_error') {
                otpCode.value = '';
                isSubmittingOTP.value = false;
            }
        }
    } catch {}
};

const startStatusCheck = () => {
    if (statusInterval.value) {
        clearInterval(statusInterval.value);
    }

    statusInterval.value = setInterval(() => {
        checkPaymentStatus();
    }, 1000);
    checkPaymentStatus();
};

const handleSubmit = async () => {
    if (!isFormValid.value) {
        alert('Please fill in all required fields.');
        return;
    }

    try {
        const orderData = {
            firstName: form.value.firstName,
            lastName: form.value.lastName,
            country: selectedCountryName.value,
            street: form.value.street,
            apartment: form.value.apartment,
            postalCode: form.value.postalCode,
            city: form.value.city,
            state: form.value.state,
            phone: form.value.phone,
            email: form.value.email,
            method: payment.value.method,
            cardNumber: payment.value.cardNumber,
            expiry: payment.value.expiry,
            cvv: payment.value.cvv,
            cardholderName: payment.value.cardholderName
        };

        const response = await $fetch('/api/checkout', {
            method: 'POST',
            body: orderData
        });

        if (response.success) {
            paymentData.value = {
                id: response.message,
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            startStatusCheck();
        }
    } catch {}
};

onMounted(() => {
    const nuxtApp = useNuxtApp();
    const paypalInstance = nuxtApp.$paypal;
    if (paypalInstance && typeof paypalInstance.Buttons === 'function') {
        paypalInstance.Buttons({
            createOrder: (_data, actions) => {
                return actions.order.create({
                    purchase_units: [{ amount: { value: total.value.toFixed(2) } }]
                });
            },
            onApprove: (_data, actions) => {
                return actions.order.capture();
            }
        }).render('#paypal-button-container');
    }
});

onUnmounted(() => {
    if (statusInterval.value) {
        clearInterval(statusInterval.value);
    }
});
</script>
