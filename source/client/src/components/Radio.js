import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: flex;
  align-items: flex-start;
`

const Radio = ({ children, value, name, defaultChecked, disabled, onChange }) => {
  return (
    <StyledLabel>
      <input style={{accentColor: 'black'}}
        type="radio"
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
      />
      {children}
    </StyledLabel>
  );
};

export default Radio;