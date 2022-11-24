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

const SignupEmp = () => {
  const [signUpEmpInfo, setSignUpEmpInfo] = useState({
    name: "",
    id: "",
    password1: "",
    password2: "",
    code: "",
  });

  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;

  const passwordCheck = (signUpEmpInfo) => {
    return passwordRegEx.test(signUpEmpInfo);
  };

	const checkNotEmptySignUpInfoValue = Object.values(signUpEmpInfo).some((data) => data === '');

  const navigate = useNavigate();
  
	const handleChangeSignUpInfoInput = (e) => {
    const { name, value } = e.target;
    setSignUpEmpInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickSignupButton = async () => {
    const res = await axios.post("employees/signup", signUpEmpInfo);
    console.log(res);
    if (res.data.isSuccess) {
      alert("회원가입 성공");
      navigate("/");
    } 
    else {
      if (res.data.code === 2037) {
        alert("중복된 아이디입니다.");
      }
      else {
        alert("회원 정보를 다시 입력해주세요");
      }
    }
  }

  return (
    <MainDiv>
      <img src="/images/signup_emp.svg" alt="직원 회원가입" width={200} />
      <InputLayer>
        <Input
          placeholder="이름"
          name={"name"}
          value={signUpEmpInfo.name}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="아이디"
          name={"id"}
          value={signUpEmpInfo.id}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="비밀번호"
					type="password"
          name={"password1"}
          value={signUpEmpInfo.password1}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="비밀번호 재입력"
					type="password"
          name={"password2"}
          value={signUpEmpInfo.password2}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="직원코드"
          name={"code"}
          value={signUpEmpInfo.code}
          onChange={handleChangeSignUpInfoInput}
        />
      </InputLayer>
      <Button
        onClick={() => {
          console.log(signUpEmpInfo);
          if (checkNotEmptySignUpInfoValue) {
            alert("모든 항목을 채워주세요.");
            return;
          }
          if (!passwordCheck(signUpEmpInfo.password1)) {
            alert(
              "비밀번호를 형식에 맞춰 입력해주세요.\n최소 8자 + 최소 한개의 영문자 + 최소 한개의 숫자 + 최소 한개의 특수 문자"
            );
            return;
          }
          if (signUpEmpInfo.password1 !== signUpEmpInfo.password2) {
            alert("비밀번호가 서로 다릅니다.");
            return;
          }
          handleClickSignupButton()
        }}
      >
        회원가입
      </Button>
    </MainDiv>
  );
};

export default SignupEmp;