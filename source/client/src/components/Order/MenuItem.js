import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Counter from './Counter';
import RadioGroup from './RadioGroup';
import Radio from './Radio';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/user';

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

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 40px;
`

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
      <span style={{margin: '5px 10px', fontSize: '12px', fontWeight: '400'}}>{style.name} (+ {style.price.toLocaleString()}원)</span>
      <span style={{margin: '10px', fontSize: '8px', color: 'gray'}}>{style.content}</span>
    </span>
  );
}

const MenuItem = ({menu, dinner, resetDinner}) => {
  console.log(dinner);
  console.log(menu.dinnerName);
  let style = "심플";
  if (menu.id === 4){
    style = "그랜드"
  }

  const recoilUser = useRecoilValue(userState);

  const [checkedStyle, setCheckedStyle] = useState(style);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [extraList, setExtraList] = useState(menu.extraList);

  const styleHandler = (e) => {
    setCheckedStyle((prev) => e.target.value);
    console.log(checkedStyle);
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

  const makeDinnerList = (userIdx, dinnerName, style, amount, extraList) => {
    let dinnerPrice = 0;
    extraList.map((extra) => {
      dinnerPrice += extra.amount * extraInfo[extra.extraNo - 1].price;
    })
    if (style === "그랜드") dinnerPrice += 1000;
    else if (style === "딜럭스") dinnerPrice += 2000;

    const dinnerList = {
      userIdx: userIdx,
      dinnerName: dinnerName,
      style: style,
      amount: amount,
      dinnerPrice: dinnerPrice,
      extraList: extraList
    }
    return dinnerList;
  }

  const resetExtra = () => {
    setExtraList(menu.extraList);
  }

  const putCart = async () => {
    try {
      console.log(recoilUser.userIdx);
      const dinnerList = makeDinnerList(recoilUser.userIdx, menu.dinnerName, checkedStyle, 1, extraList);
      const response = await axios.post('/carts/save', dinnerList);
      console.log(response);
    } catch (e) {
    }
    resetExtra();
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (dinner === menu.dinnerName) {
      console.log(dinner);
      setModalIsOpen(true);
    }
  }, [dinner])

  return (
    <MenuBox>
      <div style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '30px'}}>{menu.dinnerName}</div>
      <div style={{fontSize: '12px', color: 'gray', marginBottom: '20px'}}>{menu.text}</div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: '15px', fontWeight: 'bold'}}>{menu.price}</div>
        <Button onClick={()=> setModalIsOpen(true)}>주문하기</Button>
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
                <span style={{fontWeight: 'bold', fontSize: '15px'}}>{menu.dinnerName}</span>
                <span style={{color: 'gray', fontSize: '12px'}}>{menu.text}</span>
                <CloseIcon 
                  style={{cursor: 'pointer'}} 
                  onClick={ ()=> {
                    resetDinner();
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
                </ExtraDiv>
                <div style={{fontWeight: 'bold', fontSize: '14px', paddingBottom: '25px'}}>스타일 선택</div>
                <div>
                  <RadioGroup>
                    <Radio name="style" value="심플" 
                      defaultChecked={menu.id !== 4 ? true : false} 
                      disabled={menu.id === 4 ? true : false}
                      onChange={styleHandler}>
                      <RadioChild style={menustyle[0]}/>
                    </Radio>
                    <Radio name="style" value="그랜드" 
                      defaultChecked={menu.id === 4 ? true : false}
                      onChange={styleHandler} >
                      <RadioChild style={menustyle[1]}/>
                    </Radio>
                    <Radio name="style" value="딜럭스"
                      onChange={styleHandler}>
                      <RadioChild style={menustyle[2]}/>
                    </Radio>
                  </RadioGroup>
                </div>
              </MidDiv>
              <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <Button onClick={() => {putCart();}}>
                  장바구니 담기
                </Button>
              </div>
            </ModalContainer>
        </Modal>
      </div>
    </MenuBox>
  );
};

export default MenuItem;