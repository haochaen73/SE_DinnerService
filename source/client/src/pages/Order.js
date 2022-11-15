import Button from '../components/Button';
import React from 'react';
import styled, {css} from 'styled-components';
import MenuItem from '../components/Order/MenuItem';

const menulist = [
  {
    id: 1,
    dinnerName: '발렌타인 디너',
    price: '52,000원',
    text: '와인 한 병 / 스테이크',
    extraList: [
      {
        extraNo : 1,
        amount : 1
      },
      {
        extraNo : 2,
        amount : 0
      },
      {
        extraNo : 3,
        amount : 1
      },
      {
        extraNo : 4,
        amount : 0
      },
      {
        extraNo : 5,
        amount : 0
      },
      {
        extraNo : 6,
        amount : 0
      },
      {
        extraNo : 7,
        amount : 0
      },
      {
        extraNo : 8,
        amount : 0
      },
      {
        extraNo : 9,
        amount : 0
      },
      {
        extraNo : 10,
        amount : 0
      }
    ]
  },
  {
    id: 2,
    dinnerName: '프렌치 디너',
    price: '51,000원',
    text: '커피 한 잔 / 와인 한 잔 / 샐러드 / 스테이크',
    extraList: [
      {
        extraNo : 1,
        amount : 0
      },
      {
        extraNo : 2,
        amount : 1
      },
      {
        extraNo : 3,
        amount : 1
      },
      {
        extraNo : 4,
        amount : 1
      },
      {
        extraNo : 5,
        amount : 0
      },
      {
        extraNo : 6,
        amount : 1
      },
      {
        extraNo : 7,
        amount : 0
      },
      {
        extraNo : 8,
        amount : 0
      },
      {
        extraNo : 9,
        amount : 0
      },
      {
        extraNo : 10,
        amount : 0
      }
    ]
  },
  {
    id: 3,
    dinnerName: '잉글리시 디너',
    price: '35,000원',
    text: '에그 스크램블 / 베이컨 / 바게트 빵 / 스테이크',
    extraList: [
      {
        extraNo : 1,
        amount : 0
      },
      {
        extraNo : 2,
        amount : 0
      },
      {
        extraNo : 3,
        amount : 1
      },
      {
        extraNo : 4,
        amount : 0
      },
      {
        extraNo : 5,
        amount : 0
      },
      {
        extraNo : 6,
        amount : 0
      },
      {
        extraNo : 7,
        amount : 1
      },
      {
        extraNo : 8,
        amount : 1
      },
      {
        extraNo : 9,
        amount : 0
      },
      {
        extraNo : 10,
        amount : 1
      }
    ]
  },
  {
    id: 4,
    dinnerName : '샴페인 축제 디너',
    price: '91,000원',
    text: '와인 한 병 / 스테이크 / 샴페인 한 병 / 바게트 빵 4개 / 커피 한 포트',
    extraList: [
      {
        extraNo : 1,
        amount : 1
      },
      {
        extraNo : 2,
        amount : 0
      },
      {
        extraNo : 3,
        amount : 1
      },
      {
        extraNo : 4,
        amount : 0
      },
      {
        extraNo : 5,
        amount : 1
      },
      {
        extraNo : 6,
        amount : 0
      },
      {
        extraNo : 7,
        amount : 0
      },
      {
        extraNo : 8,
        amount : 0
      },
      {
        extraNo : 9,
        amount : 1
      },
      {
        extraNo : 10,
        amount : 4
      }
    ]
  }
];

const Container = styled.div`

`
const OrderTextDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
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
        <Button>음성인식</Button>
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