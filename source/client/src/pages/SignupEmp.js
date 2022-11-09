import React from 'react';
import styled, {css} from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';

const MainDiv = styled.div`
  padding: 80px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputLayer = styled.div`
	position: relative;
	width: 100%;
	margin-top: 20px;
	margin-bottom: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
`

const SignupEmp = () => {
  return (
    <MainDiv>
        <img src='/images/signup_emp.svg' alt='직원 회원가입' width={200}/>
        <InputLayer>
					<Input placeholder='이름'/>
					<Input placeholder='아이디'/>
					<Input placeholder='비밀번호'/>
					<Input placeholder='비밀번호 재입력'/>
					<Input placeholder='직원코드'/>
				</InputLayer>
				<Button text="회원가입"/>
    </MainDiv>
  );
};

export default SignupEmp;