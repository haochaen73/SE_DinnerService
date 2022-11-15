import React, { useState } from 'react';
import styled from 'styled-components';


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

const OrderHistoryItem = () => {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "85%",
        margin: "0 auto"
      }}
    >
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
          <div style={{ fontSize: "14px" }}>프렌치 디너</div>
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
          <div style={{ fontSize: "14px" }}>10/03 (월) 14:00</div>
        </TextItem>
      </TextContainer>
      <StateContainer>
        <div
          style={{
            fontSize: "17px",
            fontWeight: "bold",
            margin: "auto",
            paddingRight: "13px",
          }}
        >
          주문 접수
        </div>
      </StateContainer>
    </div>
  );
};
  
export default OrderHistoryItem;