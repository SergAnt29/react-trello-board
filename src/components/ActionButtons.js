import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { boardRemove } from '../store/actions/boards';

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

const ActionButtons = ({onRemove=false, onEdit=false }) => {

    return (
        <ActionsWrapper>
            {!!onEdit && <Button onClick={onEdit}>Edit</Button>}
            {!!onRemove && <Button onClick={onRemove}>Remove</Button>}
        </ActionsWrapper>
    )
}

export default ActionButtons;