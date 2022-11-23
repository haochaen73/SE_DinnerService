import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../recoil/user';

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

const ModifyPassword = () => {
	const [passwordInfo, setPasswordInfo] = useState({
    prevPassword: '',
		password1: '',
		password2: ''
	});
  const [checkPrevPassword, setCheckPrevPassword] = useState(false);
  const me = useRecoilValue(userState);
	const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;
  const navigate = useNavigate();
  
	const passwordCheck = (passwordInfo) => {
		return passwordRegEx.test(passwordInfo.password1);
	}

	const handleChangePassword = (e) => {
		const { name, value } = e.target;
		setPasswordInfo((prev) => ({ ...prev, [name]: value }));
	}

  const handleClickCheckEqualButton = async () => {
    const res = await axios.post("users/password/equal", {
      userIdx: me.userIdx,
      password: passwordInfo.prevPassword
    });
    if (res.data.isSuccess) {
      alert('확인이 완료되었습니다.');
      setCheckPrevPassword(true);
    } else {
      alert('다시 확인해 주세요');
    }
  }

  const handleClickSignupButton = async () => {
    const res = await axios.patch("users/modify/password", {
      userIdx: me.userIdx,
      ...passwordInfo
    });
    if (res.data.isSuccess) {
      alert('변경이 완료되었습니다.');
      navigate('/mypage')
    } else {
      alert('무슨 문제가 생겨버림');
    }
  }

  return (
    <MainDiv>
      <div style={{ fontWeight: 700, fontSize: 32 }}>비밀번호 변경</div>
      <InputLayer>
        <div style={{ display: "flex", gap: 32 }}>
          <Input
            placeholder="기존 비밀번호"
            type="password"
            name={"prevPassword"}
            value={passwordInfo.prevPassword}
            onChange={handleChangePassword}
          />
          <Button
            onClick={handleClickCheckEqualButton}
            //disabled={checkNotEmptySignUpInfoValue}
          >
            무슨 문구
          </Button>
        </div>
        <Input
          placeholder="새 비밀번호"
          type="password"
          name={"password1"}
          value={passwordInfo.password1}
          onChange={handleChangePassword}
        />
        <Input
          placeholder="비밀번호 재입력"
          type="password"
          name={"password2"}
          value={passwordInfo.password2}
          onChange={handleChangePassword}
        />
      </InputLayer>
      <Button
        onClick={() => {
          if (!checkPrevPassword) {
            alert('기존 비밀번호부터 확인해 주세요.');
            return;
          }
          if (!passwordCheck(passwordInfo.password1)) {
            alert(
              "비밀번호를 형식에 맞춰 입력해주세요.\n최소 8자 + 최소 한개의 영문자 + 최소 한개의 숫자 + 최소 한개의 특수 문자"
            );
            return;
          }
          if (passwordInfo.password1 !== passwordInfo.password2) {
            alert("비밀번호가 서로 다릅니다.");
            return;
          }
          handleClickSignupButton();
        }}
        //disabled={checkNotEmptySignUpInfoValue}
      >
        수정하기
      </Button>
    </MainDiv>
  );
};

export default ModifyPassword;