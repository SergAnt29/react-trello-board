import React, {useState} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect'
import { withRouter } from "react-router";

import Actions from './BoardCardActions';
import useInputHandleChange from '../../hooks/useInputHandleChange';
import useBooleanToggle from '../../hooks/useBooleanToggle';

import { boardAdd } from '../../store/actions/boards';

const selectBoardById = createSelector(
    state => state.boards,
    (_, id) => id,
    (boards, id) => boards.find(board => board.id === id)
)

const Card = styled.section`
    box-sizing: border-box;
    border: 1px solid black;
    border-radius: 5px;
    min-height: 100px;
    width: 100%;
    position: relative;
    border-style: ${props => props.dashed ? "dashed" : "solid"};
    padding: 10px;
    cursor: ${props => props.dashed ? "normal" : "pointer"};
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
    width:90%;
    display:flex;
    flex-direction:column;
    align-items:center;
`
const Button = styled.button`
    width:100%;
    margin-top: 10px;
`
const Input = styled.input`
    width:100%;
`

const BoardCard = ({ id = null, history }) => {
    const [newBoardTitle, setNewBoardTitle] = useInputHandleChange('');
    const [validationError, setValidationError] = useState(false);
    const board = useSelector(state => selectBoardById(state, id));
    const dispatch = useDispatch()

    const validate = (value) => {
        if (value.length <= 50){
            return true;
        }

        return false;
    }

    const handleClick = (e) => {
        if (!!id) {
            history.push(`/boards/${board.alias}`);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate(newBoardTitle)){
            dispatch(boardAdd({ title: newBoardTitle}));
            setNewBoardTitle('')
        }else{
            setValidationError('Board title length must be less then 50 symbols')
        }
    }

    return (
        <Card dashed={!id} onClick={handleClick}>
            {!!id && <Actions {...board} />}
            {!!id && <>
                <Title>{board.title}</Title>
            </>}
            {!id &&
                <Form onSubmit={handleSubmit}>
                <Input onChange={setNewBoardTitle} maxLength="50" value={newBoardTitle}></Input>
                    <Button type="submit">Add new board</Button>
                </Form>}
        </Card>
    )
}

export default withRouter(BoardCard);