import { createStore } from 'redux';
import combinedReducer from './reducers';
// import makeUrlAlias from '../utils/makeUrlAlias';

import {loadState, saveState} from './localstorage';

const persistedState = loadState();

// const initialState = { boards: [{ id: 'q1w2e3r4t5y6u7i8', title: 'Test', alias: makeUrlAlias('Test', 'q1w2e3r4t5y6u7i8')}]}

const store = createStore(
    combinedReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    
)

store.subscribe(() => {
    saveState({
      boards: store.getState().boards,
      columns: store.getState().columns,
      cards: store.getState().cards,
    });
  });

export default store;  