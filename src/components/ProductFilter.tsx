import { Button } from "@/components/ui/button";

interface ProductFilterProps {
  title: string;
  isSelected: boolean;
  onClick: (title: string) => void;
}

const ProductFilter = ({ title, isSelected, onClick }: ProductFilterProps) => {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      onClick={() => onClick(title)}
      className={`
        transition-all duration-200 hover:scale-105
        ${isSelected 
          ? "bg-primary hover:bg-primary-hover text-primary-foreground shadow-md" 
          : "bg-card hover:bg-card-hover border-border text-foreground hover:border-primary"
        }
      `}
    >
      {title}
    </Button>
  );
};

export default ProductFilter;