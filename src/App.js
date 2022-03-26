import MainComponent from './MainComponet';
import Login from './views/login';
import {Account} from './views/Account';
import {StyledEngineProvider} from '@mui/material/styles';
import RouteComponents from './RouteComponents';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
	return (
		<>
			<StyledEngineProvider>
				<Router>
					<MainComponent />
					{/* <Account /> */}
				</Router>
			</StyledEngineProvider>
		</>
	);
}

export default App;
