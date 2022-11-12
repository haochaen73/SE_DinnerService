import React, { useState } from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ModifyPersonalInfo from '../components/ModifyPersonalInfo';


function TabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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


const MyPage = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} centered
        textColor="black"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        variant='fullWidth'
        sx={{
          '& .MuiTabs-indicator': { backgroundColor: 'black', color: 'black' },
          '& .MuiTab-root': { color: 'black' },
          '& .Mui-selected': { color: 'black' },
        }}
        
      >
        <Tab label="주문 내역" {...a11yProps(0)} />
        <Tab label="회원정보 수정" {...a11yProps(1)} />
      </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ModifyPersonalInfo></ModifyPersonalInfo>
      </TabPanel>
    </Box>
  );
};
    
export default MyPage;