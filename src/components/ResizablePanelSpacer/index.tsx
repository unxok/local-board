import { ResizablePanel } from "../ui/resizable";

export const ResizablePanelSpacer = ({ text }: { text?: string }) => (
  <ResizablePanel
    className="relative flex items-center justify-center"
    collapsible
    minSize={5}
    collapsedSize={1}
  >
    <div className="absolute inset-0 flex items-center justify-center text-background hover:bg-muted">
      {text ? text : "spacer panel"}
    </div>
  </ResizablePanel>
);
