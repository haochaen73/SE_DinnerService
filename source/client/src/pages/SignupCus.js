import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
	const [signUpCusInfo, setSignUpCusInfo] = useState({
		name: '',
		id: '',
		password1: '',
		password2: '',
		email: '',
		phoneNum: '',
		address: '',
	});

	const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;
	const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
	const phoneNumRegEx = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
  const navigate = useNavigate();
  
	const passwordCheck = (signUpCusInfo) => {
		return passwordRegEx.test(signUpCusInfo);
	}

  const emailCheck = (signUpCusInfo) => {
    return emailRegEx.test(signUpCusInfo); //형식에 맞을 경우, true 리턴
  }

	const phoneNumCheck = (signUpCusInfo) => {
		return phoneNumRegEx.test(signUpCusInfo);
	}

	const checkNotEmptySignUpInfoValue = Object.values(signUpCusInfo).some((data) => data === '');

	const handleChangeSignUpInfoInput = (e) => {
		const { name, value } = e.target;
		setSignUpCusInfo((prev) => ({ ...prev, [name]: value }));
	}

  const handleClickSignupButton = async () => {
    const res = await axios.post("users/signup", signUpCusInfo);
    if (res.data.isSuccess) {
      alert("회원가입 성공");
      navigate("/");
    } 
    else {
      if (res.data.code === 2023) {
        alert("중복된 아이디입니다.");
      }
      else {
        alert("회원 정보를 다시 입력해주세요");
      }
    }
  }

  return (
    <MainDiv>
      <img src="/images/signup_cus.svg" alt="고객 회원가입" width={200} />
      <InputLayer>
				{/* {checkNotEmptySignUpInfoValue && <div>모든 항목을 입력해주세요</div>} */}
        <Input
          placeholder="이름"
          name={"name"}
          value={signUpCusInfo.name}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="아이디"
          name={"id"}
          value={signUpCusInfo.id}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          name={"password1"}
          value={signUpCusInfo.password1}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="비밀번호 재입력"
          type="password"
          name={"password2"}
          value={signUpCusInfo.password2}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="이메일 주소"
          name={"email"}
          value={signUpCusInfo.email}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="휴대폰 번호"
          name={"phoneNum"}
          value={signUpCusInfo.phoneNum}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="배달 주소"
          name={"address"}
          value={signUpCusInfo.address}
          onChange={handleChangeSignUpInfoInput}
        />
      </InputLayer>
      <Button
        onClick={() => {
          console.log(signUpCusInfo);
					if (checkNotEmptySignUpInfoValue) {
						alert('모든 항목을 채워주세요.');
						return;
					}
					if(!passwordCheck(signUpCusInfo.password1)){
						alert('비밀번호를 형식에 맞춰 입력해주세요.\n최소 8자 + 최소 한개의 영문자 + 최소 한개의 숫자 + 최소 한개의 특수 문자');
						return;
					}
          if (signUpCusInfo.password1 !== signUpCusInfo.password2) {
            alert("비밀번호가 서로 다릅니다.");
            return;
          }
					if(!emailCheck(signUpCusInfo.email)){
						alert('이메일을 올바르게 입력해주세요.');
						return;
					}
					if(!phoneNumCheck(signUpCusInfo.phoneNum)){
						alert('전화번호를 형식에 맞춰 입력해주세요.\n010-****-****');
						return;
					}
          handleClickSignupButton()
        }}
				//disabled={checkNotEmptySignUpInfoValue}
      >
        회원가입
      </Button>
    </MainDiv>
  );
};

export default SignupCus;