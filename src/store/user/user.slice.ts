import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { SignAfterSignUpInType, UserEmailSignInType, UserEmailSignUpType, UserStatedata } from "./user.types";

// Define a type for the slice state
interface UserState {
  currentUser: UserStatedata | null;
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    checkUserSession(state) {
      state.isLoading = true;
    },
    googleSignInStart(state) {
      state.isLoading = true;
    },
    emailSignInStart(state, action: PayloadAction<UserEmailSignInType>) {
      state.isLoading = true;
    },
    signUpStart(state, action: PayloadAction<UserEmailSignUpType>) {
      state.isLoading = true;
    },
    signUpSuccess(state, action: PayloadAction<SignAfterSignUpInType>) {
      state.isLoading = true;
    },
    signOutStart(state) {
      state.isLoading = true;
    },
    signInSuccess(state, action: PayloadAction<UserStatedata>) {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    signOutSuccess(state) {
      state.isLoading = false;
      state.currentUser = null;
    },
    signInFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    signUpFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    signOutFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signUpStart,
  signUpSuccess,
  signOutStart,
  signInSuccess,
  signOutSuccess,
  signInFailed,
  signUpFailed,
  signOutFailed,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

// export const userReducerOld = (state = INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//       return {
//         ...state,
//         currentUser: payload,
//       };
//     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//       return {
//         ...state,
//         currentUser: null,
//       };
//     case USER_ACTION_TYPES.SIGN_IN_FAILED:
//     case USER_ACTION_TYPES.SIGN_UP_FAILED:
//     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//       return {
//         ...state,
//         error: payload,
//       };
//     default:
//       return state;
//   }
// };
