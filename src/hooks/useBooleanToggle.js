import {useState} from 'react';

const useBooleanToggle = (initialValue) => {
    if (typeof variable !== "boolean"){
        throw new Error('')
    }

    const [value, setValue] = useState(initialValue);

    const toggle = () => {
        setValue(!value)
    }
}