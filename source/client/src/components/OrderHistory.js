import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import OrderHistoryItem from './OrderHistoryItem';

const FirstItemContainer = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 150px;
  margin-top: 20px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  text-decoration: none;
  &:visited {
    color: black;
  }
`;

const ItemContainer = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 150px;
  border-bottom: 1px solid lightgray;
  text-decoration: none;
  &:visited {
    color: black;
  }
`;


const OrderHistory = ({menu}) => {

  return (
    <div>
      <FirstItemContainer to='/order-history-detail'>
       <OrderHistoryItem/>
      </FirstItemContainer>
      <ItemContainer to='/order-history-detail'>
        <OrderHistoryItem/>
      </ItemContainer>
      <ItemContainer to='/order-history-detail'>
        <OrderHistoryItem/>
      </ItemContainer>
      <ItemContainer to='/order-history-detail'>
        <OrderHistoryItem/>
      </ItemContainer>
      <ItemContainer to='/order-history-detail'>
        <OrderHistoryItem/>
      </ItemContainer>
    </div>
  );
};

export default OrderHistory;