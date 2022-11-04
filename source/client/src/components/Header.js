import React from 'react';
import styled, {css} from 'styled-components';

const HeaderDiv = styled.div`
  background-color: black;
  width: 100%;
  height: 50px;
  top: 0;
  position: fixed;
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


const Header = () => {
  return (
    <HeaderDiv>
      <Logo src='images/logo.svg' alt='logo'/>
      <LeftContentDiv>
        <MemberDiv>로그인</MemberDiv>
        <MemberDiv>회원가입</MemberDiv>
      </LeftContentDiv>
    </HeaderDiv>
  );
};

export default Header;