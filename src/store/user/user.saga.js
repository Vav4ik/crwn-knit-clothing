import { takeLatest, all, call, put } from "redux-saga/effects";

import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  getCurrentUser,
  signinAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess,
} from "./user.slice";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapShot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signinAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error.message));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield signInFailed(error.message);
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    const userData =
      user &&
      (({ uid, accessToken, email }) => ({ uid, accessToken, email }))(user);
    yield put(signUpSuccess({ userData, additionalDetails: { displayName } }));
  } catch (error) {
    yield put(signUpFailed(error.message));
  }
}

export function* signInAfterSignUp({ payload: { userData, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, userData, additionalDetails);
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error.message));
  }
}

export function* onCheckUserSession() {
  yield takeLatest("user/checkUserSession", isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest("user/googleSignInStart", signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest("user/emailSignInStart", signInWithEmail);
}

export function* onSignUpStart() {
  yield takeLatest("user/signUpStart", signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest("user/signUpSuccess", signInAfterSignUp);
}

export function* onSignOutStart() {
  yield takeLatest("user/signOutStart", signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
