import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Modal from 'react-modal';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Counter from './Counter';
import RadioGroup from './RadioGroup';
import Radio from './Radio';

const menustyle = [
  { 
    id: 1,
    name: '심플 Simple',
    price: 0,
    content: '냅킨 / 플라스틱 쟁반 / 플라스틱 잔 (와인 포함 시)'
  },
  { 
    id: 2,
    name: '그랜드 Grand',
    price: 1000,
    content: '도자기 접시 / 컵 / 흰색 면 냅킨 / 나무 쟁반'
  },
  { 
    id: 3,
    name: '딜럭스 Deluxe',
    price: 2000,
    content: '도자기 접시 / 린넨 냅킨 / 은 쟁반 / 작은 꽃병 (꽃 포함)'
  },
]

const extramenu = [
  {
    extraNo : 1,
    name : '와인 한 병',
    price : 22000,
    amount : 0
  },
  {
    extraNo : 2,
    name : '와인 한 잔',
    price : 7000,
    amount : 0
  },
  {
    extraNo : 3,
    name : '스테이크',
    price : 30000,
    amount : 0
  },
  {
    extraNo : 4,
    name : '커피 한 잔',
    price : 4000,
    amount : 0
  },
  {
    extraNo : 5,
    name : '커피 한 포트',
    price : 9000,
    amount : 0
  },
  {
    extraNo : 6,
    name : '샐러드',
    price : 10000,
    amount : 0
  },
  {
    extraNo : 7,
    name : '에그 스크램블',
    price : 2000,
    amount : 0
  },
  {
    extraNo : 8,
    name : '베이컨',
    price : 1000,
    amount : 0
  },
  {
    extraNo : 9,
    name : '샴페인',
    price : 22000,
    amount : 0
  },
  {
    extraNo : 10,
    name : '바게트 빵',
    price : 2000,
    amount : 0
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
const StyleDiv = styled.div`

`
const RadioChild = ({style}) => {
  return (
    <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
      <span style={{margin: '5px 10px', fontSize: '12px', fontWeight: '400'}}>{style.name} (+ {style.price}원)</span>
      <span style={{margin: '10px', fontSize: '8px', color: 'gray'}}>{style.content}</span>
    </span>
  );
}

const MenuItem = ({menu}) => {

  let style = "simple";
  if (menu.id === 4){
    style = "grand"
  }

  const [checkedStyle, setCheckedStyle] = useState(style);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [extraMenu, setExtraMenu] = useState(extramenu);

  const styleHandler = (e) => {
    setCheckedStyle(e.target.value);
    console.log(checkedStyle);
  }

  const onChangeProps = (id, key, value) => {
    //console.log(id);
    setExtraMenu(prevState => {
      return prevState.map(obj => {
        if (obj.extraNo === id) {
          return { ...obj, [key]: value };
        } else {
          return { ...obj };
        }
      });
    });
  };

  return (
    <MenuBox>
      <div style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '30px'}}>{menu.name}</div>
      <div style={{fontSize: '12px', color: 'gray', marginBottom: '20px'}}>{menu.text}</div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: '15px', fontWeight: 'bold'}}>{menu.price}</div>
        <Button text="주문하기" onClick={()=> setModalIsOpen(true)}/>
        <Modal 
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
                <span style={{fontWeight: 'bold', fontSize: '15px'}}>{menu.name}</span>
                <span style={{color: 'gray', fontSize: '12px'}}>{menu.text}</span>
                <CloseIcon style={{cursor: 'pointer'}} onClick={()=> setModalIsOpen(false)}/>
              </TopDiv>
              <MidDiv>
                <div style={{fontWeight: 'bold', fontSize: '14px', paddingBottom: '25px'}}>추가 선택</div>
                <ExtraDiv>
                  {extraMenu.map((extra) => {
                    return (<Counter key={extra.extraNo} extra={extra} onChangeProps={onChangeProps}/>);
                  })
                  }
                  {/* 임의로.. */}
                </ExtraDiv>
                <div style={{fontWeight: 'bold', fontSize: '14px', paddingBottom: '25px'}}>스타일 선택</div>
                <StyleDiv>
                  <RadioGroup>
                    <Radio name="style" value="simple" 
                      defaultChecked={menu.id !== 4 ? true : false} 
                      disabled={menu.id === 4 ? true : false}
                      onChange={styleHandler}>
                      <RadioChild style={menustyle[0]}/>
                    </Radio>
                    <Radio name="style" value="grand" 
                      defaultChecked={menu.id === 4 ? true : false}
                      onChange={styleHandler} >
                      <RadioChild style={menustyle[1]}/>
                    </Radio>
                    <Radio name="style" value="deluxe"
                      onChange={styleHandler}>
                      <RadioChild style={menustyle[2]}/>
                    </Radio>
                  </RadioGroup>
                </StyleDiv>
              </MidDiv>
              <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <Button text="장바구니 담기" onClick={()=> setModalIsOpen(false)}/>
              </div>
            </ModalContainer>
        </Modal>
      </div>
    </MenuBox>
  );
};

export default MenuItem;