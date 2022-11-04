import React from 'react';
import styled, {css} from 'styled-components';

const StyledButton = styled.button`
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 0.8rem;
  line-height: 1.5;
  border: 1px solid black;
  color: white;
  background: black;  
  text-decoration: none;
  color: white;
  :hover{
    background: #262626;
  }
`;

const Button = ({text}) => {
  return (
    <StyledButton>
      {text}
    </StyledButton>
  );
};

export default Button;