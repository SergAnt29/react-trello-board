import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { boardRemove } from '../../store/actions/boards';

const ActionsWrapper = styled.div`
    position: absolute;
    width: 50px;
    height: 25px;
    top:0;
    right:0;
    display: flex;
    justify-content: flex-end;
`

const Button = styled.button`
    cursor: pointer;
`

const BoardCardActions = ({ id }) => {
    const dispatch = useDispatch()

    const handleClick = (action, e) => {
        e.stopPropagation();
        dispatch(action({ id }))
    }

    return (
        <ActionsWrapper>
            <Button onClick={(e) => handleClick(boardRemove, e)}>Remove</Button>
        </ActionsWrapper>
    )
}

export default BoardCardActions;