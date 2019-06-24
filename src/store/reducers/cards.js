import cuid from 'cuid';

import { CARD_ADD, CARD_EDIT, CARD_REMOVE, CARD_MOVE_IN_COLUMN, CARD_MOVE_BETWEEN_COLUMNS } from '../constants';

const cards = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case CARD_ADD:
            const id = cuid();

            return [
                ...state,
                {   
                    id,
                    ...payload
                }
                
            ]
        case CARD_MOVE_IN_COLUMN:
        case CARD_MOVE_BETWEEN_COLUMNS:
        case CARD_EDIT:
            return state.map(card => {
                if (card.id === payload.id) {
                    return { ...card, ...payload }
                }
                return card;
            })
        case CARD_REMOVE:
            return state.filter(card => card.id !== payload.id)
        default:
            return state;
    }
}

export default cards;