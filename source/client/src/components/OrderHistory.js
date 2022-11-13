import React from 'react';
import styled, {css} from 'styled-components';
import Button from './Button';


const FirstItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 150px;
    margin-top: 20px;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
`

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 150px;
    border-bottom: 1px solid lightgray;
`

const TextContainer = styled.div`
    display: flex; 
    flex-direction: column;
    height: 70px;
    justify-content: space-between;
    padding: 10px;
    margin: 10px;
`


const TextItem = styled.div`
    display: flex; 
    flex-direction: row;
    width: 300px;
`

const ButtonContainer = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: space-between;
    height: 80px;
    padding: 10px;
`

const StyledButton = styled.button`
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 0.8rem;
  line-height: 1.5;
  border: 0px solid red;
  color: white;
  background: #D25656;  
  text-decoration: none;
  color: white;
  :hover{
    background: #E08484;
    cursor: pointer;
  }
`;


const OrderHistory = () => {
    return (
      <div>
        <FirstItemContainer>
          <TextContainer>
            <TextItem>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginRight: "30px",
                }}
              >
                주문 내역
              </div>
              <div style={{ fontSize: "14px" }}>프렌치 디너</div>
            </TextItem>
            <TextItem>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginRight: "30px",
                }}
              >
                예약 시간
              </div>
              <div style={{ fontSize: "14px" }}>10/03 (월) 14:00</div>
            </TextItem>
          </TextContainer>
          <ButtonContainer>
            <Button>주문 변경</Button>
            <StyledButton>주문 취소</StyledButton>
          </ButtonContainer>
        </FirstItemContainer>
        <ItemContainer>
          <TextContainer>
            <TextItem>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginRight: "30px",
                }}
              >
                주문 내역
              </div>
              <div style={{ fontSize: "14px" }}>잉글리쉬 디너</div>
            </TextItem>
            <TextItem>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginRight: "30px",
                }}
              >
                예약 시간
              </div>
              <div style={{ fontSize: "14px" }}>07/12 (월) 19:00</div>
            </TextItem>
          </TextContainer>
          <ButtonContainer>
            <div
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                margin: "auto",
                paddingRight: "13px",
              }}
            >
              배달 완료
            </div>
          </ButtonContainer>
        </ItemContainer>
        <ItemContainer>
          <TextContainer>
              <TextItem>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginRight: "30px",
                  }}
                >
                  주문 내역
                </div>
                <div style={{ fontSize: "14px" }}>잉글리쉬 디너</div>
              </TextItem>
              <TextItem>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginRight: "30px",
                  }}
                >
                  예약 시간
                </div>
                <div style={{ fontSize: "14px" }}>07/12 (월) 19:00</div>
              </TextItem>
            </TextContainer>
            <ButtonContainer>
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  margin: "auto",
                  paddingRight: "13px",
                }}
              >
                배달 완료
              </div>
            </ButtonContainer>
        </ItemContainer>
        <ItemContainer>
          <TextContainer>
              <TextItem>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginRight: "30px",
                  }}
                >
                  주문 내역
                </div>
                <div style={{ fontSize: "14px" }}>잉글리쉬 디너</div>
              </TextItem>
              <TextItem>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    marginRight: "30px",
                  }}
                >
                  예약 시간
                </div>
                <div style={{ fontSize: "14px" }}>07/12 (월) 19:00</div>
              </TextItem>
            </TextContainer>
            <ButtonContainer>
              <div
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  margin: "auto",
                  paddingRight: "13px",
                }}
              >
                배달 완료
              </div>
            </ButtonContainer>
        </ItemContainer>
      </div>
    );
};

export default OrderHistory;