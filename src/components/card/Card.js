import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {createSelector} from 'reselect';
import styled from 'styled-components';

import TaskModal from '../shared/TaskModal';
import useBooleanToggle from '../../hooks/useBooleanToggle';
import {} from '../../store/actions/cards';


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
    margin: 0;
`
const ShortDescription = styled.p`
    font-size: 0.8rem;
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


const Card = ({ id }) => {
    const [isModalOpen, toggleModalOpen] = useBooleanToggle(false);
    const card = useSelector(state => selectCardById(state, id));

    const handleAddNewCard = (e) => {
        console.log('CARD', e)

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
                
                {!id && <Button onClick={handleAddNewCard}>Add new card</Button>}
            </Content>
            <TaskModal isOpen={isModalOpen} closeModal={toggleModalOpen} onSubmit={handleAddNewCard}>
            </TaskModal>
        </TicketCard>
    )
}

export default Card;
