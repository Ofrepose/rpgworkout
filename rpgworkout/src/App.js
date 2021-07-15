import './styles/css/index.css';

import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { route, link } from 'react-router-dom';

//set auth token
import setAuthToken from './utils/setAuthToken';

//redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';


// component imports
import home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';


if( localStorage.token ){

  setAuthToken( localStorage.token );

}

function App() {

  useEffect( () => {
    if( localStorage.token ){
      
      store.dispatch( loadUser() )
      
    }
    // store.dispatch( loadUser() )

  }, []);

  return (
    <Provider store = { store } >
      <Router>
        <Fragment>
          <Switch>
            <Route exact path = '/' component = { home } />
            <Route exact path = '/dashboard' component = { Dashboard } />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
