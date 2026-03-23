<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50"
  >
    <div
      class="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 py-2 sm:py-4"
    >
      <div class="max-w-7xl mx-auto px-2 sm:px-4">
        <div
          class="flex flex-wrap justify-center lg:grid lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 text-white"
        >
          <div
            class="flex items-center gap-1 sm:gap-3 group cursor-pointer hover:bg-white/10 p-1 sm:p-3 rounded-xl transition-all duration-300"
          >
            <div
              class="w-6 h-6 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0"
            >
              <FontAwesomeIcon
                :icon="faShippingFast"
                class="w-3 h-3 sm:w-5 sm:h-5 text-white"
              />
            </div>
            <div class="text-left">
              <div class="font-bold text-xs sm:text-sm">Free Shipping</div>
              <div class="text-xs text-orange-100 hidden sm:block">
                On all orders over $30
              </div>
            </div>
          </div>

          <div
            class="flex items-center gap-1 sm:gap-3 group cursor-pointer hover:bg-white/10 p-1 sm:p-3 rounded-xl transition-all duration-300"
          >
            <div
              class="w-6 h-6 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0"
            >
              <FontAwesomeIcon
                :icon="faUndo"
                class="w-3 h-3 sm:w-5 sm:h-5 text-white"
              />
            </div>
            <div class="text-left">
              <div class="font-bold text-xs sm:text-sm">30 Day Return</div>
              <div class="text-xs text-orange-100 hidden sm:block">
                30 day money back guarantee
              </div>
            </div>
          </div>

          <div
            class="flex items-center gap-1 sm:gap-3 group cursor-pointer hover:bg-white/10 p-1 sm:p-3 rounded-xl transition-all duration-300"
          >
            <div
              class="w-6 h-6 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0"
            >
              <FontAwesomeIcon
                :icon="faGlobe"
                class="w-3 h-3 sm:w-5 sm:h-5 text-white"
              />
            </div>
            <div class="text-left">
              <div class="font-bold text-xs sm:text-sm">
                International Warranty
              </div>
              <div class="text-xs text-orange-100 hidden sm:block">
                Offered in the country of usage
              </div>
            </div>
          </div>

          <div
            class="flex items-center gap-1 sm:gap-3 group cursor-pointer hover:bg-white/10 p-1 sm:p-3 rounded-xl transition-all duration-300"
          >
            <div
              class="w-6 h-6 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex-shrink-0"
            >
              <FontAwesomeIcon
                :icon="faCreditCard"
                class="w-3 h-3 sm:w-5 sm:h-5 text-white"
              />
            </div>
            <div class="text-left">
              <div class="font-bold text-xs sm:text-sm">
                100% Secure Payment
              </div>
              <div class="text-xs text-orange-100 hidden sm:block">
                PayPal / MasterCard / Visa
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-3 sm:px-4 py-12 sm:py-16 lg:py-20">
      <div class="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        <div
          class="space-y-6 sm:space-y-8 lg:space-y-10 animate-fade-in-up text-center lg:text-left"
        >
          <div class="space-y-4 sm:space-y-6">
            <h1
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
            >
              <span class="text-orange-500 drop-shadow-lg animate-pulse-slow"
                >60% Off</span
              ><br />
              <span
                class="bg-gradient-to-r from-gray-900 via-orange-600 to-gray-700 bg-clip-text text-transparent animate-gradient"
                >Designer Brands</span
              >
            </h1>

            <p
              class="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-delayed"
            >
              High-quality fashion at unbeatable prices. Limited time only!
            </p>
          </div>

          <div
            class="flex fl/ex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-delayed justify-center lg:justify-start"
          >
            <NuxtLink
              to="/products"
              class="group inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-pink-500 text-white font-bold text-base sm:text-lg rounded-xl transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 animate-shimmer bg-size-200"
            >
              Discover Now
              <FontAwesomeIcon
                :icon="faArrowRight"
                class="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
              />
            </NuxtLink>
            <button
              class="group inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-orange-50 text-gray-900 font-bold text-base sm:text-lg rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all duration-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <FontAwesomeIcon
                :icon="faPlay"
                class="mr-2 sm:mr-3 w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300"
              />
              Watch Demo
            </button>
          </div>

          <div
            class="flex flex-wrap gap-2 sm:gap-4 lg:flex-col lg:space-y-6 animate-stagger-in justify-center lg:justify-start"
          >
            <div
              class="flex items-center gap-2 sm:gap-4 group cursor-pointer hover:bg-orange-50 p-2 sm:p-3 rounded-xl transition-all duration-300"
            >
              <div
                class="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl flex-shrink-0"
              >
                <FontAwesomeIcon
                  :icon="faCheck"
                  class="w-3 h-3 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span
                class="text-gray-700 font-semibold text-xs sm:text-lg group-hover:text-orange-600 transition-colors duration-300"
                >Premium Quality Guaranteed</span
              >
            </div>

            <div
              class="flex items-center gap-2 sm:gap-4 group cursor-pointer hover:bg-blue-50 p-2 sm:p-3 rounded-xl transition-all duration-300"
            >
              <div
                class="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl flex-shrink-0"
              >
                <FontAwesomeIcon
                  :icon="faShippingFast"
                  class="w-3 h-3 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span
                class="text-gray-700 font-semibold text-xs sm:text-lg group-hover:text-blue-600 transition-colors duration-300"
                >Fast & Free Shipping</span
              >
            </div>

            <div
              class="flex items-center gap-2 sm:gap-4 group cursor-pointer hover:bg-green-50 p-2 sm:p-3 rounded-xl transition-all duration-300"
            >
              <div
                class="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl flex-shrink-0"
              >
                <FontAwesomeIcon
                  :icon="faMoneyBillWave"
                  class="w-3 h-3 sm:w-5 sm:h-5 text-white group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span
                class="text-gray-700 font-semibold text-xs sm:text-lg group-hover:text-green-600 transition-colors duration-300"
                >30-Day Money Back</span
              >
            </div>
          </div>
        </div>

        <div
          class="flex justify-center lg:justify-end relative animate-float order-first lg:order-last"
        >
          <div class="relative group">
            <div
              class="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse-glow"
            ></div>
            <div
              class="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-orange-300 to-pink-300 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            ></div>
            <img
              src="/img/man.webp"
              alt="Fashion Model"
              class="relative w-full max-w-xs sm:max-w-sm lg:max-w-lg h-auto object-cover rounded-3xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-700 hover:shadow-orange-500/25"
            />
            <div
              class="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-110"
            >
              <div class="flex items-center gap-2 sm:gap-3">
                <div
                  class="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-ping"
                ></div>
                <div
                  class="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full absolute animate-pulse"
                ></div>
                <span
                  class="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors"
                  >In Stock</span
                >
              </div>
            </div>
            <div
              class="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500"
            >
              TRENDING
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-3 sm:px-4">
        <div class="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up">
          <div
            class="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 animate-bounce-gentle shadow-lg"
          >
            <FontAwesomeIcon
              :icon="faFire"
              class="w-3 h-3 sm:w-4 sm:h-4 animate-flicker"
            />
            Hot Deals
          </div>
          <h2
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 animate-slide-in-left"
          >
            Our
            <span
              class="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient"
              >Bestsellers</span
            >
          </h2>
          <p
            class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto animate-slide-in-right"
          >
            Bestsellers – only a few pieces left!
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 animate-stagger-in"
        >
          <div
            class="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 flex flex-col h-full animate-fade-in-up"
          >
            <div class="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
              <div
                class="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse-glow"
              ></div>
              <div
                class="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-orange-300 to-pink-300 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              ></div>
              <img
                src="/img/men.jpg"
                alt="Men's Fashion"
                class="relative w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-700"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-orange/20 group-hover:from-black/40 transition-all duration-500"
              ></div>
              <div
                class="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold animate-pulse-slow shadow-lg"
              >
                50% OFF
              </div>
              <div
                class="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-red-400/0 group-hover:from-orange-400/20 group-hover:to-red-400/20 transition-all duration-500"
              ></div>
            </div>
            <div class="p-4 sm:p-6 lg:p-8 flex flex-col flex-grow">
              <h3
                class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors duration-300"
              >
                Premium Men's Fashion
              </h3>
              <p
                class="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg flex-grow group-hover:text-gray-700 transition-colors"
              >
                Only today 50% discount
              </p>
              <button
                class="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-pink-500 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl mt-auto animate-shimmer bg-size-200 text-sm sm:text-base"
              >
                Buy Now
              </button>
            </div>
          </div>

          <div
            class="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 flex flex-col h-full animate-fade-in-delayed"
          >
            <div class="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
              <div
                class="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse-glow"
              ></div>
              <div
                class="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-orange-300 to-red-300 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              ></div>
              <img
                src="/img/woman.jpg"
                alt="Women's Fashion"
                class="relative w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-700"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-orange/20 group-hover:from-black/40 transition-all duration-500"
              ></div>
              <div
                class="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold animate-pulse-slow shadow-lg"
              >
                NEW
              </div>
              <div
                class="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-red-400/0 group-hover:from-orange-400/20 group-hover:to-red-400/20 transition-all duration-500"
              ></div>
            </div>
            <div class="p-4 sm:p-6 lg:p-8 flex flex-col flex-grow">
              <h3
                class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors duration-300"
              >
                Women's Designer Collection
              </h3>
              <p
                class="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg flex-grow group-hover:text-gray-700 transition-colors"
              >
                Limited stock available
              </p>
              <button
                class="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-pink-500 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl mt-auto animate-shimmer bg-size-200 text-sm sm:text-base"
              >
                Buy Now
              </button>
            </div>
          </div>

          <div
            class="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 flex flex-col h-full animate-float"
          >
            <div class="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
              <div
                class="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 animate-pulse-glow"
              ></div>
              <div
                class="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-orange-300 to-red-300 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              ></div>
              <img
                src="/img/winter.jpg"
                alt="Winter Fashion"
                class="relative w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-700"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-orange/20 group-hover:from-black/40 transition-all duration-500"
              ></div>
              <div
                class="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold animate-pulse-slow shadow-lg"
              >
                WINTER
              </div>
              <div
                class="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-red-400/0 group-hover:from-orange-400/20 group-hover:to-red-400/20 transition-all duration-500"
              ></div>
            </div>
            <div class="p-4 sm:p-6 lg:p-8 flex flex-col flex-grow">
              <h3
                class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors duration-300"
              >
                Winter Collection
              </h3>
              <p
                class="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg flex-grow group-hover:text-gray-700 transition-colors"
              >
                Warm & stylish from $60
              </p>
              <button
                class="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-pink-500 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl mt-auto animate-shimmer bg-size-200 text-sm sm:text-base"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 sm:py-16 lg:py-24"
    >
      <div class="max-w-7xl mx-auto px-3 sm:px-4">
        <div class="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up">
          <h2
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
          >
            Why
            <span
              class="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient"
              >FastDealsHub</span
            >?
          </h2>
          <p
            class="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4"
          >
            We believe in simple access to things that are good for our mind,
            body and soul. With a smart offer, excellent support and a secure
            checkout, you are in good hands.
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 lg:mb-20 animate-stagger-in"
        >
          <div
            class="group text-center p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
          >
            <div
              class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl"
            >
              <FontAwesomeIcon
                :icon="faLightbulb"
                class="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3
              class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-orange-600 transition-colors duration-300"
            >
              Smart Ideas
            </h3>
            <p
              class="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors"
            >
              With dozens of smart concepts, you'll find exactly what you're
              looking for in our shop – unique and individually tailored to you.
            </p>
          </div>

          <div
            class="group text-center p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-delayed"
          >
            <div
              class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl"
            >
              <FontAwesomeIcon
                :icon="faHeadset"
                class="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3
              class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-orange-600 transition-colors duration-300"
            >
              Excellent Support
            </h3>
            <p
              class="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors"
            >
              Our customer service is unmatched – our users rave that we don't
              rest until every problem is solved to their satisfaction.
            </p>
          </div>

          <div
            class="group text-center p-4 sm:p-6 lg:p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-float"
          >
            <div
              class="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl"
            >
              <FontAwesomeIcon
                :icon="faShieldAlt"
                class="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3
              class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-orange-600 transition-colors duration-300"
            >
              Secure Checkout
            </h3>
            <p
              class="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors"
            >
              Thanks to 128-bit SSL security with advanced encryption, your
              purchases are guaranteed safe.
            </p>
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 text-white relative overflow-hidden animate-fade-in-up"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20"
          ></div>
          <div
            class="grid lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center relative z-10"
          >
            <div
              class="space-y-3 sm:space-y-6 text-center lg:text-left order-2 lg:order-1"
            >
              <div
                class="inline-flex items-center gap-2 bg-white/20 text-white px-3 sm:px-6 py-1 sm:py-3 rounded-full text-xs sm:text-sm font-semibold animate-bounce-gentle"
              >
                <FontAwesomeIcon
                  :icon="faFire"
                  class="w-3 h-3 sm:w-4 sm:h-4 animate-flicker"
                />
                Weekly Offer!
              </div>
              <h3
                class="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight"
              >
                Outdoor Essentials from legendary designer Ralph Lauren with 50%
                off – only for one week!
              </h3>
              <p class="text-sm sm:text-lg lg:text-xl text-orange-100">
                Don't miss this incredible offer!
              </p>
              <button
                class="group inline-flex items-center justify-center px-4 sm:px-8 lg:px-10 py-3 sm:py-5 bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-orange-50 text-orange-600 font-bold text-sm sm:text-lg rounded-xl transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
              >
                Discover Collection
                <FontAwesomeIcon
                  :icon="faArrowRight"
                  class="ml-2 sm:ml-3 w-3 h-3 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                />
              </button>
            </div>
            <div
              class="flex justify-center lg:justify-end relative animate-float order-1 lg:order-2"
            >
              <div class="relative group">
                <div
                  class="absolute -inset-2 sm:-inset-6 bg-gradient-to-r from-white/20 via-orange-200/30 to-red-200/30 rounded-3xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700 animate-pulse-glow"
                ></div>
                <div
                  class="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-white/10 to-orange-200/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                ></div>
                <img
                  src="/img/girl.webp"
                  alt="Ralph Lauren Collection"
                  class="relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto object-cover rounded-3xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
                />
                <div
                  class="absolute -bottom-2 -right-2 sm:-bottom-6 sm:-right-6 bg-white rounded-xl sm:rounded-2xl p-1 sm:p-4 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-110"
                >
                  <div class="flex items-center gap-1 sm:gap-3">
                    <div
                      class="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-ping"
                    ></div>
                    <div
                      class="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full absolute animate-pulse"
                    ></div>
                    <span
                      class="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors"
                      >50% OFF</span
                    >
                  </div>
                </div>
                <div
                  class="absolute -top-1 -left-1 sm:-top-4 sm:-left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg transform -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500"
                >
                  LIMITED
                </div>
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
  faArrowRight,
  faCheck,
  faShippingFast,
  faMoneyBillWave,
  faPlay,
  faFire,
  faLightbulb,
  faHeadset,
  faShieldAlt,
  faUndo,
  faGlobe,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

useHead({
  title: "Home - 60% Off Designer Brands",
  meta: [
    {
      name: "description",
      content:
        "High-quality fashion at unbeatable prices. 60% off designer brands - limited time only!",
    },
  ],
});

definePageMeta({
  layout: "default",
});

</script>
