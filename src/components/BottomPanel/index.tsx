import { ResizablePanel } from "../ui/resizable";

export const BottomPanel = () => (
  <ResizablePanel defaultSize={10} minSize={5} collapsible collapsedSize={0}>
    Bottom
  </ResizablePanel>
);
