import React from 'react';
import { Provider } from 'react-redux';
import store from './store'
import {
  HashRouter as Router, Route, Switch, Redirect as RouterRedirect
} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Board from './pages/Board';
import Card from './pages/Card';
import GlobalStyles from './styles/GlobalStyles';


const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles/>
      <Router >
        <Switch>
          <Route path="/" exact component={Dashboard}/>
          <Route path="/boards/:alias" exact component={Board}/>
          <Route path="/cards/:id" exact component={Card}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
