import React from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

const QuantitySelector = ({ 
  value, 
  onChange, 
  min = 1, 
  max = 99,
  size = "md"
}: QuantitySelectorProps) => {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10", 
    lg: "h-12 w-12"
  };

  const inputSizeClasses = {
    sm: "h-8 w-12 text-sm",
    md: "h-10 w-16 text-base",
    lg: "h-12 w-20 text-lg"
  };

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="outline"
        size="icon"
        className={`${sizeClasses[size]} border-border hover:bg-secondary`}
        onClick={decrement}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      
      <div className={`${inputSizeClasses[size]} flex items-center justify-center bg-background border border-border rounded-md font-medium text-foreground`}>
        {value}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className={`${sizeClasses[size]} border-border hover:bg-secondary`}
        onClick={increment}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;