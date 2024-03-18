import { useThemeMode, Theme } from "@/components/ThemeProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ThemeModeSelector = () => {
  const { theme, setTheme } = useThemeMode();
  return (
    <Select
      defaultValue={theme}
      value={theme}
      onValueChange={(v) => setTheme(v as Theme)}
    >
      <SelectTrigger className="w-fit gap-3">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
};
