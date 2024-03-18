import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ExportDataButton = () => {
  const handleExportClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(localStorage));
    toast.success("Save data copied to clipboard");
  };
  return <Button onClick={handleExportClipboard}>Export data</Button>;
};
