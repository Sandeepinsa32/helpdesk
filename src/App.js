import MainComponent from './MainComponet';
import {StyledEngineProvider} from '@mui/material/styles';
import RouteComponents from './RouteComponents';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
	return (
		<>
			<StyledEngineProvider>
				<Router>
					<MainComponent />
				</Router>
			</StyledEngineProvider>
		</>
	);
}

export default App;
