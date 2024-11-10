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


export {CommonButtons, CommonButtons1 ,OrderNow , OrderNow2, AddtoCart};