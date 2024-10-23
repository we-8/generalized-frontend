import { useState } from "react";
import InputFieldItem from "../InputField";
import "./SignUpForm.css";
import Image from "next/image";
import { signuppageimg } from "@/assets";

interface SignInFormData {
  username: string;
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const [SignInFormData, setSignInFormData] = useState<SignInFormData>({
    username: "",
    email: "",
    password: "",
  });
  const onsubmit = () => {
    console.log(SignInFormData);
  };
  return (
    <div className="app__signup-form-main-div section__padding">
      <div className="app__signup-img-section">
        <Image
          className="app__signup-img"
          src={signuppageimg}
          alt="picture"
          width={100} // Set the width and height for Next.js Image component
          height={200}
        />
      </div>
      <div className="app__signup-form-main-div2">
        <form onSubmit={onsubmit}>
          <div>
            <h1 className="app__signup-text">Welcome to</h1>
          </div>
          <div>
            <h1 className="app__signup-text2">Ceylon Rich Products</h1>
          </div>
          <div className="app__signup-form-section">
            <InputFieldItem
              htmlFor="username"
              label="Username"
              name="username"
              type="text"
              value={SignInFormData.username}
              onChange={() => "dsfs"}
              placeholder="Enter Your Username"
            />
          </div>
          <div className="app__signup-form-section">
            <InputFieldItem
              htmlFor="email"
              label="Email"
              name="email"
              type="text"
              value={SignInFormData.email}
              onChange={() => "dsfs"}
              placeholder="Enter Your Email"
            />
          </div>
          <div className="app__signup-form-section">
            <InputFieldItem
              htmlFor="password"
              label="Password"
              name="password"
              type="text"
              value={SignInFormData.password}
              onChange={() => "dsfs"}
              placeholder="Enter Your Password"
            />
          </div>
          <div className="signup-signin-section">
            <p> already have an account?</p>
            <button className="signup-signin-button"> sign in</button>
          </div>
          <div>
            <button className="signup-login-button">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignInForm;
