import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useState } from 'react';

const MainDiv = styled.div`
  width: 600px;
  margin: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 60px;
  left: 0;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 25px;
  border-bottom: 1px solid black;
`

const TopTextDiv = styled.div`
  margin: 3px 0px;
`

const ContentDiv = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-left: 50px;
`
const Button = styled(Link)`
  padding: 6px 25px;
  border-radius: 20px;
  font-size: 0.8rem;
  line-height: 1.5;
  border: 0px solid black;
  color: white;
  background: black;  
  text-decoration: none;
  color: white;
  :hover{
    background: #262626;
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  padding: 6px 25px;
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
`

const ButtonContainer = styled.div`
  display: flex;
  width: 40%;
  hegith: 100px;
  margin-top: 80px;
  justify-content: space-between;
`


const ModalContainer = styled.div`
  padding: 0px 20px;
  align-items: center;
`


const OrderHistoryDetail = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
 
  return (
    <MainDiv>
      <TopDiv>
        <TopTextDiv>주문번호 : 20221001402</TopTextDiv>
        <TopTextDiv>주문시간 : 10/01 (토) 00시 32분</TopTextDiv>
      </TopDiv>
      <ContentDiv>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '60px'}}>
          <div style={{fontSize: "16px", fontWeight: "700"}}>주문 내역</div>
          <div style={{fontWeight: "400"}}>
            <div style={{fontSize: "15px"}}>프렌치 디너(심플)</div>
            <div style={{fontSize: "14px", color: "#6D6D6D", marginTop: "10px"}}>에그 스크램블 1개</div>
            <div style={{fontSize: "14px", color: "#6D6D6D", marginTop: "5px"}}>와인 1병</div>
          </div>
          <div style={{fontSize: "16px", fontWeight: "700"}}>예약 일자</div>
          <div style={{fontSize: "15px", fontWeight: "400"}}>10월 3일 머시기</div>
          <div style={{fontSize: "16px", fontWeight: "700"}}>주소</div>
          <div style={{fontSize: "15px", fontWeight: "400"}}>서울특별시 동대문구 서울시립대로 163 정보기술관 xxx호</div>
          <div style={{fontSize: "16px", fontWeight: "700"}}>총금액</div>
          <div style={{fontSize: "15px", fontWeight: "400"}}>87,000원</div>
        </div>
      </ContentDiv>
      <ButtonContainer>
        <Button to='/orderedit'>주문 변경</Button>
        <StyledButton onClick={()=> setModalIsOpen(true)}>주문 취소</StyledButton>
        <Modal 
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
          style={{
            content: {
              margin: 'auto',
              width: '300px',
              height: '200px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '0px',
              padding: '50px'
            }
          }}
          isOpen={modalIsOpen}>
            <ModalContainer>
              정말 취소하시겠습니까?
            </ModalContainer>
        </Modal>
      </ButtonContainer>
    </MainDiv>
  );
};
  
  export default OrderHistoryDetail;