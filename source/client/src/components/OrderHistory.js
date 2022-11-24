import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import OrderHistoryItem from './OrderHistoryItem';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/user';
import axios from 'axios';

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 150px;
  border-bottom: 1px solid lightgray;
  text-decoration: none;
  cursor: pointer;
  &:visited {
    color: black;
  }
  &:hover{  
    background-color : #F4F4F4;
  }
`;


const OrderHistory = ({menu}) => {
  const [orders, setOrders] = useState([]);
  const navigator = useNavigate();
  const recoilUser = useRecoilValue(userState);

  const fetchOrderList = async () => {
      try {
        const responseOrderList = await axios.get(`orders/${recoilUser.userIdx} `);
        console.log(responseOrderList.data.result);
        await setOrders(responseOrderList.data.result);
      } catch (e) {

      }
   };

  useEffect(() => {
    //get
    fetchOrderList();
  }, []);

  return (
    <div style={{height: '85vh', overflowY: 'auto'}}>
      {
        orders.length === 0 ? <div style={{display: "flex", height: "100%", justifyContent: "center", alignItems: "center"}}>주문 내역이 없습니다.</div> :
        orders?.map((order) => {
          return (
            <ItemContainer onClick={() => {
              navigator('/order-history-detail', {
                state: {
                  order
                }
              });
            }}>
              <OrderHistoryItem order={order}/>
            </ItemContainer>
          );
        })
      }
    </div>
  );
};

export default OrderHistory;