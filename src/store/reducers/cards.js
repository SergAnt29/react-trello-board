import cuid from 'cuid';

import { getMaxFieldOfArrayOfItems } from '../../utils/arrayUtils';

import { CARD_ADD, CARD_EDIT, CARD_REMOVE, CARD_MOVE_IN_COLUMN, CARD_MOVE_BETWEEN_COLUMNS } from '../constants';

const cards = (state = [], action) => {
    const { type, payload } = action;
    switch (type) {
        case CARD_ADD:
            const id = cuid();
            const index = state.length === 0 ? 0 : getMaxFieldOfArrayOfItems(state, 'index') + 1;
            return [
                ...state,
                {
                    id,
                    index,
                    ...payload
                }

            ];
        case CARD_MOVE_IN_COLUMN:
            const columnCards = state.filter(card => card.columnId ===  payload.id)
            const otherCards = state.filter(card => card.columnId !==  payload.id)
            const updatedColumnCards = columnCards.map(card => {
                if(card.index === payload.source){
                    return {...card, index: payload.destination}
                }

                if(card.index === payload.destination){
                    return {...card, index: payload.source}
                }

                return card;
            })
            return [
                ...updatedColumnCards,
                ...otherCards,
            ]
        case CARD_MOVE_BETWEEN_COLUMNS:
        case CARD_EDIT:
            return state;
        case CARD_REMOVE:
            return state.filter(card => card.id !== payload.id);
        default:
            return state;
    }
}

export default cards;