import React from 'react';
import styled, {css} from 'styled-components';

const StyledInput = styled.input`
    border: 1px solid #212121;
    width: 45%;
    padding: 12px 4px;
    padding-left: 4px;
    margin: 10px;
    box-sizing: border-box;
    border-radius: 5px;
`;

const Input = (props) => {
    const {placeholder} = props;
    return (
        <StyledInput placeholder={placeholder}/>
    );
};

export default Input;