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

const DescriptionLeft:React.FC<descriptionProps> = ({description}) => {
  return (
    <div className="app__description_left">
      <p>{description}</p>
    </div>
  )
}

const DescriptionRight:React.FC<descriptionProps> = ({description}) => {
  return (
    <div className="app__description_Right">
      <p>{description}</p>
    </div>
  )
}
export {Description, DescriptionLeft,DescriptionRight};