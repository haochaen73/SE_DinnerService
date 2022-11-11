import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LoginIcon from '@mui/icons-material/Login';
import StockCheck from './StockCheck';
import StockModify from './StockModify';

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
        <Box sx={{ backgroundColor: 'white', marginTop: '-1px' }}>
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
  grid-template-columns: 1fr 3fr;

`
const Stock = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container>
      <Box sx={{ width: '100%', marginTop: '-1px', height: '100vh', backgroundColor: '#2B2B2B' }}>
        <div style={{fontSize: '12px', padding: '20px 35px', color: '#808080'}}>MENU</div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange}
            textColor="#808080"
            aria-label="basic tabs example"
            orientation="vertical"
            sx={{
              '& .MuiTabs-indicator': { left: '0', width: '5px', backgroundColor: 'white' },
              '& .MuiTab-root': { fontSize: '12px', justifyContent: "flex-start", marginLeft: '15px', backgroundColor: '#2B2B2B', color: '#808080' },
              '& .Mui-selected': { color: 'white' },
            }}
          >
            <Tab icon={<CheckBoxIcon sx={{fontSize : '15px'}}/>} iconPosition="start" label="재고 확인" {...a11yProps(0)} />
            <Tab icon={<LoginIcon sx={{fontSize : '15px'}}/>} iconPosition="start" label="재고 수정" {...a11yProps(1)} />
          </Tabs>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        <StockCheck />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StockModify />
      </TabPanel>
    </Container>
  );
};

export default Stock;