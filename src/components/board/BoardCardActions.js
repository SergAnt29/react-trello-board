import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { BOARD_REMOVE } from '../../store/constants'

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

    const handleClick = (e) => {
        e.stopPropagation();
        dispatch({ type: BOARD_REMOVE, payload: { id } })
    }

    return (
        <ActionsWrapper>
            <Button onClick={handleClick}>Remove</Button>
        </ActionsWrapper>
    )
}

export default BoardCardActions;