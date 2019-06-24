import React from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';
import { Formik, Field } from "formik";
import * as Yup from 'yup';

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

const Label = styled.label`
    color: grey;
`

const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
`

const SubmitButton = styled.button`
    margin-top: auto;
`

const ErrorMessage = styled.div`
    color: red;
    font-size:0.7rem;
`

const TaskModal = ({ isOpen, closeModal, oldTitle = '', oldShortDescription = '', oldDescription = '' }) => {
    const [title, setTitle] = useInputHanldeChange(oldTitle);
    const [shortDescription, setShortDescription] = useInputHanldeChange(oldShortDescription);
    const [description, setDescription] = useInputHanldeChange(oldDescription);

    const handleSubmit = (e) => {
        console.log('ONSUBMIT',e)
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .max(50, 'Please enter no more than 50 characters')
            .min(2, 'Please enter no less than 2 characters')
            .required('Please enter task title'),
        shortDescription: Yup.string()
            .max(100, 'Please enter no more than 100 characters'),
        shortDescription: Yup.string()
            .max(500, 'Please enter no more than 500 characters'),   
    })

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
                <Formik
                    initialValues={{ title, shortDescription, description }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <FormRow>
                                    <Label htmlFor="title">
                                        Title
                                    </Label>
                                    <Field 
                                        component="input" 
                                        value={values.title} 
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                        name="title" 
                                    />
                                    {errors.title && touched.title ? <ErrorMessage>{errors.title}</ErrorMessage> : null}
                                </FormRow>

                                <FormRow>
                                    <Label htmlFor="shortDescription" >
                                        Short Description
                                    </Label>
                                    <Field 
                                        component="textarea" 
                                        value={values.shortDescription} 
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                        name="shortDescription" 
                                    />
                                </FormRow>

                                <FormRow>
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Field 
                                        component="textarea" 
                                        value={values.description} 
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                        name="description" 
                                    />
                                </FormRow>
                                <SubmitButton type="submit">Create</SubmitButton>
                            </form>

                        )
                    }}
                </Formik>
            </Content>


        </Modal>
    )
}

export default TaskModal;