import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
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
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
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
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
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
    yield* put(signUpFailed(error as Error));
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
    yield* put(signOutFailed(error as Error));
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
