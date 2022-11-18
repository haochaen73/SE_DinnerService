import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

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
const OrderState = ({state}) => {
  const states = ['대기', '조리', '픽업', '배달', '완료'];
  const statesColor = ['gray', '#F89372', '#E8643A', '#B93D16', 'red'];
  return (
    <OrderStateDiv style={{backgroundColor: `${statesColor[state-1]}`}}>
      {states[state-1]}
    </OrderStateDiv>
  );
}

const OrderItem = ({order, clickOrder}) => {
  return (
    <Container onClick={() => clickOrder(order)}>
      <div>
        <div style={{color: 'white', fontSize: '8px'}}>주문번호 : {order.orderIdx}</div>
        <div style={{marginTop: '5px', color: 'white', fontWeight: '600'}}>
          {order.dinnerList[0].dinnerName}
          {order.dinnerList.length > 1 ? (" 외 "+(order.dinnerList.length - 1)+"개") : null }
        </div>
        <div style={{marginTop: '6px', alignItems: 'center'}}>
          <span style={{color: 'white', fontSize: '12px'}}>
            예약시간
          </span>
          <span style={{marginLeft: '10px', color: 'red', fontSize: '12px', fontWeight: '500'}}>
            {moment(order.deliveredAt).format('MM/DD hh:mm')}
          </span>
        </div>
      </div>
      <OrderState state={order.state}/>
    </Container>
  );
};

export default OrderItem;