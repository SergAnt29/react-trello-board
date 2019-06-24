import {useState} from 'react';

const useBooleanToggle = (initialValue) => {
    if (typeof initialValue !== "boolean"){
        throw new Error('')
    }

    const [value, setValue] = useState(initialValue);

    const toggleValue = () => {
        setValue(!value)
    }

    return [value, toggleValue]
}

export default useBooleanToggle;