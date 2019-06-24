import styled from 'styled-components';

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
    min-width: 100px;
`

const ErrorMessage = styled.div`
    color: red;
    font-size:0.7rem;
    margin-top: 5px;
`

export {
    Form,
    Label,
    Input,
    TextArea,
    BigTextArea,
    FormRow,
    SubmitButton,
    ErrorMessage,
}