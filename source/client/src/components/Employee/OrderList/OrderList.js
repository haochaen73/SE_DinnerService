import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import OrderItem from './OrderItem';
import OrderDetail from './OrderDetail';
import axios from 'axios';


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
// text 받아서 고걸로 되게 해보자
// const deleteOrder = async (orderIdx) => {
//   try{
//     const response = await axios.patch(`/orders/${orderIdx}/delete`)
//     console.log(response)
//     alert(response.data.result);
//   } catch(e) {

//   }
// }

// const startOrder = async (orderIdx) => {
//   try{
//     const response = await axios.patch(`/orders/${orderIdx}/start`)
//     console.log(response)
//     alert(response.data.result);
//   } catch(e) {

//   }
// }

// const completeOrder = async (orderIdx) => {
//   try{
//     const response = await axios.patch(`/orders/${orderIdx}/complete`)
//     console.log(response)
//     alert(response.data.result);
//   } catch(e) {

//   }
// }

// const deliverOrder = async (orderIdx) => {
//   try{
//     const response = await axios.patch(`/orders/${orderIdx}/deliver`)
//     console.log(response)
//     alert(response.data.result);
//   } catch(e) {

//   }
// }

const patchOrder = async (orderIdx, state) => {
  try{
    const response = await axios.patch(`/orders/${orderIdx}/${state}`);
    console.log(response)
    //alert(response.data.result);
  } catch(e) {

  }
}

const OrderList = () => {
  const [value, setValue] = useState(0);
  const [orderListAccept, setOrderListAccept] = useState();
  const [orderListPrepare, setOrderListPrepare] = useState();
  const [orderListDone, setOrderListDone] = useState();
  const [orderDetail, setOrderDetail] = useState();

  const clickOrder = useCallback((order) => {
    setOrderDetail(order);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchAccept = async () => {
      try {
          const response = await axios.get('/orders/accept');
          setOrderListAccept(response.data.result);
      } catch (e) {
      }
  };

  const fetchPrepare = async () => {
    try {
        const response = await axios.get('/orders/prepare');
        setOrderListPrepare(response.data.result);
    } catch (e) {
    }
  };

  const fetchDone = async () => {
      try {
          const response = await axios.get('/orders/done');
          setOrderListDone(response.data.result);
      } catch (e) {
      }
  };

  const changeState = async (orderIdx, state, button) => {
    console.log(orderIdx);
    console.log(button);
    if (state === 1){
      if (button === '주문 취소') {
        await patchOrder(orderIdx, 'cancel');
      }
      else if (button === '조리 시작'){
        await patchOrder(orderIdx, 'start');
      }
      fetchAccept();
    } else {
      if (button === '조리 완료') {
        await patchOrder(orderIdx, 'complete');
      }
      else if (button === '배달 시작'){
        await patchOrder(orderIdx, 'deliver');
      }
      else if (button === '배달 완료'){
        await patchOrder(orderIdx, 'done');
      }
      fetchPrepare();
    }
  }

  useEffect(() => {
    fetchAccept();
  }, []);

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
            <Tab label="접수" {...a11yProps(0)} onClick={() => { fetchAccept(); setOrderDetail(); }}/>
            <Tab label="준비" {...a11yProps(1)} onClick={() => { fetchPrepare(); setOrderDetail(); }}/>
            <Tab label="완료" {...a11yProps(2)} onClick={() => { fetchDone(); setOrderDetail(); }}/>
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
      {orderDetail ? <OrderDetail order={orderDetail} changeState={changeState} clickOrder={clickOrder}/> : null}
    </Container>
  );
};

export default OrderList;