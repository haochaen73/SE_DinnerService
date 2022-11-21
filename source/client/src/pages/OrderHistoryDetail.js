import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useState } from 'react';
import moment from 'moment';

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
const Button = styled.div`
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  justify-content: center;
  align-items: center;
`

const DinnerContent = ({dinner}) => {
  console.log(dinner.dinnerName);
  return (
    <div style={{marginBottom: '15px'}}>
      <div style={{fontSize: '15px'}}>{dinner.dinnerName}({dinner.style})</div>
      {
        dinner.extraList.map((extra) => {
          if (extra.amount > 0){
            return(
            <div style={{ fontSize: "14px", color: "#6D6D6D", marginTop: "5px" }}>{extra.extraName}&nbsp;{extra.amount}개</div>
            );
          }
        })
      }
      
    </div>
  );
}

const OrderHistoryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [order] = useState(() => location.state?.order);  // 이거 이렇게 안하면 작동 안함
 
  return (
    <MainDiv>
      <TopDiv>
        <TopTextDiv>주문번호 : {order?.orderIdx}</TopTextDiv>
        <TopTextDiv>주문시간 : {moment(order?.createdAt).format('MM/DD hh시 mm분')}</TopTextDiv>
      </TopDiv>
      <ContentDiv>
        <div style={{display: "grid", gridTemplateColumns: "1fr 3fr", gap: "60px"}}>
          <div style={{ fontSize: "16px", fontWeight: "700" }}>주문 내역</div>
          <div style={{ fontWeight: "400" }}>
            {
              order?.dinnerList?.map((dinner, index) => {
                console.log(dinner);
                return <DinnerContent key={index} dinner={dinner}/>;
              })
            }
          </div>
          <div style={{ fontSize: "16px", fontWeight: "700" }}>예약 일자</div>
          <div style={{ fontSize: "15px", fontWeight: "400" }}>
            {moment(order?.deliveredAt).format('MM/DD hh시 mm분')}
          </div>
          <div style={{ fontSize: "16px", fontWeight: "700" }}>주소</div>
          <div style={{ fontSize: "15px", fontWeight: "400" }}>
            {/* //TODO: user정보가 없어서 못받아온다고 생각했는데, 혹시 받아올 수 있는 방법이 있나? */}
            서울특별시 동대문구 서울시립대로 163 정보기술관 xxx호
          </div>
          <div style={{ fontSize: "16px", fontWeight: "700" }}>총금액</div>
          <div style={{ fontSize: "15px", fontWeight: "400" }}>87,000원</div>
        </div>
      </ContentDiv>
      <ButtonContainer>
        <Button onClick={() => {
          console.log(order);
          navigate('/orderedit', {
            state: {
              orderIdx: order.orderIdx,
            }
          });
        }}>주문 변경</Button>
        <StyledButton onClick={() => setModalIsOpen(true)}>
          주문 취소
        </StyledButton>
        <Modal
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
          style={{
            content: {
              margin: "auto",
              width: "280px",
              height: "140px",
              border: "1px solid #ccc",
              background: "#fff",
              WebkitOverflowScrolling: "touch",
              borderRadius: "8px",
            },
          }}
          isOpen={modalIsOpen}
        >
          <ModalContainer>
            <div style={{ fontSize: "20px" }}>정말 취소하시겠습니까?</div>
            <div style={{ display: "flex", gap: "32px" }}>
              <Button
                style={{
                  minWidth: "80px",
                  boxSizing: "border-box",
                  textAlign: "center",
                }}
                onClick={(e) => {
                  // TODO: 취소 요청 백엔드로 보내기
                  e.preventDefault();
                  navigate('/mypage');
                }}
              >
                예
              </Button>
              <Button
                style={{ backgroundColor: "#D25656" }}
                onClick={() => setModalIsOpen(false)}
              >
                아니오
              </Button>
            </div>
          </ModalContainer>
        </Modal>
      </ButtonContainer>
    </MainDiv>
  );
};
  
  export default OrderHistoryDetail;