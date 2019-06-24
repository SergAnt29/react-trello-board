import React from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Page from '../layout/Page';
import FullWidthContainer from '../layout/FullWidthContainer';
import Row from '../layout/grid/Row';
import Column from '../layout/grid/Column';

import BoardCard from '../components/board/BoardCard';

const selectBoards = createSelector(
    state => state.boards,
    boards => boards.map(({ id }) => ({ id })),
)

const Dashboard = () => {
    const boards = useSelector(selectBoards)

    return (
        <Page>
            <FullWidthContainer>
                <Header title={'Dashboard'}></Header>
                <Row>
                    {boards.map(board => (
                        <Column key={board.id}>
                            <BoardCard  {...board} />
                        </Column>
                    ))}
                    <Column>
                        <BoardCard />
                    </Column>
                </Row>
            </FullWidthContainer>
        </Page>
    )
}

export default Dashboard;