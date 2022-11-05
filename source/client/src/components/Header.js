import React from 'react';
import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';

const HeaderDiv = styled.div`
  background-color: black;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  margin-left: 70px;
  height: 20px;
`

const LeftContentDiv = styled.div`
  display: flex;
  color: white;
  font-size: 10px;
  font-weight: bold;
  margin-right: 70px;
`
const MemberDiv = styled.div`
  padding: 20px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
`


const Header = () => {
  return (
    <HeaderDiv>
      <StyledLink to='/'>
        <Logo src='images/logo.svg' alt='logo'/>
      </StyledLink>
      <LeftContentDiv>
        <MemberDiv>
          <StyledLink to='/login'>로그인</StyledLink>
        </MemberDiv>
        <MemberDiv>
          <StyledLink to='/signup'>회원가입</StyledLink>
        </MemberDiv>
      </LeftContentDiv>
    </HeaderDiv>
  );
};

export default Header;