import React, { useState } from 'react';
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
  const [signUpEmpInfo, setSignUpEmpInfo] = useState({
    name: "",
    id: "",
    password: "",
    checkPassword: "",
    employeeCode: "",
  });

  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;

  const passwordCheck = (signUpEmpInfo) => {
    return passwordRegEx.test(signUpEmpInfo);
  };

	const checkNotEmptySignUpInfoValue = Object.values(signUpEmpInfo).some((data) => data === '');
  
	const handleChangeSignUpInfoInput = (e) => {
    const { name, value } = e.target;
    setSignUpEmpInfo((prev) => ({ ...prev, [name]: value }));
  };

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
          name={"password"}
          value={signUpEmpInfo.password}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="비밀번호 재입력"
					type="password"
          name={"checkPassword"}
          value={signUpEmpInfo.checkPassword}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="직원코드"
          name={"employeeCode"}
          value={signUpEmpInfo.employeeCode}
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
          if (!passwordCheck(signUpEmpInfo.password)) {
            alert(
              "비밀번호를 형식에 맞춰 입력해주세요.\n최소 8자 + 최소 한개의 영문자 + 최소 한개의 숫자 + 최소 한개의 특수 문자"
            );
            return;
          }
          if (signUpEmpInfo.password !== signUpEmpInfo.checkPassword) {
            alert("비밀번호가 서로 다릅니다.");
            return;
          }
        }}
      >
        회원가입
      </Button>
    </MainDiv>
  );
};

export default SignupEmp;