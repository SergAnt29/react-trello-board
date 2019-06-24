import { combineReducers } from 'redux';
import boards from './boards';
import columns from './columns';
import cards from './cards';

export default combineReducers({
    boards,
    columns,
    cards
})