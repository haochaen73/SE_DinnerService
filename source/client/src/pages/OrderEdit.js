import styled, {css} from 'styled-components';
import React, {useState} from 'react';
import Button from '../components/Button';
import { useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import RadioGroup from '../components/Order/RadioGroup';
import Radio from '../components/Order/Radio';
import Counter from '../components/Order/Counter';

  
const extraInfo = [
  {
    extraNo: 1,
    name: "와인 한 병",
    price: 22000,
  },
  {
    extraNo: 2,
    name: "와인 한 잔",
    price: 7000,
  },
  {
    extraNo: 3,
    name: "스테이크",
    price: 30000,
  },
  {
    extraNo: 4,
    name: "커피 한 잔",
    price: 4000,
  },
  {
    extraNo: 5,
    name: "커피 한 포트",
    price: 9000,
  },
  {
    extraNo: 6,
    name: "샐러드",
    price: 10000,
  },
  {
    extraNo: 7,
    name: "에그 스크램블",
    price: 2000,
  },
  {
    extraNo: 8,
    name: "베이컨",
    price: 1000,
  },
  {
    extraNo: 9,
    name: "샴페인",
    price: 22000,
  },
  {
    extraNo: 10,
    name: "바게트 빵",
    price: 2000,
  },
];

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

// 모달을 위한 코드
const menustyle = [
  { 
    id: 1,
    name: '심플 Simple',
    style: '심플',
    price: 0,
    content: '냅킨 / 플라스틱 쟁반 / 플라스틱 잔 (와인 포함 시)'
  },
  { 
    id: 2,
    name: '그랜드 Grand',
    style: '그랜드',
    price: 1000,
    content: '도자기 접시 / 컵 / 흰색 면 냅킨 / 나무 쟁반'
  },
  { 
    id: 3,
    name: '딜럭스 Deluxe',
    style: '딜럭스',
    price: 2000,
    content: '도자기 접시 / 린넨 냅킨 / 은 쟁반 / 작은 꽃병 (꽃 포함)'
  },
]



const ModalContainer = styled.div`
  padding: 0px 20px;
  align-items: center;
`
const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px lightgray solid;
`
const MidDiv = styled.div`
  padding: 40px 0px;
`
const ExtraDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 10px;
  place-items: center;
  padding-bottom: 40px;
`
const RadioChild = ({style}) => {
  return (
    <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
      <span style={{margin: '5px 10px', fontSize: '12px', fontWeight: '400'}}>{style.name} (+ {style.price}원)</span>
      <span style={{margin: '10px', fontSize: '8px', color: 'gray'}}>{style.content}</span>
    </span>
  );
}

const Dinner = ({dinner}) => {

  const [checkedStyle, setCheckedStyle] = useState(dinner.style);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [extraList, setExtraList] = useState(dinner.extraList);
  const [amount, setAmount] = useState(1);

  const styleHandler = (e) => {
    setCheckedStyle(e.target.value);
  }

  const onChangeProps = (id, key, value) => {
    if (value >= 0 && value <= 10) {
      setExtraList(prevState => {
        return prevState.map(obj => {
          if (obj.extraNo === id) {
            return { ...obj, [key]: value };
          } else {
            return { ...obj };
          }
        });
      });
    }
  };

  const makeDinnerList = (dinnerName, style, amount, extraList) => {
    let dinnerPrice = 0;
    extraList.map((extra) => {
      dinnerPrice += extra.amount * extraInfo[extra.extraNo - 1].price;
    })
    if (style === "그랜드") dinnerPrice += 1000;
    else if (style === "딜럭스") dinnerPrice += 2000;

    const dinnerList = {
      dinnerName: dinnerName,
      style: style,
      amount: amount,
      dinnerPrice: dinnerPrice,
      extraList: extraList
    }
    console.log(dinnerList);
  }

  const resetExtra = () => {
    setExtraList(dinner.extraList);
  }

  return(
    <div>
      <OrderDetail>
      <div style={{marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{fontSize: '14px', fontWeight: '600'}}>{dinner.dinnerName}&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span style={{fontSize: '10px', fontWeight: '500'}}>{dinner.style}</span>
        </div>
      </div>
      {
        dinner.extraList.map((extra, index) => {
          if (extra.amount > 0){
            return (<div key={index} style={{marginBottom: '5px', fontSize: '12px', color: 'gray'}}>
              {extraInfo[extra.extraNo + 1].name}&nbsp;{extra.amount}개
            </div>);
          }
        })
      }
      <div style={{marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: '14px', fontWeight: '600'}}>{dinner.dinnerPrice}원</div>
        <Button onClick={()=> setModalIsOpen(true)}>수정하기</Button>
      </div>
    </OrderDetail>
    <Modal 
          ariaHideApp={false}
          style={{
            content: {
              margin: '0 auto',
              width: '500px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '0px',
              padding: '50px'
            }
          }}
          isOpen={modalIsOpen}>
            <ModalContainer>
              <TopDiv>
                <span style={{fontWeight: 'bold', fontSize: '15px'}}>{dinner.dinnerName}</span>
                <CloseIcon 
                  style={{cursor: 'pointer'}} 
                  onClick={ ()=> {
                    setModalIsOpen(false);
                    resetExtra();
                  }}/>
              </TopDiv>
              <MidDiv>
                <div style={{fontWeight: 'bold', fontSize: '14px', paddingBottom: '25px'}}>추가 선택</div>
                <ExtraDiv>
                  {extraList.map((extra) => {
                    return (<Counter key={extra.extraNo} extraInfo={extraInfo[extra.extraNo - 1]} extra={extra} onChangeProps={onChangeProps}/>);
                  })
                  }
                  {/* 임의로.. */}
                </ExtraDiv>
                <div style={{fontWeight: 'bold', fontSize: '14px', paddingBottom: '25px'}}>스타일 선택</div>
                <div>
                  <RadioGroup>
                    <Radio name="style" value="심플" 
                      defaultChecked={dinner.style === "심플" ? true : false} 
                      disabled={dinner.dinnerName === "샴페인 축제 디너" ? true : false} 
                      onChange={styleHandler}>
                      <RadioChild style={menustyle[0]}/>
                    </Radio>
                    <Radio name="style" value="그랜드" 
                      defaultChecked={dinner.style === "그랜드" ? true : false}
                      onChange={styleHandler} >
                      <RadioChild style={menustyle[1]}/>
                    </Radio>
                    <Radio name="style" value="딜럭스"
                      defaultChecked={dinner.style === "딜럭스" ? true : false}
                      onChange={styleHandler}>
                      <RadioChild style={menustyle[2]}/>
                    </Radio>
                  </RadioGroup>
                </div>
              </MidDiv>
              <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <Button onClick={() =>{
                  resetExtra();
                  makeDinnerList(dinner.dinnerName, checkedStyle, 1, extraList);
                  setModalIsOpen(false);
                }}>
                  수정하기
                </Button>
              </div>
            </ModalContainer>
        </Modal>
    </div>
  );
}

const makeOrder = (userIdx, dinnerList, totalPrice) =>
{
  const order = {
    userIdx: userIdx,
    totalPrice: totalPrice,
    dinnerList: dinnerList
  }
  console.log(order);
  return order;
}

const OrderEdit = () => {
  const cusTotalPrice = 100000; //단골인지
  const nav = useNavigate();
  const location = useLocation();
  const order = location.state.order;

  const [totalPrice, setTotalPrice] = useState(0);
  const [dinnerList, setDinnerList] = useState(DinnerListData);

  const deleteDinner = () => {
  
  }

  useEffect(() => {
    const totalPrice = dinnerList.reduce((acc, obj) => {
      return (acc += obj.dinnerPrice);
    }, 0);
    setTotalPrice(cusTotalPrice > 100000 ? (totalPrice + 3000 - 2000) : totalPrice + 3000);
  }, [dinnerList])


  return (
    <div>
      <CartTextDiv>주문 변경</CartTextDiv>
      <CartContainer>
        <div>
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
        </div>
        <div>
          <MembershipBox>
            회원님은
            <span style={{marginLeft: '5px', fontWeight: 'bold'}}>
              {cusTotalPrice > 100000 ? "단골 고객" : "일반 고객"}
            </span>
            입니다.
          </MembershipBox>
          <Box>
            <BoxHeadSpan>결제금액</BoxHeadSpan>
            <div>
              <PayDetail>
                <div>주문금액</div>
                <div>{totalPrice - 3000}원</div>
              </PayDetail>
              <PayDetail>
                <div>단골할인</div>
                <div style={{color: 'red'}}>{cusTotalPrice > 100000 ? "-2000원" : "0원"}</div>
              </PayDetail>
              <PayDetail>
                <div>배달비</div>
                <div>3000원</div>
              </PayDetail>
            </div>
            <div style={{marginTop: '20px', borderBottom: '1px solid lightgray'}}></div>
            <TotalPrice>
              <div>총 결제금액</div>
              <div>{totalPrice}원</div>
            </TotalPrice>
            <Button onClick={() => {
              const order = makeOrder(1, dinnerList, totalPrice);
              nav('/ordermodifycomplete', {
                state: {
                  order
                }
              });
            }
            }>결제하기</Button>
          </Box>
        </div>
      </CartContainer>
    </div>
  );
};
  
  export default OrderEdit;