import { useState } from "react";
import "./SignInForm.css";
import Image from "next/image";
import { hero } from "@/assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface SignInFormData {
  username: string;
  email: string;
  password: string;
}

const SignInFormSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const SignInForm: React.FC = () => {
  const initialValues: SignInFormData = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values: SignInFormData) => {
    console.log(values);
  };

  return (
    <div className="app__signin-form-main-div section__padding">
      <div className="app__signin-img-section">
        <Image
          className="app__signin-img"
          src={hero}
          alt="picture"
          width={100}
          height={200}
        />
      </div>
      <div className="app__signin-form-main-div2">
        <Formik
          initialValues={initialValues}
          validationSchema={SignInFormSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <h1 className="app__signin-text">Welcome to</h1>
              </div>
              <div>
                <h1 className="app__signin-text2">Ceylon Rich Products</h1>
              </div>
              <div className="app__signin-form-section">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  placeholder="Enter Your Username"
                  className={`app__inputField-main-div-input ${
                    errors.username && touched.username ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="app__signin-form-section">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter Your Password"
                  className={`app__inputField-main-div-input ${
                    errors.password && touched.password ? "input-error" : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="signin-signup-section">
                <p>Don't have an account?</p>
                <button type="button" className="signin-signup-button">
                  Sign Up
                </button>
              </div>

              <div>
                <button type="submit" className="signin-login-button">
                  Log in
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInForm;
