'use client'
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import Link from 'next/link';
import { TitleL, TitleYellow } from "../Title/Title";
import { hero } from "@/assets";
import "./SignUpForm.css";
import { GoogleButton, Login } from "../CommonButtons/CommonButtons";
import { useRouter } from 'next/navigation';

// API Configuration
const API_BASE_URL = " http://139.59.65.41/v1/";

// Types
interface SignUpRequest {
  name: string;
  email: string;
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

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the validation schema
const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required("Please confirm your password"),});

const SignUpForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();


  // API Function - Sign Up User
  const signUpUser = async (data: SignUpRequest): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}sign-up/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.name,
          first_name: data.name,  // or split the name if needed
          last_name: "",          // empty or split the name
          email: data.email,
          password: data.password,
          is_superuser: false,   
        }),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          message: result.message || 'Account created successfully',
          user: result.user,
          token: result.token,
        };
      } else {
        return {
          success: false,
          message: result.error || 'Registration failed',
        };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return {
        success: false,
        message: 'Network error. Please check if backend is running.',
      };
    }
  };

  const initialValues: SignUpFormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values: SignUpFormData) => {
    setIsLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      const signUpData: SignUpRequest = {
        name: values.username,
        email: values.email,
        password: values.password,
      };

      const result = await signUpUser(signUpData);

      if (result.success) {
        setSuccessMessage(result.message);
        
        // Store user data in localStorage
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        if (result.token) {
          localStorage.setItem('token', result.token);
        }

        // Redirect to sign-in page or dashboard after 2 seconds
        setTimeout(() => {
          router.push('/sign-in'); // Or '/dashboard' if you want direct login
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
                      disabled={isLoading}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  
                  <div className="app__signup-form-section">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter Your Email"
                      className={`app__inputField-main-div-input ${
                        errors.email && touched.email ? "input-error" : ""
                      }`}
                      disabled={isLoading}
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
                      disabled={isLoading}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  
                  <div className="app__signup-form-section">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Your Password"
                      className={`app__inputField-main-div-input ${
                        errors.confirmPassword && touched.confirmPassword ? "input-error" : ""
                      }`}
                      disabled={isLoading}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="signup-signin-section">
                    <div className="have-account-section">
                      <p>have an account ?</p>
                      <p>
                        <Link href="/sign-in">Sign In</Link>
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
                        <Login title={isLoading ? "Creating Account..." : "SIGN UP"} />
                      </div>
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