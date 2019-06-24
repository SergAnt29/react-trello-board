import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Formik } from "formik";

import Header from '../components/Header';
import Page from '../layout/Page';
import FullWidthContainer from '../layout/FullWidthContainer';
import { selectCardById } from '../selectors/card';
import cardValidationSchema from '../validation/card'
import {
    Form,
    Label,
    Input,
    TextArea,
    BigTextArea,
    FormRow,
    SubmitButton,
    ErrorMessage,
} from '../ui/form';
import { cardEdit, cardRemove } from '../store/actions/cards';

const Content = styled.div`
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0 20px;
`

const RemoveButton = styled(SubmitButton)`
    color: white;
    background-color: red;
    margin-left:0;
`
const CardActions = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    width: 100%;
`

const Card = ({ match, history }) => {
    const id = match.params.id;
    const card = useSelector((state) => selectCardById(state, id));
    const dispatch = useDispatch();

    if(!card){
        history.push('/')
    }

    const handleSubmit = (payload) => {
        dispatch(cardEdit({
            id,
            ...payload,
        }))
    }

    const handleRemove = (e) => {
        history.goBack();

        // Clutch but I have not enought time
        setTimeout(()=>{
            dispatch(cardRemove({ id }));
        },50)

    }
    
    const { title, shortDescription, description, createdAt, updatedAt } = card;

    const dateFormat = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    }

    return (
        <Page>
            <FullWidthContainer>
                <Header title={`${card ? card.title + ' |' : ''} Card`}>

                </Header>
                <Content>
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
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="description"
                                            error={errors.description}
                                        />
                                        {errors.description && touched.description ? <ErrorMessage>{errors.description}</ErrorMessage> : null}
                                    </FormRow>

                                    <FormRow>
                                        <Label htmlFor="createdAt">
                                            Created at
                                    </Label>
                                        <Input
                                            value={dateFormat(createdAt)}
                                            name="createdAt"
                                            disabled={true}
                                        />
                                    </FormRow>

                                    <FormRow>
                                        <Label htmlFor="updatedAt">
                                            Updated at
                                    </Label>
                                        <Input
                                            value={dateFormat(updatedAt)}
                                            name="updatedAt"
                                            disabled={true}
                                        />
                                    </FormRow>

                                    <CardActions>
                                        <RemoveButton onClick={handleRemove}>
                                            Remove
                                    </RemoveButton>
                                        <SubmitButton type="submit">
                                            Save
                                    </SubmitButton>
                                    </CardActions>

                                </Form>
                            )
                        }}
                    </Formik>
                </Content>
            </FullWidthContainer>
        </Page>
    )
}

export default withRouter(Card);
