import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ItemType } from "../categories/categories.types";
import { CartItemType } from "./cart.types";

//helper functions
const addCartItem = (cartItems: CartItemType[], productToAdd: ItemType) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (existingItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItemType[],
  cartItemToRemove: CartItemType
) => {
  const existingItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  if (existingItem && existingItem.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

const clearCartItem = (
  cartItems: CartItemType[],
  cartItemToClear: CartItemType
) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

//initial state

interface CartState {
  isCartOpen: boolean;
  cartItems: CartItemType[];
}

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action: PayloadAction<ItemType>) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart(state, action: PayloadAction<CartItemType>) {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart(state, action: PayloadAction<CartItemType>) {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
  },
});

export const {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
