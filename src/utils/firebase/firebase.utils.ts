// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { CategoryType } from "../../store/categories/categories.types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC85AejRlC66SWLUYAfcknj-0ACp_c8K0s",
  authDomain: "crwn-knit-clothing-db.firebaseapp.com",
  projectId: "crwn-knit-clothing-db",
  storageBucket: "crwn-knit-clothing-db.appspot.com",
  messagingSenderId: "363025119187",
  appId: "1:363025119187:web:bc8de142b96cec846e6126",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Authentication
export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signinAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

//Firestore DB
export const db = getFirestore(firebaseApp);

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocments = async <T extends ObjectToAdd>(
  collectonKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectonKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Shop data uploaded");
};

export const getCategoriesAndDocuments = async (): Promise<CategoryType[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as CategoryType
  );
};

export type AdditionalDetails = {
  displayName?: string;
};

export type UserData = {
  createdAt: number;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalDetails = {} as AdditionalDetails
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = Date.now();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalDetails,
      });
      const userSnapShot = await getDoc(userDocRef);
      return userSnapShot as QueryDocumentSnapshot<UserData>;
    } catch (error: unknown) {
      console.log("Error creating the user");
    }
  }

  return userSnapShot as QueryDocumentSnapshot<UserData>;
};
