import React from 'react';
import styled, {css} from 'styled-components';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const MainDiv = styled.div`
  padding: 80px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonLayout = styled.div`
  position: relative;
  width: 25%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  :hover{
    color: blue;
  }
`
const SignupDiv = styled.div`
  font-size: 13px;
`

const Login = (props) => {
  return (
    <MainDiv>
      <img src='/images/logo_black.svg' alt='logo' width={200}/>
      <Container>
        <Input placeholder=' 아이디'/>
        <Input placeholder=' 비밀번호'/>
      </Container>
      <ButtonLayout>
        <Button text="직원 로그인"/>
        <Button text="고객 로그인"/>
      </ButtonLayout>
      <SignupDiv>
        아직 계정이 없으신가요?
        <StyledLink to='/Signup'>  회원가입</StyledLink>
      </SignupDiv>
    </MainDiv>
  );
};

export default Login;