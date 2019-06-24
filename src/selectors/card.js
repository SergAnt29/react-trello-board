import {createSelector} from 'reselect';

export const selectCardById = createSelector(
    state => state.cards,
    (_, id) => id,
    (cards, id) => cards.find(card => card.id === id)
)