import { create } from 'zustand';

const useCartStore = create((set, get) => ({
    cart: {},
    addToCart: (product) => 
        set((state) => ({
            cart: {
                ...state.cart,
                [product.id]: {
                    ...(state.cart[product.id] || { quantity: 0, ...product }),
                    quantity: (state.cart[product.id]?.quantity || 0) + 1
                }
            }
        })),
    increment: (productId) =>
        set((state) => ({
            cart: {
                ...state.cart,
                [productId]: {
                    ...state.cart[productId],
                    quantity: state.cart[productId].quantity + 1
                }
            }
        })),
    decrement: (productId) =>
        set((state) => {
            const newCart = { ...state.cart };
            if (newCart[productId].quantity > 1) {
                newCart[productId].quantity -= 1;
            } else {
                delete newCart[productId];
            }
            return { cart: newCart };
        }),

    totalQuantity: () => {
        const cart = get().cart;
        return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    },
    uniqueItemCount: () => {
        const cart = get().cart;
        return Object.keys(cart).length;
    },
    totalPrice: () => {
        const cart = get().cart;
        return Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0);
    }
}));

export default useCartStore;
