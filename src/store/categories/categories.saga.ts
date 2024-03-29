import { takeLatest, all, call, put } from "typed-redux-saga/macro";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categories.slice";

export function* fetchCategoriesAsync() {
  try {
    //passing parameter "categories", just to show how to pass a parameter/argument in this case
    const categoriesArray = yield* call(getCategoriesAndDocuments, "categories");
    yield* put(fetchCategoriesSuccess(categoriesArray));
  } catch (error: unknown) {
    yield* put(fetchCategoriesFailed("Something didn't go well :("));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    "categories/fetchCategoriesStart",
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
