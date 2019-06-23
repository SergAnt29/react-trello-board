import React from 'react';
import {Header as AppHeader, HeaderTitle} from '../layout/Header';

const Header = ({title, children}) => {
    return (
    <AppHeader>
        <HeaderTitle>{title}</HeaderTitle>
        {children}
    </AppHeader>
    )
}

export default Header;