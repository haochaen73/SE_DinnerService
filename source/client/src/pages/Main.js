import React from 'react';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

const MainDiv = styled.div`
  padding: 100px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const StyledLink = styled(Link)`
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
`

const Main = () => {
  return (
    <MainDiv>
      <img src='/images/maintext.png' alt='dinner service' width={300}/>
      <img src='/images/subtext.png' alt='text' width={450}/>
      <StyledLink to='/order'>
        지금 주문하기
      </StyledLink>
    </MainDiv>
  );
};

export default Main;