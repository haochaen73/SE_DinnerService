import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  padding: 100px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const OrderInfoContainer = styled.div`
  margin: 60px 0px;
  padding: 40px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: repeat(2, max-content);
  gap: 10px 20px;
  font-size: 15px;
`
const StyledLink = styled(Link)`
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 0.8rem;
  line-height: 1.5;
  border: 1px solid black;
  color: white;
  background: black;  
  text-decoration: none;
  color: white;
  :hover{
    background: #262626;
  }
`
const OrderComplete = () => {
  return (
    <Div>
      <div style={{fontSize: '32px', fontWeight:'bold', marginBottom: '20px'}}>주문이 완료되었습니다.</div>
      <div style={{fontSize: '14px', color: 'gray'}}>주문내역 확인은 마이페이지의 '주문내역조회'에서 하실 수 있습니다.</div>
      <OrderInfoContainer>
          <div style={{fontWeight: 'bold'}}>예약일자</div>
          <div>2022-10-06 14:00</div>
          <div style={{fontWeight: 'bold'}}>배송정보</div>
          <div>
            <div>010-1234-5678</div>
            <div style={{marginTop: '5px'}}>서울특별시 동대문구 서울시립대로 163 정보기술관</div>
          </div>
      </OrderInfoContainer>
      <StyledLink to='/'>
        메인페이지로 이동
      </StyledLink>
    </Div>
  );
};

export default OrderComplete;