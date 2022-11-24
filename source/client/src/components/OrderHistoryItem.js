import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin: 0 auto;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
`;

const TextItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
`;

const StateContainer = styled.div`
  display: flex; 
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
  padding: 10px;
  
`
const OrderState = ({state}) => {
  const states = ['주문 취소', '주문 대기', '조리 중', '픽업', '배달 중', '배달 완료'];
  return (
    <div style={{ fontSize: "17px", fontWeight: "bold", margin: "auto", paddingRight: "13px" }}>
      {states[state]}
    </div>
  );
}

const OrderHistoryItem = ({order}) => {

  return (
    <ItemContainer>
      <TextContainer>
        <TextItem>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              marginRight: "30px",
            }}
          >
            주문 내역
          </div>
          <div style={{ fontSize: "14px" }}>
            {order.dinnerList[0]?.dinnerName}
            {order.dinnerList?.length > 1 ? (" 외 "+(order.dinnerList.length - 1)+"개") : null }
          </div>
        </TextItem>
        <TextItem>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              marginRight: "30px",
            }}
          >
            예약 시간
          </div>
          <div style={{ fontSize: "14px" }}>{moment(order.deliveredAt).format('MM/DD HH:mm')}</div>
        </TextItem>
      </TextContainer>
      <StateContainer>
        <OrderState state={order.state}/>
      </StateContainer>
    </ItemContainer>
  );
};
  
export default OrderHistoryItem;