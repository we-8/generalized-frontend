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


export {CommonButtons, CommonButtons1 ,OrderNow};