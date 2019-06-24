import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect'
import { withRouter } from "react-router";

import ActionButtons from '../shared/ActionButtons';
import useInputHandleChange from '../../hooks/useInputHandleChange';
import InputForm from '../shared/InputForm';
import { boardAdd, boardRemove } from '../../store/actions/boards';

const selectBoardById = createSelector(
    state => state.boards,
    (_, id) => id,
    (boards, id) => boards.find(board => board.id === id)
)

const Card = styled.section`
    flex-direction: column;
    align-items:center;
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;
    min-height: 100px;
    width: 100%;
    position: relative;
    border-style: ${props => props.dashed ? "dashed" : "solid"};
    padding: 10px 20px;
    cursor: ${props => props.dashed ? "auto" : "pointer"};
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25);
    transition: box-shadow 0.16s ease-out;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    margin-top:10px;
    &:hover {
        box-shadow: ${props => props.dashed ? "0px 0px 0px 0px rgba(0,0,0,0.25)" : "0px 0px 10px 2px rgba(0,0,0,0.25)"};;
    }
`

const Title = styled.h2`
    font-size: 1rem;
    text-align: center;
    word-break: break-all;
`

const Form = styled.form`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
`
const Button = styled.button`
    width:100%;
    margin-top: 10px;
`
const Input = styled.input`
    width:100%;
`

const ErrorMessage = styled.p`
    color: red;
    font-size: 0.7rem;
`

const BoardCard = ({ id = null, history }) => {
    const [title, setTitle] = useInputHandleChange('');
    const board = useSelector(state => selectBoardById(state, id));
    const dispatch = useDispatch()

    const handleClick = (e) => {
        if (!!id) {
            history.push(`/boards/${board.alias}`);
        }
    }

    const handleBoardRemove = (e) => {
        e.stopPropagation();
        dispatch(boardRemove({ id }));
    }

    const handleBoardEdit = (e) => {
        e.stopPropagation();
        // TODO: implement edit functionality 
    }

    const handleBoardAdd = () => {
        dispatch(boardAdd({ title }));
        setTitle('')
    }

    return (
        <Card dashed={!id} onClick={handleClick}>
            {!!id && <ActionButtons onRemove={handleBoardRemove} onEdit={handleBoardEdit} />}
            {!!id && <>
                <Title>{board.title}</Title>
            </>}
            {!id &&
                <InputForm
                    onSubmit={handleBoardAdd}
                    onChange={setTitle}
                    maxLength="50"
                    minLength="2"
                    value={title}
                    buttonText="Add new board"
                    required={true}
                />
            }
        </Card>
    )
}

export default withRouter(BoardCard);