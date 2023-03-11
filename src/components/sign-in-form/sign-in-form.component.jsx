import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.slice";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const formChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart({ email, password }));
      setFormFields(defaultFormFields);
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        alert("Wrong Email or Password!");
        return;
      }
      console.log(error.message);
    }
  };

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          onChange={formChangeHandler}
          id="email"
          name="email"
          type="email"
          value={email}
          required
        />

        <FormInput
          label="Password"
          onChange={formChangeHandler}
          id="password"
          name="password"
          type="password"
          value={password}
          required
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            GOOGLE Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
