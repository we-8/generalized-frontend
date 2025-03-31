'use client'
import { useState } from "react";
import "./SignInForm.css";
import { TitleL,TitleYellow,} from "../Title/Title";
import { Login ,GoogleButton } from "../CommonButtons/CommonButtons";
import Link from 'next/link';
import Image from "next/image";
import { hero ,who} from "@/assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type SignInFormData = {
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
    <div className="app__signin-form-main-div">
      <div className="app__signin-img-section">
        <Image
          className="app__signin-img"
          src={who}
          alt="picture"
        />
      </div>
      <div className="app__signin-form-main-div2">
        <Formik
          initialValues={initialValues}
          validationSchema={SignInFormSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <>
              <div>
                <TitleL title="Welcome to" />
              </div>
              <div>
                <TitleYellow title="Ceylon Rich Products"/>
              </div>
              <div>
                <p className="form-title-description">Register your account</p>
              </div>
              <div className="app__signin-form">
                <Form>
                <div className="app__signin-form-section">
                  <label htmlFor="username">Name</label>
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
                <div className="form-checkbox-forget-main-div">
                  <div className="form-checkbox-div">
                    <input type="checkbox"  />
                    <label className="container">
                    <span className="checkmark"></span>
                    Remember me
                    </label>
                  </div>
                  <p>Forget Password ?</p>
                </div>
                <div className="signin-signup-section">
                  <div className="new-account-section">
                    <p>Don't have an account ?</p>
                    <p>
                    <Link href="/sign-up">Sign In</Link>
                  </p>
                  </div>
                  <div className="login-button">
                    <Login title="LOGIN" />
                  </div>
                  <div className="signin-break-section">
                    <div/>
                    <p>OR</p>
                    <div/>
                  </div>
                  <div className="google-login">
                    <GoogleButton title="Sign in with Google"/>
                  </div>
                </div>
              </Form>
              </div>
             
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignInForm;
