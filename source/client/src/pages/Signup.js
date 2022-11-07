import React from 'react';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';

const MainDiv = styled.div`
  height: 300px;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ButtonLayout = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledLink = styled(Link)`
  padding: 6px 20px;
  margin: 8px;
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

const Signup = () => {
  return (
    <MainDiv>
      <img src='/images/logo_black.svg' alt='logo' width={200}/>
      <ButtonLayout>
        <StyledLink to='/signup-employee'>
          직원으로 회원가입하기
        </StyledLink>
        <StyledLink to='/signup-customer'>
          고객으로 회원가입하기
        </StyledLink>
      </ButtonLayout>
    </MainDiv>
  );
};

export default Signup;