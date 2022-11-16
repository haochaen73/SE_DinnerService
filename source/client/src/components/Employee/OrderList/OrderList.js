import React from 'react';
import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import OrderItem from './OrderItem';
import OrderDetail from './OrderDetail';

const jsonaccept = `{
  "isSuccess": true,
  "code": 1000,
  "message": "요청에 성공하였습니다.",
  "result": [
      {
          "orderIdx": 30,
          "userIdx" : 2,
          "phoneNum" : "010-1111-1111",
          "address" : "서울시 동대문구 서울시립대로 163", 
          "deliveredAt": "2022-11-16 17:00:00",
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
              },
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
          "orderIdx": 47,
          "userIdx" : 11,
          "phoneNum" : "010-1111-1111",
          "address" : "서울시 동대문구 서울시립대로 163", 
          "deliveredAt": "2022-11-11 12:00:00",
          "createdAt": "2022-11-15 12:57:08",
          "state": 1,
          "dinnerList": [
              {
                  "dinnerName": "프렌치 디너",
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
      }
  ]
}`

const jsonprepare = `
{
  "isSuccess": true,
  "code": 1000,
  "message": "요청에 성공하였습니다.",
  "result": [
      {
          "orderIdx": 30,
          "userIdx" : 2,
          "phoneNum" : "010-1111-1111",
          "address" : "서울시 동대문구 서울시립대로 163",
          "deliveredAt": "2022-11-11 12:00:00",
          "createdAt": "2022-11-15 12:57:08",
          "state": 2,
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
              },
              {
                  "dinnerName": "발렌타인 디너",
                  "style": "심플",
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
          "orderIdx": 47,
          "userIdx" : 11,
          "phoneNum" : "010-1111-1111",
          "address" : "서울시 동대문구 서울시립대로 163",
          "deliveredAt": "2022-11-11 12:00:00",
          "createdAt": "2022-11-15 12:57:08",
          "state": 3,
          "dinnerList": [
              {
                  "dinnerName": "프렌치 디너",
                  "style": "그랜드",
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
          "orderIdx": 49,
          "userIdx" : 11,
          "phoneNum" : "010-1111-1111",
          "address" : "서울시 동대문구 서울시립대로 163",
          "deliveredAt": "2022-11-11 12:00:00",
          "createdAt": "2022-11-15 12:57:08",
          "state": 4,
          "dinnerList": [
              {
                  "dinnerName": "프렌치 디너",
                  "style": "그랜드",
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
      }
  ]
}`

const jsondone = `
{
  "isSuccess": true,
  "code": 1000,
  "message": "요청에 성공하였습니다.",
  "result": [
      {
          "orderIdx": 30,
          "userIdx" : 2,
          "phoneNum" : "010-1111-1111",
          "address" : "서울시 동대문구 서울시립대로 163",
          "deliveredAt": "2022-11-11 12:00:00",
          "createdAt": "2022-11-15 12:57:08",
          "state": 5,
          "dinnerList": [
              {
                  "dinnerName": "Valentine",
                  "style": "Deluxe",
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
              },
              {
                  "dinnerName": "Valentine",
                  "style": "Deluxe",
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
          "orderIdx": 47,
          "userIdx" : 11,
          "phoneNum" : "010-1111-1111",
          "address" : "서울시 동대문구 서울시립대로 163",
          "deliveredAt": "2022-11-11 12:00:00",
          "createdAt": "2022-11-15 12:57:08",
          "state": 5,
          "dinnerList": [
              {
                  "dinnerName": "Valentine",
                  "style": "Deluxe",
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
      }
  ]
}`

const accept = JSON.parse(jsonaccept);
const prepare = JSON.parse(jsonprepare);
const done = JSON.parse(jsondone);

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ height: '90vh', backgroundColor: '#2B2B2B', marginTop: '-1px', overflowY: 'auto' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

`
const OrderList = () => {
  const [value, setValue] = useState(0);
  const [orderListAccept, setOrderListAccept] = useState(accept.result);
  const [orderListPrepare, setOrderListPrepare] = useState(prepare.result);
  const [orderListDone, setOrderListDone] = useState(done.result);
  const [orderDetail, setOrderDetail] = useState();

  const clickOrder = useCallback((order) => {
    setOrderDetail(order);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box sx={{ width: '100%', marginTop: '-1px', backgroundColor: '#2B2B2B' }}>
        <Box sx={{ position: 'sticky', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange}
            textColor="white" 
            aria-label="basic tabs example"
            variant="fullWidth"
            sx={{
              textColor: 'white',
              '& .MuiTabs-indicator': { backgroundColor: '#F46335' },
              '& .MuiTab-root': { backgroundColor: '#2B2B2B', color: 'white' },
              '& .Mui-selected': { color: '#F46335' },
            }}
          >
            <Tab label="접수" {...a11yProps(0)} />
            <Tab label="준비" {...a11yProps(1)} />
            <Tab label="완료" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {orderListAccept?.map((order) => {
            return <OrderItem order={order} clickOrder={clickOrder}/>;
          })}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {orderListPrepare?.map((order) => {
              return <OrderItem order={order} clickOrder={clickOrder}/>;
          })}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {orderListDone?.map((order) => {
            return <OrderItem order={order} clickOrder={clickOrder}/>;
          })}
        </TabPanel>
      </Box>
      {orderDetail ? <OrderDetail order={orderDetail}/> : null}
    </Container>
  );
};

export default OrderList;