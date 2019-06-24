import React from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

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
    const columns = useSelector((state) => selectColumnsByBoardId(state, board.id))

    return (
        <Page>
            <FullWidthContainer>
                <Header title={`${board.title} | Board`}></Header>
                <ColumnsWrapper>
                    {columns && columns.length > 0 && columns.map((column) => (
                        <Column key={column.id} boardId={board.id} {...column}></Column>
                    ))}
                    <Column boardId={board.id}></Column>
                </ColumnsWrapper>
            </FullWidthContainer>
        </Page>
    )
}

export default withRouter(Board);