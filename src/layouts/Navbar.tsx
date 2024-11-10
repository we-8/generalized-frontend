
'use client'
import Image from 'next/image';
import Link from 'next/link';
import { logo ,cart} from '@/assets';
import '../styles/layouts-css/Navbar.css'
import { useEffect, useState } from 'react';
import { FiAlignJustify } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);


  return (
    <div className="app__navbar--main-div">
      <div className="app__navbar--logo">
        <Image src={logo} alt="website logo" width={120} height={120} />
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
          
        </ul>
      </div>

      <div className="app__navbar--services">
        <Image className="navbar-logo" src={cart} alt="cart image" />
        <div />
        {loggedIn ? (
          <FaUserCircle fontSize={25} color="#fff" />
        ) : (
          <p className="p__text">
            <Link href="/">Sign In</Link>
          </p>
        )}
        <FiAlignJustify
          className="burger-menu"
          fontSize={25}
          color="#fff"
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
              color="#fff"
              onClick={() => {
                setToggle(false);
              }}
            />
            <div className="app__navbar--smallscreen-links-div">
              <ul className="app_navbar--smallscrenn-links-list">
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
                
                {loggedIn ? (
                  <p />
                ) : (
                  <p className="p__text">
                    <Link href="/">Sign In</Link>
                  </p>
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
