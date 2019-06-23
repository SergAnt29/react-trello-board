import styled from 'styled-components';

const Header = styled.header`
    background-color: white;
    height: 50px;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    padding: 0 50px;
`

const HeaderTitle = styled.h1`
    font-size: 2rem;
    min-width: 100px;
    color: grey;
    margin: 0;
`

export { Header, HeaderTitle }