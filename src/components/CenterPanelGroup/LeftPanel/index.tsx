import { ResizablePanel } from "@/components/ui/resizable";

export const LeftPanel = () => (
  <ResizablePanel defaultSize={15} minSize={5} collapsible collapsedSize={0}>
    Left
  </ResizablePanel>
);
