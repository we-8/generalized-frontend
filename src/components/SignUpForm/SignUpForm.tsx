'use client'
import react from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { TitleL, TitleYellow } from "../Title/Title";
import { hero } from "@/assets";
import "./SignUpForm.css";
import { GoogleButton, Login } from "../CommonButtons/CommonButtons";

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

// Define the validation schema
const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUpForm: React.FC = () => {
  const initialValues: SignUpFormData = {
    username: "",
    email: "",
    password: "",
  };

  const onSubmit = (values: SignUpFormData) => {
    console.log(values);
  };

  return (
    <div className="app__signup-form-main-div">
      <div className="app__signup-img-section">
        <Image className="app__signup-img" src={hero} alt="picture" />
      </div>
      <div className="app__signup-form-main-div2">
        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <>
              <div>
                <TitleL title="Welcome to" />
              </div>
              <div>
                <TitleYellow title="Ceylon Rich Products" />
              </div>
              <div>
                <p className="form-title-description">Register your account</p>
              </div>
              <div className="app__signup-form">
                <Form>
                  <div className="app__signup-form-section">
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
                  <div className="app__signup-form-section">
                    <label htmlFor="username">Email</label>
                    <Field
                      name="Email"
                      type="email"
                      placeholder="Enter Your Email"
                      className={`app__inputField-main-div-input ${
                        errors.email && touched.email ? "input-error" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="app__signup-form-section">
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
                  <div className="app__signup-form-section">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <Field
                      name="confirm-password"
                      type="confirm-password"
                      placeholder="Confirm Your Password"
                      className={`app__inputField-main-div-input ${
                        errors.password && touched.password ? "input-error" : ""
                      }`}
                    />
                    <ErrorMessage
                      name="confirm-password"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="signup-signin-section">
                    <div className="have-account-section">
                      <p>have an account ?</p>
                      <p>Sign in</p>
                    </div>
                    <div className="login-button">
                      <Login title="SIGN UP" />
                    </div>
                    <div className="signup-break-section">
                      <div />
                      <p>OR</p>
                      <div />
                    </div>
                    <div className="google-login">
                      <GoogleButton title="Sign up with Google" />
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

export default SignUpForm;
