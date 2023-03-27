import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { CategoryType } from "./categories.types";

// Define a type for the slice state
interface CategoriesState {
  categories: CategoryType[];
  isLoading: boolean;
  error: string | null;
}

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    fetchCategoriesStart(state) {
      state.isLoading = true;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<CategoryType[]>) {
      state.isLoading = false;
      state.categories = action.payload;
    },
    fetchCategoriesFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

// export const categoriesReducerOld = (
//   state = CATEGORIES_INITIAL_STATE,
//   action = {}
// ) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         categories: payload,
//       };
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
//       return {
//         ...state,
//         isLoading: false,
//         error: payload,
//       };
//     default:
//       return state;
//   }
// };
