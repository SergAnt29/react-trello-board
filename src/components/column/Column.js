import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {  compareByIndex } from '../../utils/arrayUtils';
import ActionButtons from '../shared/ActionButtons';
import InputForm from '../shared/InputForm';
import Card from '../card/Card';
import useInputHandleChange from '../../hooks/useInputHandleChange';
import useBooleanToggle from '../../hooks/useBooleanToggle';
import { columnAdd, columnEdit, columnRemove } from '../../store/actions/columns';
import { cardMoveVertically } from '../../store/actions/cards';


const ColumnWrapper = styled.div`
    width: 300px;
    margin: 0 10px;
    flex-shrink: 0;
`

const ColumnTag = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: blanchedalmond;
    border-radius: 5px;
`

const Header = styled.header`
    position: relative;
    min-height: 50px;
    border-radius: 5px;
    border-style: ${props => props.dashed ? "dashed" : "solid"};
    border-color: black;
    border-width: 1px;
    padding: 10px;
`

const Title = styled.h3`
    font-size: 0.9rem;
    word-break: break-all;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px 10px;
`

const selectCardsByColumnId = createSelector(
    state => state.cards,
    (_, id) => id,
    (cards, id) => cards
        .filter(card => card.columnId === id)
        .sort(compareByIndex)
        .map(({ id }) => ({ id }))
)

const selectColumnById = createSelector(
    state => state.boards,
    (_, id) => id,
    (boards, id) => boards.find(board => board.id === id)
)

const Column = ({ id, boardId, title }) => {
    const cards = useSelector(state => selectCardsByColumnId(state, id));
    const [isEditable, toggleEditable] = useBooleanToggle(false);
    const column = useSelector(state => selectColumnById(state, id));
    const [columnTitle, setColumnTitle] = useInputHandleChange(title);
    const dispatch = useDispatch();

    const handleColumnAdd = () => {
        dispatch(columnAdd(
            {
                title: columnTitle,
                boardId
            }
        ))
        setColumnTitle('')
    }

    const handleColumnRemove = () => {
        dispatch(columnRemove({ id }))
    }

    const handleColumnEdit = () => {
        dispatch(columnEdit({ id, title: columnTitle }))
        toggleEditable();
    }

    const onDragEnd = (e) => {

        const { source, destination, draggableId } = e;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            dispatch(cardMoveVertically(
                { 
                    id: draggableId,
                    columnId: source.droppableId, 
                    source: source.index, 
                    destination: destination.index 
                }))
        } else {

        }
    }

    return (
        <ColumnWrapper>
            <ColumnTag>
                <Header dashed={!id}>
                    {!isEditable && <ActionButtons
                        onRemove={!!id ? handleColumnRemove : false}
                        onEdit={!!id ? toggleEditable : false}
                    />}
                    {!!id && !isEditable ?
                        <Title>{title}</Title> :
                        <InputForm
                            onSubmit={isEditable ? handleColumnEdit : handleColumnAdd}
                            onChange={setColumnTitle}
                            maxLength="50"
                            minLength="2"
                            value={columnTitle}
                            buttonText={isEditable ? 'Change column title' : 'Add new column'}
                            required={true}
                        />
                    }
                </Header>
                <DragDropContext onDragEnd={onDragEnd}>
                    {!!id && <Content>
                        <Droppable droppableId={id}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={{width:'100%',maxWidth:'100%'}}
                                >
                                    {cards.map((card, index) => (
                                        <Card key={card.id} {...card} columnId={id} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <Card columnId={id} />
                    </Content>}
                </DragDropContext>

            </ColumnTag>
        </ColumnWrapper>
    )
}

export default Column;