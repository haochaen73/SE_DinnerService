import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import OrderItem from './OrderItem';
import OrderDetail from './OrderDetail';

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
  const [orderIdx, setOrderIdx] = useState(null);

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
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OrderItem/>
          <OrderItem/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <OrderItem/>
          <OrderItem/>
        </TabPanel>
      </Box>
      <OrderDetail />
    </Container>
  );
};

export default OrderList;