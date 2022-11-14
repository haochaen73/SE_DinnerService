import React, {useState} from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import CloseIcon from '@mui/icons-material/Close';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

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

const DinnerListData = [
  { 
      dinnerName : "발렌타인 디너",
      style : "심플",
      amount : 1,
      dinnerPrice: 30000,
      extraList : [
          {
              extraNo : 1,
              amount : 2
          },
          { 
              extraNo : 2,
              amount : 2
          },
          { 
              extraNo : 3,
              amount : 0
          },
          { 
              extraNo : 4,
              amount : 0
          },
          { 
              extraNo : 5,
              amount : 2
          },
          { 
              extraNo : 6,
              amount : 2
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
    dinnerName : "샴페인 축제 디너",
    style : "그랜드",
    amount : 2,
    dinnerPrice: 20000,
      extraList : [
          { 
              extraNo : 1,
              amount : 2
          },
          { 
              extraNo : 2,
              amount : 2
          },
          { 
              extraNo : 3,
              amount : 0
          },
          { 
              extraNo : 4,
              amount : 0
          },
          { 
              extraNo : 5,
              amount : 2
          },
          { 
              extraNo : 6,
              amount : 2
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
  }
]

const CartTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: black;
  font-weight: 500;
  padding: 50px 50px;
  //border-bottom: 1px solid lightgray;
`
const CartContainer = styled.div`
  display: grid;
  padding: 0px 20px;
  grid-template-columns: 2fr 1fr;
  gap: 20px 20px;
`
const SDatePicker = styled(DatePicker)`
  border-radius: 20px;
  border: 1px solid black;
  padding: 10px 10px;
  font-weight: 500;
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 40px;
  margin-bottom: 20px;
`
const MembershipBox = styled.div`
  display: flex;
  justify-content: center;
  background: black;
  color: white;
  font-weight: 400;
  padding: 30px;
  margin-bottom: 20px;
`
const BoxHeadSpan = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 30px;
`
const OrderDetail = styled.div`
  border: 1px solid lightgray;
  padding: 30px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Input = styled.input`
    border: 1px solid #212121;
    padding: 12px 4px;
    margin: 5px;
    box-sizing: border-box;
    border-radius: 5px;
`;

const PayDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
  font-size: 14px;
`
const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  margin: 30px 0px;
`
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
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

const Dinner = ({dinner}) => {
  console.log(dinner);
  return(
    <OrderDetail>
      <div style={{marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{fontSize: '14px', fontWeight: '600'}}>{dinner.dinnerName}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style={{fontSize: '10px', fontWeight: '500'}}>{dinner.style}</span>
        </div>
        <CloseIcon sx={{ fontSize: 14, cursor: 'pointer' }}/>
      </div>
      {
        dinner.extraList.map((extra) => {
          if (extra.amount > 0){
            return (<div style={{marginBottom: '5px', fontSize: '12px', color: 'gray'}}>
              +{extraInfo[extra.extraNo + 1].name}&nbsp;{extra.amount}개
            </div>);
          }
        })
      }
      <div style={{marginTop: '30px', fontSize: '14px', fontWeight: '600'}}>{dinner.dinnerPrice}원</div>
    </OrderDetail>
  );
}

const Cart = () => {
  const [startDate, setStartDate] = useState(setMinutes(new Date(), 0));
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const [dinnerList, setDinnerList] = useState(DinnerListData);

  const deleteDinner = () => {
  
  }

  return (
    <div>
      <CartTextDiv>장바구니</CartTextDiv>
      <CartContainer>
        <div>
          <Box>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr'}}>
              <BoxHeadSpan>날짜 선택</BoxHeadSpan>
              <SDatePicker
                locale={ko}
                closeOnScroll={true} // 스크롤 하면 선택box 닫히게
                selected={startDate} // 처음에 맨 위에 표시된 input에 나오는게 지금 날짜
                onChange={(date) => setStartDate(date)} // 내가 선택한 날짜가 맨 위에 표시 됨
                showTimeSelect // 시간 나오게 하기
                timeFormat="HH:mm" //시간 포맷 
                timeIntervals={60} // 15분 단위로 선택 가능한 box가 나옴
                minTime={setHours(setMinutes(new Date(), 0), 15)}
                maxTime={setHours(setMinutes(new Date(), 0), 21)}
                minDate={new Date()}
                filterTime={filterPassedTime}
                dateFormat="MM/dd aa hh:mm"
              />
            </div>
          </Box>
          <Box>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr'}}>
              <BoxHeadSpan>주문 정보</BoxHeadSpan>
              <div>
                {dinnerList ? dinnerList?.map((dinner, index) => {
                  return <Dinner key={index} dinner={dinner}/>;
                  }) : <div>장바구니가 비었습니다.</div>
                }
              </div>
            </div>
          </Box>
          <Box>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr'}}>
              <BoxHeadSpan>배송 정보</BoxHeadSpan>
              <div>
                <div style={{marginBottom: '15px', fontSize: '14px', fontWeight: '600'}}>전화번호</div>
                <div style={{marginBottom: '15px', fontSize: '14px', fontWeight: '400'}}>010-1234-5678</div>
                <div style={{marginBottom: '15px', fontSize: '14px', fontWeight: '600'}}>주소</div>
                <div style={{fontSize: '15px', fontWeight: '400'}}>서울특별시 동대문구 서울시립대로 163 정보기술관</div>
              </div>
            </div>
          </Box>
          <Box>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr'}}>
              <BoxHeadSpan>결제 정보</BoxHeadSpan>
              <Input
                name='creditcard'
                type='number'
                placeholder='신용카드번호'
              />
            </div>
          </Box>
        </div>
        <div>
          <MembershipBox>
            회원님은
            <span style={{marginLeft: '5px', fontWeight: 'bold'}}>단골 고객</span>
            입니다.
          </MembershipBox>
          <Box>
            <BoxHeadSpan>결제금액</BoxHeadSpan>
            <div>
              <PayDetail>
                <div>주문금액</div>
                <div>52000원</div>
              </PayDetail>
              <PayDetail>
                <div>단골할인</div>
                <div style={{color: 'red'}}>-2000원</div>
              </PayDetail>
              <PayDetail>
                <div>배달비</div>
                <div>3000원</div>
              </PayDetail>
            </div>
            <div style={{marginTop: '20px', borderBottom: '1px solid lightgray'}}></div>
            <TotalPrice>
              <div>총 결제금액</div>
              <div>53000원</div>
            </TotalPrice>
            <Button>결제하기</Button>
          </Box>
        </div>
      </CartContainer>
    </div>
  );
};

export default Cart;