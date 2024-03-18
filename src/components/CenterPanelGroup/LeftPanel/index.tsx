import { ResizablePanelSpacer } from "@/components/ResizablePanelSpacer";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const LeftPanel = () => (
  <ResizablePanel defaultSize={15} minSize={5} collapsible collapsedSize={0}>
    <ResizablePanelGroup
      id={"left-panel"}
      autoSaveId={"left-panel"}
      direction="vertical"
    >
      <ResizablePanelSpacer />
      <ResizableHandle className="bg-transparent" />
      <ResizablePanel className="flex flex-col items-center justify-start gap-5">
        <Button>Add board</Button>
        <Button variant={"secondary"}>Create view</Button>
      </ResizablePanel>
      <ResizableHandle className="bg-transparent" />
      <ResizablePanelSpacer />
    </ResizablePanelGroup>
  </ResizablePanel>
);
