import react from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { hero } from "@/assets";
import "./SignUpForm.css";

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

// Define the validation schema
const SignInSchema = Yup.object().shape({
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
    <div className="app__signup-form-main-div section__padding">
      <div className="app__signup-img-section">
        <Image
          className="app__signup-img"
          src={hero}
          alt="picture"
          width={100}
          height={200}
        />
      </div>
      <div className="app__signup-form-main-div2">
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <h1 className="app__signup-text">Welcome to</h1>
              </div>
              <div>
                <h1 className="app__signup-text2">Ceylon Rich Products</h1>
              </div>
              <div className="app__signup-form-section">
                <label htmlFor="username" className="app__label-main-div">
                  Username
                </label>
                <div className="app__inputField-main-div">
                  <Field
                    type="text"
                    name="username"
                    placeholder="Enter Your Username"
                    className="app__inputField-main-div-input"
                  />
                </div>
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="app__signup-form-section">
                <label htmlFor="email" className="app__label-main-div">
                  Email
                </label>
                <div className="app__inputField-main-div">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter Your Email"
                    className="app__inputField-main-div-input"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="app__signup-form-section">
                <label htmlFor="password" className="app__label-main-div">
                  Password
                </label>
                <div className="app__inputField-main-div">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    className="app__inputField-main-div-input"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="signup-signin-section">
                <p>Already have an account?</p>
                <button type="button" className="signup-signin-button">
                  Sign in
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="signup-login-button"
                  disabled={isSubmitting}
                >
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

export default SignUpForm;
