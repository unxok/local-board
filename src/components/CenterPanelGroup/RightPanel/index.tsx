import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ExportDataButton } from "./ExportDataButton";
import { ImportDataButton } from "./ImportDataButton";
import { ThemeCustomizerButton } from "./ThemeCustomizerButton";
import { ThemeModeSelector } from "./ThemeModeSelector";

export const RightPanel = () => (
  <ResizablePanel
    defaultSize={15}
    minSize={5}
    collapsible
    collapsedSize={0}
    className="relative"
  >
    <ResizablePanelGroup
      id={"right-panel"}
      autoSaveId={"right-panel"}
      direction="vertical"
    >
      <ResizablePanel
        defaultSize={10}
        minSize={5}
        collapsible
        collapsedSize={0}
        className="flex items-center justify-center text-2xl font-semibold"
      >
        Settings
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="flex flex-col items-center justify-start gap-5 p-5">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <span className="w-fit text-nowrap">Theme mode</span>
          <ThemeModeSelector />
        </div>
        <ThemeCustomizerButton />
        <ExportDataButton />
        <ImportDataButton />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>Danger</ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
);
