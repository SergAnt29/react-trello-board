import {COLUMN_ADD, COLUMN_EDIT, COLUMN_REMOVE} from '../constants';

const columns = (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case COLUMN_ADD:
            return [
                ...state,
                payload
            ]
        case COLUMN_EDIT:
            return state.map(column=> {
                if(column.id === payload.id){
                    return {...column, ...payload}
                }
                return column;
            })
        case COLUMN_REMOVE:
            return state.filter(column=> column.id !== payload.id)
        default:
            return state;
    }
}

export default columns;