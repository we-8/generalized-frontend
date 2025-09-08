'use client'
import { useState } from "react";
import "./SignInForm.css";
import { TitleL, TitleYellow } from "../Title/Title";
import { Login, GoogleButton } from "../CommonButtons/CommonButtons";
import Link from 'next/link';
import Image from "next/image";
import { hero, who } from "@/assets";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"
import { useEffect } from "react"
// API Configuration
const API_BASE_URL = " http://139.59.65.41/v1/";

// Types
interface SignInRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
  token?: string;
}

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
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession()
  


  // API Function - Sign In User (inside the component)
  const signInUser = async (data: SignInRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username, 
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: result.message || 'Login successful',
          user: result.user,
          token: result.token,
        };
      } else {
        return {
          success: false,
          message: result.error || 'Login failed',
        };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        message: 'Network error. Please check if backend is running.',
      };
    }
  };

  const initialValues: SignInFormData = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: SignInFormData) => {
    setIsLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      const signInData: SignInRequest = {
        username: values.username,
        password: values.password,
      };

      const result = await signInUser(signInData);

      if (result.success) {
        setSuccessMessage(result.message);
        
        // Store user data in localStorage
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem("user_id", result.user.id.toString());
        }
        if (result.token) {
          localStorage.setItem('token', result.token);
        }

        // Redirect to dashboard or home page after 2 seconds
        setTimeout(() => {
          router.push('/dashboard'); // Change this to your desired route
        }, 2000);
      } else {
        setApiError(result.message);
      }
    } catch (error) {
      setApiError("An unexpected error occurred. Please try again.");
      console.error('Unexpected error:', error);
    } finally {
      setIsLoading(false);
    }
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
                <TitleYellow title="Ceylon Rich Products" />
              </div>
              <div>
                <p className="form-title-description">Sign in to your account</p>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="success-message" style={{ 
                  color: 'green', 
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#d4edda',
                  border: '1px solid #c3e6cb',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  ✅ {successMessage}
                </div>
              )}

              {/* Error Message */}
              {apiError && (
                <div className="api-error-message" style={{ 
                  color: '#dc3545', 
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  backgroundColor: '#f8d7da',
                  border: '1px solid #f5c6cb',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  ❌ {apiError}
                </div>
              )}

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
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  
                  {/* <div className="form-checkbox-forget-main-div">
                    <div className="form-checkbox-div">
                      <input type="checkbox" disabled={isLoading} />
                      <label className="container">
                        <span className="checkmark"></span>
                        Remember me
                      </label>
                    </div>
                    <p>Forget Password ?</p>
                  </div> */}
                  
                  <div className="signin-signup-section">
                    <div className="new-account-section">
                      <p>Don't have an account ?</p>
                      <p>
                        <Link href="/sign-up">Sign Up</Link>
                      </p>
                    </div>
                    <div className="login-button">
                      <div 
                        onClick={!isLoading ? () => {
                          // Trigger form submission
                          const form = document.querySelector('form');
                          if (form) {
                            form.requestSubmit();
                          }
                        } : undefined}
                        style={{
                          opacity: isLoading ? 0.6 : 1,
                          cursor: isLoading ? 'not-allowed' : 'pointer',
                          pointerEvents: isLoading ? 'none' : 'auto'
                        }}
                      >
                        <Login title={isLoading ? "Signing In..." : "LOGIN"} />
                      </div>
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