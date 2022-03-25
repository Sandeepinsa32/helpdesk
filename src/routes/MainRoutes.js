import {lazy} from 'react';
import {BrowserRouter as Router, Route, Switch, useRoutes} from 'react-router-dom';
// project imports
import Loadable from '../ui-component/Loadable';

// sample page routing
const SamplePage = Loadable(lazy(() => import('../views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: <SamplePage />,
};

export default MainRoutes;
