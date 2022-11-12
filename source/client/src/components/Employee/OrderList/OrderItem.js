import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #808080;
  cursor: pointer;
  &:hover{  
    background-color : #444444;
  }
`
const OrderStateDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  color: white;
  width: 55px;
  height: 55px;
  font-size: 13px;
  font-weight: bold;
  background-color: gray;
`
const OrderState = ({text, }) => {
  return (
    <OrderStateDiv>
      {text}
    </OrderStateDiv>
  );
}
const OrderItem = ({order, clickOrder}) => {
  return (
    <Container onClick={clickOrder}>
      <div>
        <div style={{color: 'white', fontSize: '8px'}}>주문번호 : 1</div>
        <div style={{marginTop: '5px', color: 'white', fontWeight: '600'}}>
          발렌타인 디너
        </div>
        <div style={{marginTop: '6px'}}>
          <span style={{color: 'white', fontSize: '12px'}}>
            예약시간
          </span>
          <span style={{marginLeft: '10px', color: 'red', fontSize: '12px', fontWeight: '500'}}>
            10/01 14:00
          </span>
        </div>
      </div>
      <OrderStateDiv>대기</OrderStateDiv>
    </Container>
  );
};

export default OrderItem;