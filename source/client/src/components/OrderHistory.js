import React, { useState } from 'react';
import styled from 'styled-components';
import OrderHistoryItem from './OrderHistoryItem';

const FirstItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 150px;
  margin-top: 20px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 150px;
  border-bottom: 1px solid lightgray;
`;


const OrderHistory = ({menu}) => {

  return (
    <div>
      <FirstItemContainer>
       <OrderHistoryItem></OrderHistoryItem>
      </FirstItemContainer>
      <ItemContainer>
        <OrderHistoryItem></OrderHistoryItem>
      </ItemContainer>
      <ItemContainer>
        <OrderHistoryItem></OrderHistoryItem>
      </ItemContainer>
    </div>
  );
};

export default OrderHistory;