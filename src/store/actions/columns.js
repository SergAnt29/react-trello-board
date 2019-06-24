import {COLUMN_ADD, COLUMN_EDIT, COLUMN_REMOVE} from '../constants';

const columnAdd = ({title, boardId}) => {
    return {
        type:COLUMN_ADD,
        payload:{
            title,
            boardId,
        }
    }
}

const columnRemove = ({id}) => {
    return {
        type:COLUMN_REMOVE,
        payload: {id}
    }
}

const columnEdit = (payload) => {
    return {
        type:COLUMN_EDIT,
        payload
    }
}

export {columnAdd, columnRemove, columnEdit}