import {BOARD_ADD, BOARD_EDIT, BOARD_REMOVE} from '../constants';

const boards = (state = [], action) => {
    const {type, payload} = action;
    switch (type) {
        case BOARD_ADD:
            return [
                ...state,
                payload
            ]
        case BOARD_EDIT:
            return state.map(board=> {
                if(board.id === payload.id){
                    return {...board, ...payload}
                }
                return board;
            })
        case BOARD_REMOVE:
            return state.filter(board=> board.id !== payload.id)
        default:
            return state;
    }
}

export default boards;