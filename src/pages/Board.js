import React from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { cardMoveVertically, cardMoveHorizontally, cardInsertIntoColumn, cardUpdateIndex } from './../store/actions/cards';

import Column from '../components/column/Column';
import Header from '../components/Header';
import Page from '../layout/Page';
import FullWidthContainer from '../layout/FullWidthContainer';
import ContainerHorizontalScrollable from '../layout/ContainerHorizontalScrollable';


const ColumnsWrapper = styled(ContainerHorizontalScrollable)`
    padding: 10px 0;
    display: flex;
`

const selectBoardByAlias = createSelector(
    state => state.boards,
    (_, alias) => alias,
    (boards, alias) => boards.find(board => board.alias === alias),
)

const selectColumnsByBoardId = createSelector(
    state => state.columns,
    (_, id) => id,
    (columns, id) => columns.filter(column => column.boardId === id)
)

const Board = ({ match }) => {
    const board = useSelector((state) => selectBoardByAlias(state, match.params.alias))
    const columns = useSelector((state) => selectColumnsByBoardId(state, board ? board.id : null))
    const dispatch = useDispatch();

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
            dispatch(cardMoveHorizontally(
                {
                    id: draggableId,
                    sourceColumnId: source.droppableId,
                    destinationColumnId: destination.droppableId,
                    source: source.index,
                    destination: destination.index,
                }))
        }
    }

    return (
        <Page>
            <FullWidthContainer>
                <Header title={`${board ? board.title + ' |' : ''} Board`}></Header>
                <DragDropContext onDragEnd={onDragEnd}>
                    <ColumnsWrapper>
                        {board && columns && columns.length > 0 && columns.map((column) => (
                            <Column key={column.id} boardId={board.id} {...column}></Column>
                        ))}
                        <Column boardId={board ? board.id : null}></Column>
                    </ColumnsWrapper>
                </DragDropContext>
            </FullWidthContainer>
        </Page>
    )
}

export default withRouter(Board);