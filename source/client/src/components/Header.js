import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
import styled, {css} from 'styled-components';
import { userState } from '../recoil/user';

const HeaderDiv = styled.div`
  background-color: black;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  margin-left: 70px;
  height: 20px;
`

const LeftContentDiv = styled.div`
  display: flex;
  color: white;
  font-size: 10px;
  font-weight: 400;
  margin-right: 70px;
`
const MemberDiv = styled.div`
  padding: 20px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
`

const Header = () => {
  const setUserState = useSetRecoilState(userState);
  const me = useRecoilValue(userState);

  const handleLogout = () => {
    setUserState({
      userIdx: '',
      name: '',
      userType: ''
    })
  }

  return (
    <HeaderDiv>
      <StyledLink to='/'>
        <Logo src='images/logo.svg' alt='logo'/>
      </StyledLink>
      {/* 로그인 여부로 나타낼지 안나타낼지 결정*/}
        {(function () {
          if (me?.userIdx != ''){  // 유저 정보가 있는데
            if (me?.userType === 'employee') { //직원일 경우
              return (
                <LeftContentDiv>
                  <div style={{padding: '20px', fontWeight: 'bold'}}>{me?.name || '이수빈'}님</div>
                  <StyledLink to='/' onClick={() => handleLogout()} style={{display: "flex", alignItems: "center", padding: '20px'}}>로그아웃</StyledLink>
                </LeftContentDiv>
                );
            } else { //고객일 경우
              return (
                <LeftContentDiv>
                  <div style={{padding: '20px', fontWeight: 'bold'}}>{me?.name || '이수빈'}님</div>
                  <StyledLink to='/' onClick={() => handleLogout()} style={{display: "flex", alignItems: "center", padding: '20px'}}>로그아웃</StyledLink>
                  <MemberDiv>
                    <StyledLink to='/mypage'>마이페이지</StyledLink>
                  </MemberDiv>
                  <MemberDiv>
                    <StyledLink to='/cart'>장바구니</StyledLink>
                  </MemberDiv>
                </LeftContentDiv>
                );
            }
          } else { //회원가입 및 로그인일 경우
            return <div></div>;
          }
        })()}
        
    </HeaderDiv>
  );
};

export default Header;