import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { userState } from '../recoil/user';
import axios from 'axios';

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
  const setUserState = useSetRecoilState(userState);
  const navigate = useNavigate();

  const handelClickLoginButton = async (type) => {
    if (type === 'employee') {
      console.log("employee");
      console.log({id, password});
      const res = await axios.post('employees/logIn', {id, password});
      if(res.isSuccess) {
        navigate('/employee');
        setUserState({
          userIdx: res.result.employeeIdx,
          name: '',
          // name: 'res.result.name,'
          userType: 'employee',
        })
      } else {
        alert('회원 정보를 정확하게 입력해라 이자식~');
      }
    } else {
      console.log("client");
      console.log({id, password});
      const res = await axios.post('users/logIn', {id, password});
      if(res.isSuccess) {
        navigate('/main')
        setUserState({
          userIdx: res.result.userIdx,
          name: '',
          // name: res.result.name,
          userType: 'client',
        })
      } else {
        alert('회원 정보를 정확하게 입력해라 이자식~');
      }
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