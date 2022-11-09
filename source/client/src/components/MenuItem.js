import React from 'react';
import styled, {css} from 'styled-components';
import Button from './Button';
import Modal from 'react-modal';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Counter from './Counter';

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

const MenuItem = ({menu}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
                  {/* 임의로.. */}
                  <Counter count={0} />
                  <Counter count={0} />
                  <Counter count={0} />
                  <Counter count={0} />
                  <Counter count={0} />
                  <Counter count={0} />
                  <Counter count={0} />
                  <Counter count={0} />
                </ExtraDiv>
                <div style={{fontWeight: 'bold', fontSize: '14px', paddingBottom: '25px'}}>스타일 선택</div>
                <StyleDiv>

                </StyleDiv>
              </MidDiv>
              <Button text="장바구니 담기" onClick={()=> setModalIsOpen(false)}/>

            </ModalContainer>
        </Modal>
      </div>
    </MenuBox>
  );
};

export default MenuItem;