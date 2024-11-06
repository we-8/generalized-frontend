import './CommonButtons.css';

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



export {BackToShop,CommonButtons, CommonButtons1 ,OrderNow , OrderNow2, AddtoCart ,RemoveButton, CheckOut};