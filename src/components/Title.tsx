import './Title.css';

type titleProps={
  title:string,
}
const Title:React.FC<titleProps> = ({title}) => {
  return (
    <div className='app__main-title'>
      <p>{title}</p>
    </div>
  )
}

export default Title;