import { ref, computed } from 'vue';

interface Product {
    id: string | number;
    name: string;
    originalPrice: number;
    salePrice: number;
    discount: number;
    image?: string;
}

interface CartItem {
    id: string | number;
    name: string;
    originalPrice: number;
    salePrice: number;
    discount: number;
    color: string;
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
    const generateItemKey = (productId: string | number, color: string, size: string): string => {
        return `${productId}-${color}-${size}`;
    };

    const addToCart = (product: Product, selectedColor: string, selectedSize: string, quantity: number): void => {
        if (!product || !selectedColor || !selectedSize || quantity <= 0) {
            console.error('Invalid product data or quantity');
            return;
        }

        const itemKey = generateItemKey(product.id, selectedColor, selectedSize);
        const existingItemIndex = cartItems.value.findIndex((item) => generateItemKey(item.id, item.color, item.size) === itemKey);

        if (existingItemIndex !== -1) {
            cartItems.value[existingItemIndex].quantity += quantity;
        } else {
            const newItem: CartItem = {
                id: product.id,
                name: product.name || '',
                originalPrice: product.originalPrice || 0,
                salePrice: product.salePrice || 0,
                discount: product.discount || 0,
                color: selectedColor,
                size: selectedSize,
                quantity: quantity,
                image: product.image ?? '/img/cotton_short.webp',
                itemKey
            };
            cartItems.value.push(newItem);
        }

        saveCart();
    };

    const removeFromCart = (itemKey: string): void => {
        cartItems.value = cartItems.value.filter((item) => item.itemKey !== itemKey);
        saveCart();
        if (import.meta.client && cartItems.value.length === 0) {
            const router = useRouter();
            const randomString = Array.from({ length: 20 }, () => Math.random().toString(36).charAt(2)).join('');
            const randomNum = Math.floor(Math.random() * 9000000000) + 1000000000;
            const randomId = Math.random() > 0.5 ? randomString : randomNum.toString();
            router.push(`/product/${randomId}`);
        }
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

    const getItemByKey = (itemKey: string): CartItem | undefined => {
        return cartItems.value.find((item) => item.itemKey === itemKey);
    };

    const isInCart = (productId: string | number, color: string, size: string): boolean => {
        const itemKey = generateItemKey(productId, color, size);
        return cartItems.value.some((item) => item.itemKey === itemKey);
    };

    const getCartItemQuantity = (productId: string | number, color: string, size: string): number => {
        const itemKey = generateItemKey(productId, color, size);
        const item = cartItems.value.find((item) => item.itemKey === itemKey);
        return item ? item.quantity : 0;
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
        getItemByKey,
        isInCart,
        getCartItemQuantity,
        subtotal,
        tax,
        shipping,
        total,
        itemCount,
        isEmpty
    };
};
