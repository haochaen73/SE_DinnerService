import React from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 200px;
  padding: 10px 0px;
`

const CountDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  width: 50px;
  height: 25px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 20px;
  line-height: 1.5;
  border: 1px solid black;
  color: white;
  background: black;  
  color: white;
`

const Counter = ({count}) => {
  return (
    <StyledDiv>
      <div>
        <div style={{margin: '5px 0px', fontSize: '12px', fontWeight: '400'}}>와인 한 병</div>
        <div style={{fontSize: '8px', color: 'gray'}}>22,000원</div>
      </div>
      <CountDiv>
        <RemoveIcon sx={{ fontSize: 12 }} />
        {count}
        <AddIcon sx={{ fontSize: 12 }}/>
      </CountDiv>
    </StyledDiv>
  );
};

export default Counter;