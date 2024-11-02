import './Description.css';

type descriptionProps={
  description:string,
}
const Description:React.FC<descriptionProps> = ({description}) => {
  return (
    <div className="app__description">
      <p>{description}</p>
    </div>
  )
}

export default Description;