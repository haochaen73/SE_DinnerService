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
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

// const extraInfo = [
//   {
//     extraNo : 1,
//     name : '와인 한 병',
//     price : 22000,
//   },
//   {
//     extraNo : 2,
//     name : '와인 한 잔',
//     price : 7000,
//   },
//   {
//     extraNo : 3,
//     name : '스테이크',
//     price : 30000,
//   },
//   {
//     extraNo : 4,
//     name : '커피 한 잔',
//     price : 4000,
//   },
//   {
//     extraNo : 5,
//     name : '커피 한 포트',
//     price : 9000,
//   },
//   {
//     extraNo : 6,
//     name : '샐러드',
//     price : 10000,
//   },
//   {
//     extraNo : 7,
//     name : '에그 스크램블',
//     price : 2000,
//   },
//   {
//     extraNo : 8,
//     name : '베이컨',
//     price : 1000,
//   },
//   {
//     extraNo : 9,
//     name : '샴페인',
//     price : 22000,
//   },
//   {
//     extraNo : 10,
//     name : '바게트 빵',
//     price : 2000,
//   }
// ]

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
  ::-webkit-inner-spin-button{
      -webkit-appearance: none; 
      margin: 0; 
  }
  ::-webkit-outer-spin-button{
      -webkit-appearance: none; 
      margin: 0; 
  }    
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

const Dinner = ({dinner, onDelete}) => {
  return(
    <OrderDetail>
      <div style={{marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{fontSize: '14px', fontWeight: '600'}}>{dinner.dinnerName}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style={{fontSize: '10px', fontWeight: '500'}}>{dinner.style}</span>
        </div>
        <CloseIcon 
          sx={{cursor: 'pointer'}} 
          onClick={() => {
            //console.log(dinner.cartIdx);
            onDelete(dinner.cartIdx);
          }
            /*delete -> setdinnerlist -> cart post*/}/>
      </div>
      {
        dinner.extraList?.map((extra, index) => {
          if (extra.amount > 0){
            return (<div key={index} style={{marginBottom: '5px', fontSize: '12px', color: 'gray'}}>
              {extra.extraName}&nbsp;{extra.amount}개
            </div>);
          }
        })
      }
      <div style={{marginTop: '30px', fontSize: '14px', fontWeight: '600'}}>{dinner.dinnerPrice.toLocaleString()}원</div>
    </OrderDetail>
  );
}

const makeOrder = (userIdx, deliveredAt, cardNum, dinnerList, totalPrice) =>
{
  const makeDinnerList = dinnerList.map((dinner) => {
    const makeExtraList = dinner.extraList.map((extra, index) => {
      return {
        extraNo: index+1,
        amount: extra.amount
      }
    })
    return {
      dinnerName: dinner.dinnerName,
      style: dinner.style,
      amount: dinner.amount,
      dinnerPrice: dinner.dinnerPrice,
      extraList: makeExtraList
    }
  })
  const order = {
    userIdx: userIdx,
    deliveredAt: moment(deliveredAt).format('YYYY-MM-DD HH:mm:ss'),
    cardNum: cardNum,
    totalPrice: totalPrice,
    dinnerList: makeDinnerList
  }
  console.log(order);
  return order;
}

const Cart = () => {
  const cusTotalPrice = 100000; //단골인지
  const navigator = useNavigate();

  //날짜선택
  const [startDate, setStartDate] = useState(0);
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [cardNum, setCardNum] = useState('');
  const [dinnerList, setDinnerList] = useState([]);
  const [user, setUser] = useState();

  const inputCardNum = useCallback((event) => {
    setCardNum(event.target.value);
  }, []);

  const deleteDinner = async (cartIdx) => {
    try {
      const response = await axios.delete(`carts/delete/${cartIdx}`);
      await setDinnerList(prevState => {
        return prevState.filter(dinner => cartIdx !== dinner.cartIdx)
      });
      console.log(dinnerList);
      alert(response.data.result);
    } catch (e) {

    }
  }
  
  const fetchCart = async () => {
    try {
      const responseCart = await axios.get('carts/1');
      const responseUser = await axios.get('users/1');
      console.log(responseCart.data.result);
      console.log(responseUser.data.result);
      await setUser(responseUser.data.result);
      await setDinnerList(responseCart.data.result);

      const totalPrice = dinnerList.reduce((acc, obj) => {
        return (acc += obj.dinnerPrice);
      }, 0);
      setTotalPrice(user.totalPrice > 100000 ? (totalPrice - 2000) : totalPrice);
    } catch (e) {

    }
  };

  useEffect(() => {
    //cart get -> setdinnerlist(맨첨실행됐을때)
    fetchCart();
  }, [])

  useEffect(() => {
    const totalPrice = dinnerList.reduce((acc, obj) => {
      return (acc += obj.dinnerPrice);
    }, 0);
    
    setTotalPrice(user?.totalPrice > 100000 ? (totalPrice - 2000) : totalPrice);
  }, [dinnerList])


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
                timeIntervals={60} // 60분 단위로 선택 가능한 box가 나옴
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
                
                {dinnerList.length !== 0 ? dinnerList?.map((dinner, index) => {
                  return <Dinner key={index} dinner={dinner} onDelete={deleteDinner}/>;
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
                <div style={{marginBottom: '15px', fontSize: '14px', fontWeight: '400'}}>{user?.phoneNum}</div>
                <div style={{marginBottom: '15px', fontSize: '14px', fontWeight: '600'}}>주소</div>
                <div style={{fontSize: '14px', fontWeight: '400'}}>{user?.address}</div>
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
                onChange={inputCardNum}
              />
            </div>
          </Box>
        </div>
        <div>
          <MembershipBox>
            회원님은
            <span style={{marginLeft: '5px', fontWeight: 'bold'}}>
              {user?.totalPrice > 100000 ? "단골 고객" : "일반 고객"}
            </span>
            입니다.
          </MembershipBox>
          <Box>
            <BoxHeadSpan>결제금액</BoxHeadSpan>
            <div>
              <PayDetail>
                <div>주문금액</div>
                <div>{totalPrice?.toLocaleString()}원</div>
              </PayDetail>
              <PayDetail>
                <div>단골할인</div>
                <div style={{color: 'red'}}>{cusTotalPrice > 100000 ? "-2,000원" : "0원"}</div>
              </PayDetail>
              <PayDetail>
                <div>배달비</div>
                <div>{totalPrice === 0 ? "0원": "3,000원"}</div>
              </PayDetail>
            </div>
            <div style={{marginTop: '20px', borderBottom: '1px solid lightgray'}}></div>
            <TotalPrice>
              <div>총 결제금액</div>
              <div>{totalPrice === 0 ? 0 : (totalPrice + 3000).toLocaleString()}원</div>
            </TotalPrice>
            <Button onClick={async () => {
              if (totalPrice !== 0) {
                if (startDate === 0) {
                  alert('날짜를 선택하세요.');
                  return;
                }
                if (cardNum === '') {
                  alert('신용카드 번호를 입력하세요.');
                  return;
                }
                const order = makeOrder(1, startDate, cardNum, dinnerList, totalPrice + 3000);
                //order post
                const response = await axios.post('/orders/order', order);
                console.log(response);
                if(response.data.isSuccess){
                  navigator('/ordercomplete', {
                    state: {
                      order,
                      user
                    }
                  });
                } else {
                  alert('결제를 실패했습니다.')
                  return;
                }
              } else {
                alert('장바구니 목록이 존재하지 않습니다.');
                return;
              }
            }
            }>결제하기</Button>
          </Box>
        </div>
      </CartContainer>
    </div>
  );
};

export default Cart;