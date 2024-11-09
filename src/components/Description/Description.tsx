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
const DescriptionL:React.FC<descriptionProps> = ({description}) => {
  return (
    <div className="app__description-left">
      <p>{description}</p>
    </div>
  )
}
const DescriptionR:React.FC<descriptionProps> = ({description}) => {
  return (
    <div className="app__description-right">
      <p>{description}</p>
    </div>
  )
}

export {Description,DescriptionL,DescriptionR};