import React from 'react';
import { Provider } from 'react-redux';
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          CUSTOM TRELLO BOARD
        </header>
      </div>
    </Provider>
  );
}

export default App;
