import RootNode from './RootNode';
import {StyledEngineProvider} from '@mui/material/styles';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
	return (
		<>
			<StyledEngineProvider>
				<Router>
					<RootNode />
				</Router>
			</StyledEngineProvider>
		</>
	);
}

export default App;
