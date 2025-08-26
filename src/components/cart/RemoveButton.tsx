import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface RemoveButtonProps {
  title: string;
  onClick?: () => void;
}

const RemoveButton = ({ title, onClick }: RemoveButtonProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="text-destructive hover:text-destructive-foreground hover:bg-destructive border-destructive/50 hover:border-destructive transition-all duration-200"
    >
      <Trash2 className="h-4 w-4 mr-1" />
      {title}
    </Button>
  );
};

export default RemoveButton;