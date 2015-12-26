import React from 'react';
import ReactDom from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, IndexRoute } from 'react-router';

import { Wrapper } from './components/wrapper.js';
import { Host } from './components/host-page.js';
import { Audience } from './components/audience-page.js';



ReactDom.render(
	<Router history={createBrowserHistory()}>
		<Route path="/" component={Wrapper}>
			<IndexRoute component={Audience} />
			<Route path="/host" component={Host} />
		</Route>
	</Router>,
	document.getElementById('main')
);