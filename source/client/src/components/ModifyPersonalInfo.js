import React from 'react';
import styled, {css} from 'styled-components';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from './Button';
import { flexbox } from '@mui/system';

const personalInfoData = {
    name : '김하람',
    id : 'alicehrk',
    pw : 'Password23#',
    email : 'alicehrk@naver.com',
    phoneNum : '010-2592-1629',
    membership : '일반 등급',
    address : '서울특별시 망우로 30'
}

const ModifyButton = styled.button`
  padding: 4px 12px;
  border-radius: 3px;
  font-size: 0.8rem;
  line-height: 1.5;
  border: 0px solid #8B8B8B;
  color: white;
  background: #8B8B8B;  
  text-decoration: none;
  color: white;
  :hover{
    background: #787777;
    cursor: pointer;
  }
`

// Input창 넣고 싶으면 StyledInput 태그 사용하기
const StyledInput = styled.input.attrs({ type: 'text' })`
  text-align: center;
  width: 80px;
`

const TitleContainer = styled.div`
  width: 600px;
  margin: auto;
  margin-top: 30px;
  display: flex;
`

const MainTableContainer = styled.div`
  width: 600px;
  margin: auto;
  margin-top: 20px;
`
const StyledButton = styled.button`
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 0.8rem;
  line-height: 1.5;
  border: 0px solid red;
  color: white;
  background: #D25656;  
  text-decoration: none;
  color: white;
  :hover{
    background: #E08484;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 200px;
  flex-direction: row;
  margin: auto;
  margin-top: 30px;
  justify-content: space-between;
`


const ModifyPersonalInfo = () => {
    const[personalInfo, setPersonalInfo] = useState(personalInfoData);

    return (
      <div>
        <TitleContainer>
          <img src='./images/right_arrow.svg' alt='right arrow' width={10} />
          <h1 style={{ paddingLeft: "5px" }}>기본정보</h1>
        </TitleContainer>
        <MainTableContainer>
          <TableContainer>
            <Table aria-label="simple table" >
              <TableBody>
                {/* 이름 */}
                <TableRow
                  key={personalInfo.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      width: "50px",
                      padding: "0px 60px",
                      fontWeight: "bold",
                      background: "#F7F7F7",
                      borderTop: 1,
                    }}
                    component="th"
                    scope="row"
                  >
                    이름
                  </TableCell>

                  <TableCell sx={{ borderTop: 1, paddingLeft: "20px"}} >
                    {personalInfo.name}
                  </TableCell>
                </TableRow>

                {/* 아이디 */}
                <TableRow
                  key={personalInfo.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      padding: "0px 60px",
                      fontWeight: "bold",
                      background: "#F7F7F7",
                    }}
                    component="th"
                    scope="row"
                  >
                    아이디
                  </TableCell>
                  <TableCell sx={{ paddingLeft: "20px"}}>{personalInfo.id}</TableCell>
                </TableRow>

                {/* 비밀번호 */}
                <TableRow
                  key={personalInfo.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      padding: "0px 60px",
                      fontWeight: "bold",
                      background: "#F7F7F7",
                    }}
                    component="th"
                    scope="row"
                  >
                    비밀번호
                  </TableCell>
                  <TableCell sx={{ paddingLeft: "20px"}}><ModifyButton style={{display: "flex", justifyContent: "center"}}>비밀번호 변경</ModifyButton></TableCell>
                </TableRow>

                {/* 이메일 */}
                <TableRow
                  key={personalInfo.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      padding: "0px 60px",
                      fontWeight: "bold",
                      background: "#F7F7F7",
                    }}
                    component="th"
                    scope="row"
                  >
                    이메일
                  </TableCell>
                  <TableCell sx={{ paddingLeft: "20px"}}>{personalInfo.email}</TableCell>
                </TableRow>

                {/* 전화번호 */}
                <TableRow
                  key={personalInfo.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      padding: "0px 60px",
                      fontWeight: "bold",
                      background: "#F7F7F7",
                    }}
                    component="th"
                    scope="row"
                  >
                    전화번호
                  </TableCell>
                  <TableCell sx={{ paddingLeft: "20px"}}>{personalInfo.phoneNum}</TableCell>
                </TableRow>

                {/* 회원등급 */}
                <TableRow
                  key={personalInfo.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      padding: "0px 60px",
                      fontWeight: "bold",
                      background: "#F7F7F7",
                    }}
                    component="th"
                    scope="row"
                  >
                    회원등급
                  </TableCell>
                  <TableCell sx={{ paddingLeft: "20px"}}>
                    {personalInfo.membership}
                  </TableCell>
                </TableRow>

                {/* 주소 */}
                <TableRow key={personalInfo.name}>
                  <TableCell
                    sx={{
                      padding: "0px 60px",
                      fontWeight: "bold",
                      background: "#F7F7F7",
                      borderBottom: 1,
                    }}
                    component="th"
                    scope="row"
                  >
                    주소
                  </TableCell>
                  <TableCell sx={{ borderBottom: 1, paddingLeft: "20px"}}>
                    {personalInfo.address}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </MainTableContainer>
        <ButtonContainer>
          <StyledButton>수정하기</StyledButton>
          <Button>수정완료</Button>
        </ButtonContainer>
      </div>
    );
};
    
export default ModifyPersonalInfo;