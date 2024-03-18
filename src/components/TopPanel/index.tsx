import { ResizablePanelSpacer } from "../ResizablePanelSpacer";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "../ui/resizable";

export const TopPanel = () => (
  <ResizablePanel defaultSize={10} minSize={5} collapsible collapsedSize={0}>
    <ResizablePanelGroup
      autoSaveId={"top-panel"}
      id={"top-panel"}
      direction="horizontal"
    >
      <ResizablePanel
        defaultSize={10}
        minSize={5}
        collapsible
        collapsedSize={0}
        className="flex items-center justify-center text-4xl font-bold tracking-wider"
      >
        Local Board
      </ResizablePanel>
      <ResizableHandle className="bg-transparent" />
      <ResizablePanelSpacer />
      <ResizableHandle className="bg-transparent" />
      <ResizablePanel className="flex flex-row items-center justify-around gap-5 p-5">
        <a href="/" target="_blank">
          About
        </a>
        <a href="https://github.com/unxok/local-board/wiki" target="_blank">
          Wiki
        </a>
        <a href="https://github.com/unxok/local-board/issues" target="_blank">
          Report
        </a>
      </ResizablePanel>
      <ResizableHandle className="bg-transparent" />
      <ResizablePanelSpacer />
    </ResizablePanelGroup>
  </ResizablePanel>
);
