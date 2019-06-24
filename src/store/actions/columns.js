import {COLUMN_ADD, COLUMN_EDIT, COLUMN_REMOVE} from '../constants';

const columnAdd = ({title, boardId}) => {
    return {
        type:COLUMN_ADD,
        title,
        boardId,
    }
}

const columnRemove = ({id}) => {
    return {
        type:COLUMN_REMOVE,
        id
    }
}

const columnEdit = (payload) => {
    return {
        type:COLUMN_EDIT,
        payload
    }
}

export {columnAdd, columnRemove, columnEdit}