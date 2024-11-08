import './CommonButtons.css';
import { Google } from '@/assets';
import Image from 'next/image';

type buttonProps = {
  title:string
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
const GoogleButton:React.FC<buttonProps> = ({title}) =>{
  return(
    <div className='app__Google'>
      <button><Image className='google-img' src={Google} alt="google button"/>{title}</button>
    </div>
  )
}


export {GoogleButton,Login,BackToShop,CommonButtons, CommonButtons1 ,OrderNow , OrderNow2, AddtoCart ,RemoveButton, CheckOut};