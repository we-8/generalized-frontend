"use client";
import Image from "next/image";
import Link from "next/link";
import { logo, cart } from "@/assets";
import "../styles/layouts-css/Navbar.css";
import { useEffect, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "./Authcontext";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const { cart } = useCart();

  const handleCloseNavbar = () => setToggle(false);
  const itemCount =
    cart?.items?.reduce((total, item) => total + item.quantity, 0) ?? 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    // Optional but recommended
    setLoggedIn(false);

    // If you want to clear cart on logout
    window.location.href = "/sign-in";
  };
  console.log("NAVBAR CART:", cart);

  return (
    <div className="app__navbar--main-div">
      <div className="app__navbar--logo">
        <Image src={logo} alt="website logo" width={75} />
      </div>
      <div className="app__navbar--links-div">
        <ul className="app_navbar--links-list">
          <li className="p__text">
            {" "}
            <Link href="/">Home</Link>
          </li>
          <li className="p__text">
            <Link href="/product">Products</Link>
          </li>
          <li className="p__text">
            <Link href="/about-us">About Us</Link>
          </li>
          <li className="p__text">
            <Link href="/contact-us">Contact Us</Link>
          </li>
          <li className="p__text">
            <Link href="/review-page">Review Page</Link>
          </li>
        </ul>
      </div>

      <div className="app__navbar--services">
        <Link
          href="/cart-item"
          className="relative inline-flex items-center p-2 hover:opacity-70 transition-opacity"
        >
          <ShoppingCart className="h-6 w-6 text-black" strokeWidth={2} />

          {itemCount > 0 && (
            <span
              className="absolute top-0 right-0 
        bg-red-500 text-white 
        text-[11px] font-bold 
        min-w-[18px] h-[18px] 
        rounded-full 
        flex items-center justify-center
        leading-none
        px-1
        shadow-lg
        transform translate-x-1/2 -translate-y-1/2 border-2 border-black"
            >
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </Link>
        <div />
        {loggedIn ? (
          <FaUserCircle fontSize={25} color="#181510" />
        ) : (
          <p className="p__text" onClick={handleCloseNavbar}>
            <Link href="/sign-in">Sign In</Link>
          </p>
        )}
        <FiAlignJustify
          className="burger-menu"
          fontSize={25}
          color="#181510"
          onClick={() => {
            setToggle(true);
          }}
        />
      </div>
      <div className="app_navbar--smallscreen">
        {toggle && (
          <div className="app__navbar-smallscreen-overlay">
            <IoMdClose
              className="overlay-close"
              fontSize={25}
              color="#181510"
              onClick={() => {
                setToggle(false);
              }}
            />
            <div className="app__navbar--smallscreen-links-div">
              <ul className="app_navbar--smallscrenn-links-list">
                <li className="p__text" onClick={handleCloseNavbar}>
                  <Link href="/">Home</Link>
                </li>
                <li className="p__text" onClick={handleCloseNavbar}>
                  <Link href="/product">Products</Link>
                </li>
                <li className="p__text" onClick={handleCloseNavbar}>
                  <Link href="/about-us">About Us</Link>
                </li>
                <li className="p__text" onClick={handleCloseNavbar}>
                  <Link href="/contact-us">Contact Us</Link>
                </li>

                {isLoggedIn ? (
                  <p className="p__text cursor-pointer" onClick={logout}>
                    Logout
                  </p>
                ) : (
                  <Link href="/sign-in">Sign In</Link>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
