import React, { useState } from "react";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {
  signinAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const formChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await signinAuthUserWithEmailAndPassword(email, password);
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

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  return (
    <div className="sign-in-container">
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            GOOGLE Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
