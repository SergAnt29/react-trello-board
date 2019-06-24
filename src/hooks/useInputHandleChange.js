import {useState} from 'react';

const useInputHandleChange = (initialValue) => {
    let [value, setValue] = useState(initialValue);

    const handleInputChange = (event) => {
        if(typeof event === 'string'){
            setValue(event);
            return;
        }

        event.preventDefault();
        setValue(event.target.value);
    }

    return [value, handleInputChange];
}

export default useInputHandleChange;