import React from 'react';
import { Provider } from 'react-redux';
import store from './store'
import {
  HashRouter as Router, Route, Switch, Redirect as RouterRedirect
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import GlobalStyles from './styles/GlobalStyles';


const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles/>
      <Router >
        <Switch>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/boards/:alias" component={Board}/>
          {/* <Route path="/card/:id" exact component={}/> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
