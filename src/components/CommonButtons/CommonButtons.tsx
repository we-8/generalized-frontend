'use client'

import './CommonButtons.css';
import { Google } from '@/assets';
import Image from 'next/image';
import { signIn, useSession } from "next-auth/react"
import { useState } from 'react'

type buttonProps = {
  title:string
}
type filterButtonProps = {
  title:string,
  onClick:(title:string) =>void,
  isSelected: boolean
}
const CommonButtons:React.FC<buttonProps> = () => {
  return (
    <div>CommonButtons</div>
  )
}
const CommonButtons1:React.FC<buttonProps> = ({title}) => {
  return (
    <div className="app__CommonButton1">
      <button>{title}</button>
    </div>
  )
}
const OrderNow:React.FC<buttonProps> = ({title}) =>{
  return(
    <div className='app__OrderNow'>
      <button>{title}</button>
    </div>
  )
}
const OrderNow2:React.FC<buttonProps> = ({title}) =>{
  return(
    <div className='app__OrderNow2'>
      <button>{title}</button>
    </div>
  )
}
const AddtoCart:React.FC<buttonProps> = ({title}) =>{
  return(
    <div className='app__AddtoCart'>
      <button>{title}</button>
    </div>
  )
}
const RemoveButton:React.FC<buttonProps> = ({title}) =>{
  return(
    <div className='app__Remove'>
      <button>{title}</button>
    </div>
  )
}
const CheckOut:React.FC<buttonProps> = ({title}) =>{
  return(
    <div className='app__CheckOut'>
      <button>{title}</button>
    </div>
  )
}
const BackToShop:React.FC<buttonProps> = ({title}) =>{
  return(
    <div className='app__BackToShop'>
      <button>{title}</button>
    </div>
  )
}
const Login:React.FC<buttonProps> = ({title}) =>{
  return(
    <div className='app__Login'>
      <button>{title}</button>
    </div>
  )
}
// Replace your existing GoogleButton component with this:
const GoogleButton: React.FC<buttonProps> = ({ title }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession() ?? {};

  const handleGoogleSignIn = async () => {
    console.log("Google button clicked!")
    console.log("Current session before signIn:", session)
    
    if (isLoading) return
    
    setIsLoading(true)
    try {
      console.log("Calling signIn...")
      const result = await signIn("google", { 
        callbackUrl: "/dashboard",
        redirect: true 
      }) // Removed redirect: false
      console.log("SignIn result:", result)
      
    } catch (error) {
      console.error('Google sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='app__Google'>
      <button 
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        style={{
          opacity: isLoading ? 0.6 : 1,
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        <Image className='google-img' src={Google} alt="google button"/>
        {isLoading ? "Signing in..." : title}
      </button>
    </div>
  )
}
const ProductFilter:React.FC<filterButtonProps> = ({title,isSelected,onClick}) =>{
  return(
    <div onClick={()=> onClick(title)} className={`app__filterbutton ${isSelected ? 'selected' : ''}`}>
      <button>{title}</button>
    </div>
  )
}
const AddtoCartSingleProdocut:React.FC<buttonProps> = ({title}) =>{
  return(
    <div className='app__singleProductCart'>
      <button>{title}</button>
    </div>
  )
}

const ProfileSaveChange:React.FC<buttonProps> = ({title}) =>{
  return(
    <div className='app__profileSaveChange'>
      <button>{title}</button>
    </div>
  )
}



export {ProfileSaveChange,AddtoCartSingleProdocut ,ProductFilter,GoogleButton,Login,BackToShop,CommonButtons, CommonButtons1 ,OrderNow , OrderNow2, AddtoCart ,RemoveButton, CheckOut};