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

const SignupCus = () => {
	const [signUpInfo, setSignUpInfo] = useState({
		name: '',
		id: '',
		password: '',
		checkPassword: '',
		email: '',
		phone: '',
		address: '',
	});
	const checkNotEmptySignUpInfoValue = Object.values(signUpInfo).some((data) => data === '');

	const handleChangeSignUpInfoInput = (e) => {
		const { name, value } = e.target;
		setSignUpInfo((prev) => ({ ...prev, [name]: value }));
	}

  return (
    <MainDiv>
      <img src="/images/signup_cus.svg" alt="고객 회원가입" width={200} />
      <InputLayer>
				{/* {checkNotEmptySignUpInfoValue && <div>모든 항목을 입력해주세요</div>} */}
        <Input
          placeholder="이름"
          name={"name"}
          value={signUpInfo.name}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="아이디"
          name={"id"}
          value={signUpInfo.id}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          name={"password"}
          value={signUpInfo.password}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="비밀번호 재입력"
          type="password"
          name={"checkPassword"}
          value={signUpInfo.checkPassword}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="이메일 주소"
          name={"email"}
          value={signUpInfo.email}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="휴대폰 번호"
          name={"phone"}
          value={signUpInfo.phone}
          onChange={handleChangeSignUpInfoInput}
        />
        <Input
          placeholder="배달 주소"
          name={"address"}
          value={signUpInfo.address}
          onChange={handleChangeSignUpInfoInput}
        />
      </InputLayer>
      <Button
        onClick={() => {
          console.log(signUpInfo);
					if (checkNotEmptySignUpInfoValue) {
						alert('모든 항목을 채워주세요.');
						return;
					}
          if (signUpInfo.password !== signUpInfo.checkPassword) {
            alert("비밀번호가 서로 다릅니다.");
            return;
          }
        }}
				//disabled={checkNotEmptySignUpInfoValue}
      >
        회원가입
      </Button>
    </MainDiv>
  );
};

export default SignupCus;