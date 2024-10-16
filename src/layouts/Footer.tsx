"use client";

import { useRouter } from 'next/navigation';
const Footer = () => {

  const router = useRouter();

  const handleClick = () => {
    // Navigate to '/about' page
    router.push('/ContactUs');
  };

  return (
    <div onClick={handleClick}>Footer</div>
  )
}

export default Footer;