import { combineReducers } from 'redux';
import boards from './boards';
import columns from './boards';
import cards from './boards';

export default combineReducers({
    boards,
    columns,
    cards
})