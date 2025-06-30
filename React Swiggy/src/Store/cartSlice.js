import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
    initialState: {
        items: [], // Initial state of the cart
        totalItems: 0,
        totalPrice: 0,
    },
    reducers: {
        // Reducer Again an Object with key-value pairs
        // The key is the action name and the value is the function that updates the state
        // Actions to manage the cart state
        // addItem, removeItem, clearCart are the action names and the functions are the reducers
        // These functions take the current state and an action as arguments
        addItem: (state, action) => {
            const item = action.payload;
            // Normalize price to rupees
            const price = item.price ? item.price / 100 : (item.defaultPrice ? item.defaultPrice / 100 : 0);
            const existingItem = state.items.find(i => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
                state.totalItems += 1;
                state.totalPrice += price;
            } else {
                state.items.push({
                    id: item.id,
                    name: item.name,
                    price: price,
                    quantity: 1,
                    imageId: item.imageId,
                    description: item.description,
                });
                state.totalItems += 1;
                state.totalPrice += price;
            }
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                state.totalItems -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
                state.items.splice(itemIndex, 1);
            }
        },
        incrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find(i => i.id === itemId);
            if (item) {
                item.quantity += 1;
                state.totalItems += 1;
                state.totalPrice += item.price;
            }
        },
        decrementQuantity: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find(i => i.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalItems -= 1;
                state.totalPrice -= item.price;
            } else if (item && item.quantity === 1) {
                // Remove item if quantity is 1
                state.items = state.items.filter(i => i.id !== itemId);
                state.totalItems -= 1;
                state.totalPrice -= item.price;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        },
    },
});

// The createSlice function automatically generates action creators and action types
// based on the reducers defined in the slice.
// For example, the addItem action will be available as cartSlice.actions.addItem
// and the action type will be 'cart/addItem'.
// cart Slice is sort of big objcet which contains the actions and the reducer
// The actions are the functions that will be used to update the state
// and the reducer is the function that will be used to update the state based on the actions.

// Export the actions to be used in components
export const { addItem, removeItem, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;