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
        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        shadow-sm hover:shadow-lg hover:scale-105
        ${
          isSelected
            ? "bg-blue-600 text-white shadow-md border-transparent hover:bg-blue-700"
            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
        }
      `}
    >
      {title}
    </Button>
  );
};

export default ProductFilter;
