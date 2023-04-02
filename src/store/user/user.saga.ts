import { PayloadAction } from "@reduxjs/toolkit";
import { AuthError, AuthErrorCodes, User } from "firebase/auth";
import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  getCurrentUser,
  signinAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
  AdditionalDetails,
} from "../../utils/firebase/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from "./user.slice";
import {
  SignAfterSignUpInType,
  UserEmailSignInType,
  UserEmailSignUpType,
} from "./user.types";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalDetails
) {
  try {
    const userSnapShot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (userSnapShot) {
      yield* put(
        signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() })
      );
    }
  } catch (error) {
    yield* put(signInFailed("Error fetching user data"));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed("Error Signing In with GOOGLE"));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: PayloadAction<UserEmailSignInType>) {
  try {
    const userCredential = yield* call(
      signinAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    if (
      (error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD ||
      (error as AuthError).code === AuthErrorCodes.USER_MISMATCH
    ) {
      yield* put(signInFailed("Wrong Email or Password!"));
    } else {
      yield* put(signInFailed("Sign In Failed! Try again."));
    }
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed("Problem Signing In!"));
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: PayloadAction<UserEmailSignUpType>) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      // const userData =
      //   user &&
      //   (({ uid, email }) => ({ uid, email }))(user);
      yield* put(signUpSuccess({ user, additionalDetails: { displayName } }));
    }
  } catch (error) {
    // you need to learn to handle errors properly, this is a mess... sort of
    if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
      yield* put(signUpFailed("Email already exists"));
    } else {
      yield* put(signUpFailed("Sign Up Failed, please try again!"));
    }
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: PayloadAction<SignAfterSignUpInType>) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed("Sign Out Failed..."));
  }
}

export function* onCheckUserSession() {
  yield* takeLatest("user/checkUserSession", isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield* takeLatest("user/googleSignInStart", signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest("user/emailSignInStart", signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest("user/signUpStart", signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest("user/signUpSuccess", signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest("user/signOutStart", signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
