import React from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Page from '../layout/Page';
import FullWidthContainer from '../layout/FullWidthContainer';
import Row from '../layout/grid/Row';
import Column from '../layout/grid/Column';
import { withRouter } from 'react-router-dom';

const selectBoardByAlias = createSelector(
    state => state.boards,
    (_, alias) => alias,
    (boards, alias) => boards.find(board => board.alias === alias),
)

const selectColumnsByBoardId = createSelector(
    state => state.columns,
    (_, id) => id,
    (columns, id) => columns.filter(column => columns.boardId === id)
)

const Board = ({ match }) => {
    const board = useSelector((state) => selectBoardByAlias(state, match.params.alias))
    const columns = useSelector((state) => selectColumnsByBoardId(state, board.id))

    return (
        <Page>
            <FullWidthContainer>
                <Header title={`${board.title} | Board`}></Header>
                <Row>
                    {board.alias}
                </Row>
            </FullWidthContainer>
        </Page>
    )
}

export default withRouter(Board);