import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import styled from 'styled-components';

import ActionButtons from '../shared/ActionButtons';
import InputForm from '../shared/InputForm';
import useInputHandleChange from '../../hooks/useInputHandleChange';

import { columnAdd, columnEdit, columnRemove } from '../../store/actions/columns';

const ColumnWrapper = styled.div`
    max-width: 250px;
    margin: 0 10px;
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
    font-size: 0.8rem;
    word-break: break-all;
`

const selectCardsByColumnId = createSelector(
    state => state.cards,
    (_, id) => id,
    (cards, id) => cards.filter(card => card.columnId === id)
)

const selectColumnById = createSelector(
    state => state.boards,
    (_, id) => id,
    (boards, id) => boards.find(board => board.id === id)
)

const Column = ({ id, boardId, title }) => {
    const cards = useSelector(state => selectCardsByColumnId(state, id));
    const column = useSelector(state => selectColumnById(state, id));
    const [columnTitle, setColumnTitle] = useInputHandleChange(title);
    const dispatch = useDispatch();

    const handleColumnAdd = () => {
        dispatch(columnAdd({
            title:columnTitle,
            boardId
        }))
    }

    return (
        <ColumnWrapper>
            <ColumnTag>
                <Header dashed={!id}>
                    <ActionButtons />
                    {!!title ? 
                    <Title>{title}</Title> :
                    <InputForm 
                        onSubmit={handleColumnAdd}
                        onChange={setColumnTitle}
                        maxLength="50"
                        minLength="2"
                        value={columnTitle}
                        buttonText="Add new column"
                        required={true}
                    />
                    }
                </Header>
            </ColumnTag>
        </ColumnWrapper>
    )
}

export default Column;