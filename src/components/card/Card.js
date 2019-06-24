import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createSelector} from 'reselect';
import styled from 'styled-components';

import TaskModal from '../shared/TaskModal';
import useBooleanToggle from '../../hooks/useBooleanToggle';
import {cardAdd} from '../../store/actions/cards';


const TicketCard = styled.section`
    border-radius: 5px;
    width:100%;
    background-color: rgba(255, 255, 255, 0.5);
    margin-top: 5px;
    min-height: 100px;
    padding: 10px;
    display: flex;
    flex-direction: column;
`

const Header = styled.header`

`

const Title = styled.h4`
    font-size: 0.8rem;
    text-align:left;
    width:100%;
    margin:0;
    padding: 0 0 10px 0;
    border-bottom: 1px dotted grey;
`
const ShortDescription = styled.p`
    font-size: 0.8rem;
    width:100%;
    text-align:left;
`

const Content = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: ${props => props.empty ? 'center' : 'flex-start'};
    align-items:center;
`

const Button = styled.button`
    max-width: 100px;
`

const selectCardById = createSelector(
    state => state.cards,
    (_, id) => id,
    (cards, id) => cards.find(card => card.id === id)
)


const Card = ({ id, columnId }) => {
    const [isModalOpen, toggleModalOpen] = useBooleanToggle(false);
    const card = useSelector(state => selectCardById(state, id));
    const dispatch = useDispatch();

    const handleAddNewCard = (payload) => {
        dispatch(cardAdd({
            columnId,
            ...payload,
        }))
        toggleModalOpen()
    }

    return (
        <TicketCard>
            <Header></Header>
            <Content empty={!id}>
                {!!id && <>
                    <Title>{card.title}</Title>
                    <ShortDescription>{card.shortDescription}</ShortDescription>
                </>} 
                
                {!id && <Button onClick={toggleModalOpen}>Add new card</Button>}
            </Content>
            <TaskModal isOpen={isModalOpen} closeModal={toggleModalOpen} onSubmit={handleAddNewCard}>
            </TaskModal>
        </TicketCard>
    )
}

export default Card;
