import cuid from 'cuid';

import { getMaxFieldOfArrayOfItems } from '../../utils/arrayUtils';

import { 
    CARD_ADD, 
    CARD_EDIT, 
    CARD_REMOVE, 
    CARD_MOVE_IN_COLUMN, 
    CARD_MOVE_BETWEEN_COLUMNS, 
} from '../constants';

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
                    createdAt: +new Date(),
                    updatedAt: +new Date(),
                    ...payload
                }

            ];

        case CARD_MOVE_IN_COLUMN:
            const columnCards = state.filter(card => card.columnId ===  payload.columnId)
            const otherCards = state.filter(card => card.columnId !==  payload.columnId)
            const direction = payload.source < payload.destination ? 'down' : 'up';
            const updatedColumnCards = columnCards.map(card => {
                if(direction === 'down'){
                    if(card.index <= payload.destination && card.index > payload.source){
                        return {...card, index: card.index - 1 }
                    }
                    return card;
                }else if (direction === 'up'){
                    if(card.index < payload.source && card.index >= payload.destination){
                        return {...card, index: card.index + 1 }
                    }
                    return card;
                }
            }).map(card => {
                if(card.id === payload.id){
                    return {...card, index: payload.destination}
                }

                return card;
            })

            return [
                ...updatedColumnCards,
                ...otherCards,
            ]

        case CARD_MOVE_BETWEEN_COLUMNS:
            
            const cardsWithUpdatedColumns =  state.map(card => {
                if(card.id === payload.id){
                    return {
                        ...card, 
                        columnId: payload.destinationColumnId,
                        index: payload.destination
                    }
                }
                return card;
            })

            const cardsFromColumnToInsert = cardsWithUpdatedColumns.filter(card => card.columnId === payload.destinationColumnId).map(card => {
                if(card.index >= payload.destination && card.id !== payload.id){
                    return {...card, index: card.index + 1}
                }
                return card;
            })

            const cardsFromOtherColumns = cardsWithUpdatedColumns.filter(card => card.columnId !== payload.destinationColumnId)
            const mergedState = [...cardsFromColumnToInsert, ...cardsFromOtherColumns]
            const cardsOfColumnForUpdate = mergedState.filter(card => card.columnId === payload.sourceColumnId);
            const otherColumnsCards =  mergedState.filter(card => card.columnId !== payload.sourceColumnId) 
            const indexes = Array.from(Array(cardsOfColumnForUpdate.length),(_, index) => index)
            cardsOfColumnForUpdate.forEach(card => {
                if (indexes.includes(card.index)){
                    indexes.splice(card.index, 1)
                }
            })
            const emptyIndex = indexes.pop();
            
            const updatedIndexCards = cardsOfColumnForUpdate.map((card) => {
                if (card.index >= emptyIndex) {
                    return {...card, index: card.index - 1}
                }

                return card;
            })
            
            return [
                ...updatedIndexCards,
                ...otherColumnsCards
            ]

        case CARD_EDIT:
            return state.map(card => {
                if(card.id === payload.id){
                    return {
                        ...card, 
                        ...payload,
                        updatedAt: +new Date(),
                    }
                }

                return card;
            });

        case CARD_REMOVE:
            return state.filter(card => card.id !== payload.id);

        default:
            return state;
    }
}

export default cards;