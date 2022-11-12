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

const SignupCus = () => {
  return (
    <MainDiv>
        <img src='/images/signup_cus.svg' alt='고객 회원가입' width={200}/>
        <InputLayer>
					<Input placeholder='이름'/>
					<Input placeholder='아이디'/>
					<Input placeholder='비밀번호'/>
					<Input placeholder='비밀번호 재입력'/>
					<Input placeholder='이메일 주소'/>
                    <Input placeholder='휴대폰 번호'/>
                    <Input placeholder='배달 주소'/>
				</InputLayer>
				<Button>회원가입</Button>
    </MainDiv>
  );
};

export default SignupCus;