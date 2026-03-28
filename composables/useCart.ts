import { ref, computed } from 'vue';

type Id = string | number;

interface Product {
    id: Id;
    name: string;
    originalPrice: number;
    salePrice: number;
    discount: number;
    image?: string;
    variantId?: Id;
}

interface ProductVariant {
    id?: Id;
    color_name?: string;
    color_code?: string;
}

interface CartItem {
    id: Id;
    variantId?: Id;
    name: string;
    originalPrice: number;
    salePrice: number;
    discount: number;
    color: string;
    colorCode?: string;
    size: string;
    quantity: number;
    image: string;
    itemKey: string;
}

const cartItems = ref<CartItem[]>([]);

if (import.meta.client) {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cartItems.value = JSON.parse(savedCart);
        } catch {
            cartItems.value = [];
        }
    }
}

const saveCart = () => {
    if (import.meta.client) {
        localStorage.setItem('cart', JSON.stringify(cartItems.value));
    }
};

export const useCart = () => {
    const generateItemKey = (
        productId: Id,
        variantId: Id | undefined,
        color: string,
        size: string
    ): string => {
        const variantKey = variantId ?? color;
        return `${productId}-${variantKey}-${size}`;
    };

    const addToCart = (
        product: Product,
        selectedVariant: ProductVariant | null | undefined,
        selectedSize: string,
        quantity: number
    ): void => {
        const selectedColor = selectedVariant?.color_name || 'Default';
        const selectedColorCode = selectedVariant?.color_code || '#D1D5DB';
        const selectedVariantId = selectedVariant?.id ?? product.variantId;

        if (!product || !selectedColor || !selectedSize || quantity <= 0) {
            console.error('Invalid product data or quantity');
            return;
        }

        const itemKey = generateItemKey(product.id, selectedVariantId, selectedColor, selectedSize);
        const existingItemIndex = cartItems.value.findIndex(
            (item) => generateItemKey(item.id, item.variantId, item.color, item.size) === itemKey
        );

        if (existingItemIndex === -1) {
            const newItem: CartItem = {
                id: product.id,
                variantId: selectedVariantId,
                name: product.name || '',
                originalPrice: product.originalPrice || 0,
                salePrice: product.salePrice || 0,
                discount: product.discount || 0,
                color: selectedColor,
                colorCode: selectedColorCode,
                size: selectedSize,
                quantity: quantity,
                image: product.image ?? '/img/cotton_short.webp',
                itemKey
            };
            cartItems.value.push(newItem);
            saveCart();
            return;
        }

        cartItems.value[existingItemIndex].quantity += quantity;
        saveCart();
    };

    const removeFromCart = (itemKey: string): void => {
        cartItems.value = cartItems.value.filter((item) => item.itemKey !== itemKey);
        saveCart();
    };

    const updateQuantity = (itemKey: string, newQuantity: number): void => {
        if (newQuantity <= 0) {
            removeFromCart(itemKey);
            return;
        }

        const item = cartItems.value.find((item) => item.itemKey === itemKey);
        if (item) {
            item.quantity = newQuantity;
            saveCart();
        }
    };

    const clearCart = (): void => {
        cartItems.value = [];
        saveCart();
    };

    const subtotal = computed(() => {
        return cartItems.value.reduce((total, item) => {
            return total + (item.salePrice || 0) * (item.quantity || 1);
        }, 0);
    });

    const tax = computed(() => {
        return subtotal.value * 0.19;
    });

    const shipping = computed(() => {
        return subtotal.value > 30 ? 0 : 5.99;
    });

    const total = computed(() => {
        return subtotal.value + tax.value + shipping.value;
    });

    const itemCount = computed(() => {
        return cartItems.value.reduce((count, item) => count + item.quantity, 0);
    });

    const isEmpty = computed(() => {
        return cartItems.value.length === 0;
    });

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        tax,
        shipping,
        total,
        itemCount,
        isEmpty
    };
};
