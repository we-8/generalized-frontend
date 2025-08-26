import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioButtonProps {
  value: string;
  htmlfor: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}

const RadioButton = ({ value, htmlfor, label, checked, onChange }: RadioButtonProps) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem 
        value={value} 
        id={htmlfor}
        checked={checked}
        onClick={onChange}
        className="border-primary text-primary"
      />
      <Label 
        htmlFor={htmlfor}
        className="text-sm font-medium text-foreground cursor-pointer"
      >
        {label}
      </Label>
    </div>
  );
};

export default RadioButton;