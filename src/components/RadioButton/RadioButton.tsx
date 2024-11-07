import React from 'react'
import './RadioButton.css'

type RadioButtonProps = {

  htmlfor:string,
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}
const RadioButton:React.FC<RadioButtonProps> = ({label,htmlfor,value,checked,onChange}) => {
  return (
    <div className='app__radioButton'>
      <label htmlFor={htmlfor}>
        <input type='radio' name={htmlfor} value={value} checked={checked} onChange={onChange} />
        {label}
      </label>
    </div>
  )
}

export default RadioButton;