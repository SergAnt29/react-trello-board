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
        width: '90vw',
        height: '90vh',
        maxWidth: '900px',
        maxHeight: '900px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 0 100%',
        boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.25)',

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

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`

const Label = styled.label`
    color: grey;
    margin-bottom: 5px;
`

const Input = styled.input`
    width: 100%;
    border-color: ${props => props.error ? 'red' : 'black'};
    border-style: solid;
    border-width: 1px;
`

const TextArea = styled.textarea`
    width: 100%;
    border-color: ${props => props.error ? 'red' : 'black'};
    border-style: solid;
    border-width: 1px;
    resize: none;
    height: 50px;
    font-family: Arial, Helvetica, sans-serif;
`
const BigTextArea = styled(TextArea)`
    height: 150px;
`

const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    width: 100%;
`

const SubmitButton = styled.button`
    margin-top: auto;
    margin-left: auto;
`

const ErrorMessage = styled.div`
    color: red;
    font-size:0.7rem;
    margin-top: 5px;
`

const TaskModal = ({ isOpen, closeModal, onSubmit, oldTitle = '', oldShortDescription = '', oldDescription = '' }) => {
    const [title, setTitle] = useInputHanldeChange(oldTitle);
    const [shortDescription, setShortDescription] = useInputHanldeChange(oldShortDescription);
    const [description, setDescription] = useInputHanldeChange(oldDescription);

    const handleSubmit = (values) => {
        onSubmit(values)
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

    const stopPropagation = (e) => e.stopPropagation()

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
                            <Form onSubmit={handleSubmit}>
                                <FormRow>
                                    <Label htmlFor="title">
                                        Title
                                    </Label>
                                    <Input
                                        onClick={stopPropagation}
                                        value={values.title} 
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                        name="title" 
                                        error={errors.title}
                                    />
                                    {errors.title && touched.title ? <ErrorMessage>{errors.title}</ErrorMessage> : null}
                                </FormRow>

                                <FormRow>
                                    <Label htmlFor="shortDescription" >
                                        Short Description
                                    </Label>
                                    <TextArea 
                                        onClick={stopPropagation}
                                        value={values.shortDescription} 
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                        name="shortDescription"
                                        error={errors.shortDescription}
                                    />
                                    {errors.shortDescription && touched.shortDescription ? <ErrorMessage>{errors.shortDescription}</ErrorMessage> : null}
                                </FormRow>

                                <FormRow>
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <BigTextArea 
                                        onClick={stopPropagation}
                                        value={values.description} 
                                        onChange={handleChange}
                                        onBlur={handleBlur} 
                                        name="description" 
                                        error={errors.description}
                                    />
                                    {errors.description && touched.description ? <ErrorMessage>{errors.description}</ErrorMessage> : null}
                                </FormRow>
                                <SubmitButton type="submit">Create</SubmitButton>
                            </Form>
                        )
                    }}
                </Formik>
            </Content>


        </Modal>
    )
}

export default TaskModal;