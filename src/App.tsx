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

const App = () => {
  const { setStyle } = useThemeStyle();

  useEffect(() => {
    const css = getThemeStyleFromLocal();
    if (css) {
      setStyle(css);
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
      <Toaster richColors toastOptions={{}} />
    </ThemeProvider>
  );
};

export default App;
