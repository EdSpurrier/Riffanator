import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';


const Input = styled.input`
    padding: ${({ theme }) => theme.sizes.input.padding};
    min-width: ${({ theme }) => theme.sizes.input.minWidth};
    color: ${({ theme }) => theme.colors.input.text};
    background: ${({ theme }) => theme.colors.input.background};
    font-size : ${({ theme }) => theme.fontSizes.input};
    border: none;
    border-radius: 3px;
    text-align: left;
`;



const TextInput = memo(({ inputValue, onChangeAction, ...props }) => {

    const [value, setValue] = useState(inputValue);

    useEffect(() => {


        if (!onChangeAction) {
            alert('No Action Connected....');
            return;
        };


        onChangeAction(value);

    }, [value]);





    return (
        <Input {...props} type="text" defaultValue={value} onChange={(e) => setValue(e.target.value)} />
    );

});

TextInput.displayName = 'TextInput';

export default TextInput;
