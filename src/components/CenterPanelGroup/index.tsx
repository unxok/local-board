import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "../ui/resizable";
import { LeftPanel } from "./LeftPanel";
import { MiddlePanel } from "./MiddlePanel";
import { RightPanel } from "./RightPanel";

export const CenterPanelGroup = () => (
  <ResizablePanel>
    <ResizablePanelGroup
      autoSaveId={"center-group"}
      id={"center-group"}
      direction="horizontal"
    >
      <LeftPanel />
      <ResizableHandle />
      <MiddlePanel />
      <ResizableHandle />
      <RightPanel />
    </ResizablePanelGroup>
  </ResizablePanel>
);
