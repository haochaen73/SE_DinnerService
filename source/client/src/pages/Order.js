import Button from '../components/Button';
import React, { useState, useEffect } from 'react';
import styled, {css} from 'styled-components';
import MenuItem from '../components/Order/MenuItem';
import MicIcon from '@mui/icons-material/Mic';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { useSpeechRecognition } from 'react-speech-kit';

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

const ModalContainer = styled.div`
  padding: 0px 20px;
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dinner, setDinner] = useState();
  const [value, setValue] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      // 음성인식 결과가 value에 저장
      setValue(result);
    }
  });

  useEffect(() => {
    if(modalIsOpen === true) {
      listen({ interimResults: false });
    }
  }, [modalIsOpen]);

  useEffect(() => {
    const listenDinner = async () => {
      try{
        if (value.includes("발렌타인 디너") || value.includes("발렌타인")) {
          stop(); // 마이크 off 
          await setTimeout(() => {
            setValue("");
            setModalIsOpen(false);
          }, 2000);
          setTimeout(() => {
            setDinner('발렌타인 디너')
          }, 2000);
        } else if (value.includes("프렌치 디너") || value.includes("프렌치")) {
          stop();
          await setTimeout(() => {
            setValue("");
            setModalIsOpen(false);
          }, 2000);
          setTimeout(() => {
            setDinner('프렌치 디너')
          }, 2000);
        } else if (value.includes("잉글리시 디너") || value.includes("잉글리시")) {
          stop();
          await setTimeout(() => {
            setValue("");
            setModalIsOpen(false);
          }, 2000);
          setTimeout(() => {
            setDinner('잉글리시 디너')
          }, 2000);
        } else if (value.includes("샴페인 축제 디너") || value.includes("샴페인 축제")) {
          stop();
          await setTimeout(() => {
            setValue("");
            setModalIsOpen(false);
          }, 2000);
          setTimeout(() => {
            setDinner('샴페인 축제 디너')
          }, 2000);
        } 
      } catch(e) {
      }
    }
    listenDinner();
    console.log(dinner);
  }, [value]);

  const resetDinner = () => {
    setDinner();
  }

  return (
    <Container>
      <OrderTextDiv>
        <div>주문하기</div>
        <Button onClick={()=> setModalIsOpen(true)}>
          <div style={{display: 'flex', alignItems: 'center', gap: '5px', margin: '5px 0px', justifyContent: 'space-between'}}>
            <MicIcon sx={{fontSize : '18px'}}/>
            <div>음성인식</div>
          </div>
        </Button>
        <Modal 
          onRequestClose={() => {
            setValue("");
            setModalIsOpen(false);
            stop();
          }}
          ariaHideApp={false}
          style={{
            content: {
              margin: 'auto',
              width: '500px',
              height: '300px',
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
              <CloseIcon sx={{position: 'absolute', top: '30px', right: '30px', cursor: 'pointer'}} 
                onClick={() => {
                  setValue("");
                  setModalIsOpen(false);
                  stop();
              }}/>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{fontSize: '16px', marginTop: '20px'}}>원하는 디너를 말해주세요.</div>
                <div style={{color: 'gray', fontSize: '12px', marginTop: '10px'}}>발렌타인 디너 / 프렌치 디너 / 잉글리시 디너 / 샴페인 축제 디너</div>
                <MicIcon sx={{fontSize: '150px', marginTop: '15px'}}/>
                {listening && <div>인식 중...</div>}
                <div style={{fontWeight: '600', marginTop: '25px'}}>{value}</div>
              </div>
            </ModalContainer>
        </Modal>
      </OrderTextDiv>
      <MenuDiv>
        {
          menulist?.map((menu) => {
            console.log(dinner);
            return <MenuItem key={menu.id} menu={menu} dinner={dinner} resetDinner={resetDinner}/>;
          })
        }
      </MenuDiv>
    </Container>
  );
};

export default Order;