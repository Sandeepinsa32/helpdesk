import {useRoutes} from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
	return useRoutes(MainRoutes);
}
