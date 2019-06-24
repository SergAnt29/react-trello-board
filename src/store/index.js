import { createStore } from 'redux';
import combinedReducer from './reducers';
import makeUrlAlias from '../utils/makeUrlAlias';

const initialState = { boards: [{ id: 'q1w2e3r4t5y6u7i8', title: 'Test', alias: makeUrlAlias('Test', 'q1w2e3r4t5y6u7i8')}]}

const store = createStore(
    combinedReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    
)

export default store;  