import React, { useEffect, useState } from 'react';
import styled from 'styled-components';



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

const InputForm = ({ onSubmit, ...rest }) => {
    const { value, buttonText = "button", minLength = 0, maxLength = 50 } = rest;
    const [validationError, setValidationError] = useState(false);

    useEffect(() => {
        setValidationError(false)
    }, [value])

    // JS validation in case if html validation will be disabled
    const validate = (value) => {
        if (value.length >= minLength && value.length <= maxLength) {
            return true;
        }

        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate(value)) {
            onSubmit()
        } else {
            setValidationError('Board title length must be between 2 and 50 symbols')
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Input {...rest}></Input>
            <Button type="submit">{buttonText}</Button>
            {!!validationError && <ErrorMessage>{validationError}</ErrorMessage>}
        </Form>
    )
}

export default InputForm;