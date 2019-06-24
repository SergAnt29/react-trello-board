import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Header from '../components/Header';
import Page from '../layout/Page';
import FullWidthContainer from '../layout/FullWidthContainer';
import { selectCardById } from '../selectors/card';

const Content = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
`


const Card = ({ match }) => {
    const id = match.params.id;
    const card = useSelector((state) => selectCardById(state, id));

    return (
        <Page>
            <FullWidthContainer>
                <Header title={`${card ? card.title + ' |' : ''} Card`}></Header>
                <Content>
                    <div>{}</div>
                </Content>
            </FullWidthContainer>
        </Page>
    )
}

export default withRouter(Card);
