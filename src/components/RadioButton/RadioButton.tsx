import React from 'react'
import './RadioButton.css'

type RadioButtonProps = {
  name: string,
  htmlfor:string,
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}
const RadioButton:React.FC<RadioButtonProps> = ({label,htmlfor,value,checked,onChange}) => {
  return (
    <div className='app__radioButton'>
      <label htmlFor={htmlfor}>{label}
        <input type='radio' name={htmlfor} value={value} checked={checked} onChange={onChange} />
      </label>
    </div>
  )
}

export default RadioButton;