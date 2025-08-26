import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

const QuantitySelector = ({
  value,
  onChange,
  max = 10,
}: QuantitySelectorProps) => {
  const options = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <Select
      value={value.toString()}
      onValueChange={(val) => onChange(parseInt(val))}
    >
      <SelectTrigger className="w-20 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary">
        <SelectValue className="text-gray-900" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option.toString()}
            className="text-gray-900 hover:bg-primary hover:text-yellow"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default QuantitySelector;
