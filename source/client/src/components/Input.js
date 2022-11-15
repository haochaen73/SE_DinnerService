import React from 'react';
import styled, {css} from 'styled-components';

const StyledInput = styled.input`
    border: 1px solid #212121;
    width: 45%;
    padding: 12px 4px 12px 8px;
    margin: 10px;
    box-sizing: border-box;
    border-radius: 5px;
`;

const Input = (props) => {
    return (
        <StyledInput {...props}/>
    );
};

export default Input;