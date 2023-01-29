import React, { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./sign-up-form.styles.scss"
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
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
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName,
      });
      console.log(userDocRef);
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Failed to create user, email already in use!");
        return;
      }
      console.log(error.message);
    }
  };

  return (
    <div className="sign-up-container">
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
    </div>
  );
};

export default SignUpForm;
