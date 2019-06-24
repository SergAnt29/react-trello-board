import React from 'react'
import Modal from 'react-modal';
import styled from 'styled-components';
import { Formik } from "formik";

import cardValidationSchema from '../../validation/card'
import useInputHanldeChange from '../../hooks/useInputHandleChange';
import  {
    Form,
    Label,
    Input,
    TextArea,
    BigTextArea,
    FormRow,
    SubmitButton,
    ErrorMessage,
} from '../../ui/form';

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


const TaskModal = ({ isOpen, closeModal, onSubmit, oldTitle = '', oldShortDescription = '', oldDescription = '', isEdit }) => {
    const [title, setTitle] = useInputHanldeChange(oldTitle);
    const [shortDescription, setShortDescription] = useInputHanldeChange(oldShortDescription);
    const [description, setDescription] = useInputHanldeChange(oldDescription);

    const handleSubmit = (values) => {
        onSubmit(values)
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation()
    }

    return (
        <Modal
            isOpen={isOpen}
            style={style}
            onClick={stopPropagation}
        >
            <Header>
                <Title>
                    {isEdit ? 'Edit' : 'Add new'} task
                </Title>
                <CloseButton onClick={closeModal}>X</CloseButton>
            </Header>
            <Content onClick={stopPropagation}>
                <Formik
                    initialValues={{ title, shortDescription, description }}
                    onSubmit={handleSubmit}
                    validationSchema={cardValidationSchema}
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
                                <SubmitButton type="submit">
                                    {isEdit ? 'Save' : 'Create'}
                                </SubmitButton>
                            </Form>
                        )
                    }}
                </Formik>
            </Content>


        </Modal>
    )
}

export default TaskModal;