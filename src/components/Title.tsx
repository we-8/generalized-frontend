import './Title.css';

type titleProps={
  title:string,
}
const Title:React.FC<titleProps> = ({title}) => {
  return (
    <div className='app__main-title-center'>
      <p>{title}</p>
    </div>
  )
}
const TitleL:React.FC<titleProps> = ({title}) => {
  return (
    <div className='app__main-title-left'>
      <p>{title}</p>
    </div>
  )
}
const TitleR:React.FC<titleProps> = ({title}) => {
  return (
    <div className='app__main-title-right'>
      <p>{title}</p>
    </div>
  )
}

export {Title,TitleL,TitleR};