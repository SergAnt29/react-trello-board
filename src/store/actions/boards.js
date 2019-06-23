import { BOARD_ADD, BOARD_REMOVE } from '../constants';

const boardAdd = ({ title }) => {
    return { type: BOARD_ADD, payload: { title } }
}

const boardRemove = ({ id }) => {
    return { type: BOARD_REMOVE, payload: { id } }
}

export { boardAdd, boardRemove }