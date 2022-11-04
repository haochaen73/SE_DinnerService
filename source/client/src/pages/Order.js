import Button from '../components/Button';
import React from 'react';
import styled, {css} from 'styled-components';
import MenuItem from '../components/MenuItem';

const menulist = [
  {
    id: 1,
    name: '발렌타인 디너',
    price: '51,000원',
    text: '작은 하트 모양과 큐피드가 장식된 접시에 냅킨과 함께 와인과 스테이크'
  },
  {
    id: 2,
    name: '프렌치 디너',
    price: '50,000원',
    text: '커피 한잔 와인 한잔 샐러드 스테이크'
  },
  {
    id: 3,
    name: '잉글리시 디너',
    price: '34,000원',
    text: '에그 스크램블 베이컨 빵 스테이크'
  },
  {
    id: 4,
    name: '샴페인 축제 디너',
    price: '89,000원',
    text: '2인 식사 샴페인 한병 4개의 바게트 빵 커피 한포트 와인 스테이크'
  }
];

const Container = styled.div`

`
const OrderTextDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  color: black;
  font-weight: 500;
  padding: 50px 50px;
  border-bottom: 1px solid lightgray;
`

const MenuDiv = styled.div`
  display: grid;
  padding: 40px 20px;
  grid-template-columns: 1fr 1fr;
  gap: 20px 20px;
`
const Order = () => {
  return (
    <Container>
      <OrderTextDiv>
        <div>주문하기</div>
        <Button text="음성인식"/>
      </OrderTextDiv>
      <MenuDiv>
        {
          menulist?.map((menu) => {
            return <MenuItem key={menu.id} menu={menu}/>;
          })
        }
      </MenuDiv>
    </Container>
  );
};

export default Order;