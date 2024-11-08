import './InputField.css';

type InputFieldProps = {
  htmlFor: string;
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFieldItem: React.FC<InputFieldProps> = ({htmlFor,label,name,type,value,placeholder,onChange,}) => {
  return (
    <div className="app__inputField-main-div">
      <div className="app__inputField--label">
        <label htmlFor={htmlFor}>{label}</label>
      </div>
      <div className="app__inputField--input" >
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};

export default InputFieldItem;
