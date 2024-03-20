import { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import {
  ResizableHandle,
  ResizablePanelGroup,
} from "./components/ui/resizable";

import {
  getThemeStyleFromLocal,
  useThemeStyle,
} from "./stores/ThemeStyleStore";
import { Toaster } from "./components/ui/sonner";
import { TopPanel } from "./components/TopPanel";
import { BottomPanel } from "./components/BottomPanel";
import { CenterPanelGroup } from "./components/CenterPanelGroup";
import {
  getBoardFromLocal,
  getNextBoardIdFromLocal,
  useBoard,
} from "./stores/BoardStore";

const App = () => {
  const { setStyle } = useThemeStyle();
  const { setBoards, incrementNextAvailableId } = useBoard();

  useEffect(() => {
    const css = getThemeStyleFromLocal();
    if (css) {
      setStyle(css);
    }
    const boards = getBoardFromLocal();
    if (boards) {
      setBoards(() => boards);
    }
    const nextBoardId = getNextBoardIdFromLocal();
    if (nextBoardId !== undefined) {
      incrementNextAvailableId(nextBoardId);
    }
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme-mode">
      <ResizablePanelGroup
        direction="vertical"
        autoSaveId={"layout-save"}
        className="fixed inset-0"
      >
        <TopPanel />
        {/*  */}
        <ResizableHandle />
        {/*  */}
        <CenterPanelGroup />
        {/*  */}
        <ResizableHandle />
        {/*  */}
        <BottomPanel />
      </ResizablePanelGroup>
      <Toaster
        richColors
        toastOptions={{}}
        position="top-right"
        expand
        visibleToasts={Infinity}
      />
    </ThemeProvider>
  );
};

export default App;
