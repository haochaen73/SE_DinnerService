import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import OrderHistoryItem from './OrderHistoryItem';

const json = `{
  "isSuccess": true,
  "code": 1000,
  "message": "요청에 성공하였습니다.",
  "result": [
      {
          "orderIdx": 30,
          "deliveredAt": "2022-11-11 12:00:00",
          "createdAt": "2022-11-15 12:57:08",
          "state": 1,
          "dinnerList": [
              {
                  "dinnerName": "발렌타인 디너",
                  "style": "딜럭스",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 1
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 0
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 0
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              }
          ]
      },
      {
          "orderIdx": 32,
          "deliveredAt": "2022-11-18 12:00:00",
          "createdAt": "2022-11-17 15:03:37",
          "state": 1,
          "dinnerList": [
              {
                  "dinnerName": "발렌타인 디너",
                  "style": "심플",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              },
              {
                  "dinnerName": "샴페인 축제 디너",
                  "style": "그랜드",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              }
          ]
      },
      {
          "orderIdx": 32,
          "deliveredAt": "2022-11-18 12:00:00",
          "createdAt": "2022-11-17 15:03:37",
          "state": 1,
          "dinnerList": [
              {
                  "dinnerName": "발렌타인 디너",
                  "style": "심플",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              },
              {
                  "dinnerName": "샴페인 축제 디너",
                  "style": "그랜드",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              }
          ]
      },
      {
          "orderIdx": 32,
          "deliveredAt": "2022-11-18 12:00:00",
          "createdAt": "2022-11-17 15:03:37",
          "state": 1,
          "dinnerList": [
              {
                  "dinnerName": "발렌타인 디너",
                  "style": "심플",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              },
              {
                  "dinnerName": "샴페인 축제 디너",
                  "style": "그랜드",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              }
          ]
      },
      {
          "orderIdx": 32,
          "deliveredAt": "2022-11-18 12:00:00",
          "createdAt": "2022-11-17 15:03:37",
          "state": 1,
          "dinnerList": [
              {
                  "dinnerName": "발렌타인 디너",
                  "style": "심플",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              },
              {
                  "dinnerName": "샴페인 축제 디너",
                  "style": "그랜드",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              }
          ]
      },
      {
          "orderIdx": 32,
          "deliveredAt": "2022-11-18 12:00:00",
          "createdAt": "2022-11-17 15:03:37",
          "state": 1,
          "dinnerList": [
              {
                  "dinnerName": "발렌타인 디너",
                  "style": "심플",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              },
              {
                  "dinnerName": "샴페인 축제 디너",
                  "style": "그랜드",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              }
          ]
      },
      {
          "orderIdx": 32,
          "deliveredAt": "2022-11-18 12:00:00",
          "createdAt": "2022-11-17 15:03:37",
          "state": 1,
          "dinnerList": [
              {
                  "dinnerName": "발렌타인 디너",
                  "style": "심플",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              },
              {
                  "dinnerName": "샴페인 축제 디너",
                  "style": "그랜드",
                  "amount": 1,
                  "extraList": [
                      {
                          "extraName": "와인(병)",
                          "amount": 2
                      },
                      {
                          "extraName": "와인(잔)",
                          "amount": 2
                      },
                      {
                          "extraName": "스테이크",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(잔)",
                          "amount": 0
                      },
                      {
                          "extraName": "커피(포트)",
                          "amount": 2
                      },
                      {
                          "extraName": "샐러드",
                          "amount": 2
                      },
                      {
                          "extraName": "에그 스크램블",
                          "amount": 0
                      },
                      {
                          "extraName": "베이컨",
                          "amount": 0
                      },
                      {
                          "extraName": "샴페인(병)",
                          "amount": 0
                      },
                      {
                          "extraName": "바게트 빵",
                          "amount": 0
                      }
                  ]
              }
          ]
      }
  ]
}`

const FirstItemContainer = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 150px;
  margin-top: 20px;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  text-decoration: none;
  &:visited {
    color: black;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 150px;
  border-bottom: 1px solid lightgray;
  text-decoration: none;
  cursor: pointer;
  &:visited {
    color: black;
  }
  &:hover{  
    background-color : #F4F4F4;
  }
`;


const OrderHistory = ({menu}) => {
  const [orders, setOrders] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    //get
    setOrders(JSON.parse(json).result);
  }, []);

  return (
    <div style={{height: '85vh', overflowY: 'auto'}}>
      {
        orders === [] ? <div>주문 내역이 없습니다.</div> :
        orders?.map((order) => {
          return (
            <ItemContainer onClick={() => {
              navigator('/order-history-detail', {
                state: {
                  order
                }
              });
            }}>
              <OrderHistoryItem order={order}/>
            </ItemContainer>
          );
        })
      }
    </div>
  );
};

export default OrderHistory;