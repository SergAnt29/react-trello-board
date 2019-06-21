import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect'
import { withRouter } from "react-router";

import Actions from './BoardCardActions';
import {BOARD_ADD} from '../../store/constants';

const selectBoardById = createSelector(
    state => state.boards,
    (_, id) => id,
    (boards, id) => boards.find(board => board.id === id)
)

const Card = styled.section`
    border: 1px solid black;
    border-radius: 5px;
    min-height: 100px;
    width: 225px;
    position: relative;
    border-style: ${props => props.dashed ? "dashed" : "solid"};
    padding: 10px;
    cursor: ${props => props.dashed ? "normal" : "pointer"};;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25);
    transition: box-shadow 0.16s ease-out;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    &:hover {
        box-shadow: ${props => props.dashed ? "0px 0px 0px 0px rgba(0,0,0,0.25)" : "0px 0px 10px 2px rgba(0,0,0,0.25)"};;
    }
`

const Title = styled.h2`
    font-size: 1rem;
    text-align: center;
`

const BoardCard = ({ id = null, history }) => {
    const [newBoardTitle, setNewBoardTitle] = useState('')
    const board = useSelector(state => selectBoardById(state, id))
    const dispatch = useDispatch()

    const hadleChange = (e) => {
        setNewBoardTitle(e.target.value)
    }

    const handleClick = (e) => {
        if (!!id) {
            history.push(`/boards/${board.alias}`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({type: BOARD_ADD, payload: {title: newBoardTitle}})
    }

    return (
        <Card dashed={!id} onClick={handleClick}>
            {!!id && <Actions {...board}/>}
            {!!id && <>
                <Title>{board.title}</Title>
            </>}
            {!id && <form onSubmit={handleSubmit}>
                <input onChange={hadleChange}></input>
                <button type="submit">+</button>
            </form>}
        </Card>
    )
}

export default withRouter(BoardCard);