import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

const extraInfo = [
  {
    extraNo : 1,
    name : '와인 한 병',
    price : 22000,
  },
  {
    extraNo : 2,
    name : '와인 한 잔',
    price : 7000,
  },
  {
    extraNo : 3,
    name : '스테이크',
    price : 30000,
  },
  {
    extraNo : 4,
    name : '커피 한 잔',
    price : 4000,
  },
  {
    extraNo : 5,
    name : '커피 한 포트',
    price : 9000,
  },
  {
    extraNo : 6,
    name : '샐러드',
    price : 10000,
  },
  {
    extraNo : 7,
    name : '에그 스크램블',
    price : 2000,
  },
  {
    extraNo : 8,
    name : '베이컨',
    price : 1000,
  },
  {
    extraNo : 9,
    name : '샴페인',
    price : 22000,
  },
  {
    extraNo : 10,
    name : '바게트 빵',
    price : 2000,
  }
]

const Div = styled.div`
  padding: 100px;
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
  margin: 20px;
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
const OrderModifyComplete = () => {
  const location = useLocation();

  const deliveredAt = moment(location.state.postOrder.deliveredAt).format('YYYY-MM-DD HH:mm');
  const dinnerList = location.state.postOrder.dinnerList;
  const totalPrice = location.state.postOrder.totalPrice;
  const user = location.state.user;

  return (
    <Div>
      <div style={{fontSize: '32px', fontWeight:'bold', marginBottom: '20px'}}>주문 변경이 완료되었습니다.</div>
      <div style={{fontSize: '14px', color: 'gray'}}>주문내역 확인은 마이페이지의 '주문내역조회'에서 하실 수 있습니다.</div>
      <OrderInfoContainer>
          <div style={{fontWeight: 'bold'}}>주문정보</div>
          <div>
            {
              dinnerList?.map((dinner, index) => {
                return (
                    <div style={{marginBottom: '15px', fontWeight: "400"}}>
                      <div style={{marginBottom: '10px', fontSize: "15px"}}>{dinner.dinnerName}&nbsp;({dinner.style})</div>
                      {
                        dinner.extraList.map((extra, index) => {
                          if (extra.amount > 0){
                            return (<div key={index} style={{marginLeft: '5px', marginBottom: '5px', fontSize: '12px', color: 'gray'}}>
                              {extraInfo[extra.extraNo - 1].name}&nbsp;{extra.amount}개
                            </div>);
                          }
                        })
                      }
                    </div>
                )
              })
            }
          </div>
          <div style={{marginBottom: '10px',fontSize: "16px", fontWeight: "700"}}>예약일자</div>
          <div style={{fontSize: "15px", fontWeight: "400"}}>{deliveredAt}</div>
          <div style={{fontSize: "16px", fontWeight: "700"}}>배송정보</div>
          <div style={{fontSize: "15px", fontWeight: "400"}}>
            <div>{user.phoneNum}</div>
            <div style={{marginBottom: '10px', marginTop: '5px'}}>{user.address}</div>
          </div>
          <div style={{marginBottom: '10px',fontSize: "16px", fontWeight: "700"}}>결제금액</div>
          <div style={{fontSize: "15px", fontWeight: "400"}}>{totalPrice}원</div>
      </OrderInfoContainer>
      <StyledLink to='/'>
        메인페이지로 이동
      </StyledLink>
    </Div>
  );
};

export default OrderModifyComplete;