import React from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';

import useInputHanldeChange from '../../hooks/useInputHandleChange';

Modal.setAppElement('#root')

const style = {
    content: {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        heigth: '500px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 100%'
    }
}

const CloseButton = styled.button`
    margin-left: auto;
    cursor: pointer;
`

const Header = styled.header`
    position: relative;
    display: flex;
    align-items: center;
`

const Title = styled.h4`
`

const Content = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`

const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const SubmitButton = styled.button`
    margin-top: auto;
`

const TaskModal = ({ isOpen, closeModal, children }) => {
    const [title, setTitle] = useInputHanldeChange('');
    const [shortDescription, setShortDescription] = useInputHanldeChange('');
    const [description, setDescription] = useInputHanldeChange('');

    const submitModal = (e) => {

    }

    return (
        <Modal
            isOpen={isOpen}
            style={style}
        >
            <Header>
                <Title>
                    Add new task
                </Title>
                <CloseButton onClick={closeModal}>X</CloseButton>
            </Header>
            <Content>
                <FormRow>
                    <label htmlFor="title">
                        Title
                    </label>
                    <input value={title} name="title" onChange={setTitle} />
                </FormRow>

                <FormRow>
                    <label htmlFor="short-description" >
                        Short Description
                </label>
                    <textarea value={shortDescription} name="short-description" onChange={setShortDescription} />
                </FormRow>

                <FormRow>
                    <label htmlFor="description">
                        Description
                </label>
                    <textarea value={description} name="description" onChange={setDescription} />
                </FormRow>
                <SubmitButton onClick={submitModal}>Create</SubmitButton>
            </Content>


        </Modal>
    )
}

export default TaskModal;