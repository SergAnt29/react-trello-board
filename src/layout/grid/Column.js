import styled from 'styled-components';


const Column = styled.div`
    padding: 0 10px;
    box-sizing: border-box;

    @media (min-width: 1400px) {
        width: 20%
    }

    @media (max-width: 1399.98px) and (min-width: 1200px) {
        width: 25%
    }

    @media (max-width: 1199.98px) and (min-width: 768px) {
        width: 33.3%
    }

    @media (max-width: 767.98px) and (min-width: 500px) {
        width: 50%
    }

    @media (max-width: 499.98px) {
        width: 100%
    }
`

export default Column;