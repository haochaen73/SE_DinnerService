import React from 'react';
import styled, {css} from 'styled-components';
import Button from './Button';

const MenuBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 40px;
  
`
const MenuItem = ({menu}) => {
  return (
    <MenuBox>
      <div style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '30px'}}>{menu.name}</div>
      <div style={{fontSize: '12px', color: 'gray', marginBottom: '20px'}}>{menu.text}</div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{fontSize: '15px', fontWeight: 'bold'}}>{menu.price}</div>
        <Button text="주문하기"/>
      </div>
    </MenuBox>
  );
};

export default MenuItem;