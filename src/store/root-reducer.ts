import { combineReducers } from "@reduxjs/toolkit";

import { cartReducer } from "./cart/cart.slice";
import { categoriesReducer } from "./categories/categories.slice";
import { userReducer } from "./user/user.slice";

export const rootReducer = combineReducers({
  cart: cartReducer,
  categories: categoriesReducer,
  user: userReducer,
});
