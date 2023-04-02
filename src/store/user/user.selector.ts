import { RootState } from "../store";

export const selectCurrentUser = (state: RootState) => state.user.currentUser;

export const selecUserError = (state: RootState) => state.user.error;
