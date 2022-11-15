import React, { useState } from 'react';
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
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handelClickLoginButton = async (type) => {
    if (type === 'employee') {
      // TODO: Employee 로그인 요청
      console.log("employee");
      console.log({id, password});
      const res = await fetch('http://localhost:8080/users/employee/login', {
        method: "POST",
        headers: {
          "Content-Type": "applcation/json",
        },
        body: {
          id, password
        }
      });
    } else {
      console.log("client");
      console.log({id, password});
      const res = await fetch('http://localhost:8080/users/client/login', {
        method: "POST",
        headers: {
          "Content-Type": "applcation/json",
        },
        body: {
          id, password
        }
      });

      //TODO: res 값에 따라서, 로그인 성공이면 routing 이동
      
      //TODO: 로그인 실패라면 다시하라고 알려주기
    }
  }

  return (
    <MainDiv>
      <img src='/images/logo_black.svg' alt='logo' width={200}/>
      <Container>
        <Input placeholder='아이디' value={id} onChange={e => setId(e.target.value)}/>
        <Input placeholder='비밀번호' type='password' value={password} onChange={e => setPassword(e.target.value)}/>
      </Container>
      <ButtonLayout>
        <Button onClick={() => handelClickLoginButton('employee')}>직원 로그인</Button>
        <Button onClick={() => handelClickLoginButton('client')}>고객 로그인</Button>
      </ButtonLayout>
      <SignupDiv>
        아직 계정이 없으신가요?
        <StyledLink to='/Signup'>  회원가입</StyledLink>
      </SignupDiv>
    </MainDiv>
  );
};

export default Login;