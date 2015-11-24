import React          from 'react';
import ReactDOM       from 'react-dom';
import Root           from './containers/Root';
import configureStore from './store/configureStore';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const history = createBrowserHistory();
const store   = configureStore(window.__INITIAL_STATE__);
const target  = document.getElementById('root');

ReactDOM.render(<Root store={store} history={history} />, target);
