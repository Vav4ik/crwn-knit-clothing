import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { SignUpContainer } from "./sign-up-form.styles";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.slice";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const formChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password Do not match");
      return;
    }
    dispatch(signUpStart({email, password, displayName}));
    setFormFields(defaultFormFields);
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Display Name"
          onChange={formChangeHandler}
          id="displayName"
          name="displayName"
          type="text"
          value={displayName}
          required
        />

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

        <FormInput
          label="Confirm Password"
          onChange={formChangeHandler}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
