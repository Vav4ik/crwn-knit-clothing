import { User } from "firebase/auth";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserStatedata = UserData & {
  id: string;
};

export type UserEmailSignInType = {
  email: string;
  password: string;
};

export type UserEmailSignUpType = UserEmailSignInType & {
  displayName: string;
};

export type SignAfterSignUpInType = {
  user: User;
  additionalDetails: {
    displayName: string;
  };
};
