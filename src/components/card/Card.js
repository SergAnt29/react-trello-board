import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import TaskModal from '../shared/TaskModal';
import ActionButtons from '../shared/ActionButtons';
import useBooleanToggle from '../../hooks/useBooleanToggle';
import { cardAdd, cardRemove, cardEdit } from '../../store/actions/cards';


const TicketCard = styled.section`
    border-radius: 5px;
    width:100%;
    background-color: rgba(255, 255, 255, 0.5);
    margin-top: 5px;
    min-height: 100px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    position: relative;
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
    margin-top: 20px;
`

const Button = styled.button`
    max-width: 100px;
`

const selectCardById = createSelector(
    state => state.cards,
    (_, id) => id,
    (cards, id) => cards.find(card => card.id === id)
)


const Card = ({ id, columnId, index }) => {
    const [isModalOpen, toggleModalOpen] = useBooleanToggle(false);
    const [isEdit, toggleIsEdit] = useBooleanToggle(false);
    const card = useSelector(state => selectCardById(state, id));
    const dispatch = useDispatch();

    const handleEditModal = () => {
        toggleIsEdit();
        toggleModalOpen()
    }

    const handleCardEdit = (payload) => {
        dispatch(cardEdit({
            id,
            ...payload,
        }))
        toggleModalOpen()
        toggleIsEdit();
    }

    const handleCardAdd = (payload) => {
        dispatch(cardAdd({
            columnId,
            ...payload,
        }))
        toggleModalOpen()
    }

    const handleCardRemove = () => {
        dispatch(cardRemove({ id }))
    }

    const renderTicketCard = () => {
        return (
            <TicketCard>
                {!isModalOpen && <ActionButtons
                    onRemove={!!id ? handleCardRemove : false}
                    onEdit={!!id ? handleEditModal : false}
                />}
                <Content empty={!id}>
                    {!!id && <>
                        <Title>{card.title}</Title>
                        <ShortDescription>{card.shortDescription}</ShortDescription>
                    </>}

                    {!id && <Button onClick={toggleModalOpen}>Add new card</Button>}
                </Content>
                <TaskModal
                    isOpen={isModalOpen}
                    closeModal={toggleModalOpen}
                    onSubmit={isEdit ? handleCardEdit : handleCardAdd}
                    oldTitle={card ? card.title : ''}
                    oldShortDescription={card ? card.shortDescription : ''}
                    oldDescription={card ? card.description : ''}
                >
                </TaskModal>
            </TicketCard>
        )
    }

    if(!!id){
        return (
            <Draggable draggableId={id} index={index}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {renderTicketCard()}
                    </div>
    
                )}
            </Draggable>
    
        )
    }

    return renderTicketCard()
}

export default Card;
