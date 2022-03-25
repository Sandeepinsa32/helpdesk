import MainComponent from './MainComponet';
import {StyledEngineProvider} from '@mui/material/styles';

function App() {
	return (
		<>
			<StyledEngineProvider>
				<MainComponent />
			</StyledEngineProvider>
		</>
	);
}

export default App;
