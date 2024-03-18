import "./App.css";
import { Theme, ThemeProvider, useThemeMode } from "./components/ThemeProvider";
import { Button } from "./components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "./components/ui/select";

const App = () => {
	//
	return (
		<ThemeProvider
			defaultTheme='dark'
			storageKey='theme-mode'
		>
			<div>
				Hello world! <Button>I'm a button!</Button>
				<ThemeModeSelector />
			</div>
		</ThemeProvider>
	);
};

export default App;

const ThemeModeSelector = () => {
	const { theme, setTheme } = useThemeMode();
	return (
		<Select
			defaultValue={theme}
			value={theme}
			onValueChange={(v) => setTheme(v as Theme)}
		>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Theme' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='light'>Light</SelectItem>
				<SelectItem value='dark'>Dark</SelectItem>
				<SelectItem value='system'>System</SelectItem>
			</SelectContent>
		</Select>
	);
};
