import React, { FC, ButtonHTMLAttributes } from "react";

import {
  BaseButton,
  ButtonSpinner,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
} as const;

//setting a type instead of using enum, more flexible
export type ButtonTypeClasses =
  typeof BUTTON_TYPE_CLASSES[keyof typeof BUTTON_TYPE_CLASSES];

// console.log(BUTTON_TYPE_CLASSES.base === "base");

const getButton = (buttonType: ButtonTypeClasses = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

type ButtonProps = {
  children?: React.ReactNode;
  buttonType?: ButtonTypeClasses;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
