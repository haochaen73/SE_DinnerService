import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Button from '../../Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const stocklist = [
  {
    extraNo : 1,
    name : '와인 한 병',
    price : 22000,
    amount : 30
  },
  {
    extraNo : 2,
    name : '와인 한 잔',
    price : 7000,
    amount : 30
  },
  {
    extraNo : 3,
    name : '스테이크',
    price : 30000,
    amount : 30
  },
  {
    extraNo : 4,
    name : '커피 한 잔',
    price : 4000,
    amount : 30
  },
  {
    extraNo : 5,
    name : '커피 한 포트',
    price : 9000,
    amount : 30
  },
  {
    extraNo : 6,
    name : '샐러드',
    price : 10000,
    amount : 30
  },
  {
    extraNo : 7,
    name : '에그 스크램블',
    price : 2000,
    amount : 30
  },
  {
    extraNo : 8,
    name : '베이컨',
    price : 1000,
    amount : 30
  },
  {
    extraNo : 9,
    name : '샴페인',
    price : 22000,
    amount : 30
  },
  {
    extraNo : 10,
    name : '바게트 빵',
    price : 2000,
    amount : 30
  }
]

const Container = styled.div`
  padding: 0px 40px;
`
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`
const StyledInput = styled.input.attrs({ type: 'number' })`
  text-align: center;
  width: 50px;
`
const StockModify = () => {
  const[stocks, setStocks] = useState(stocklist);

  const onChange = (id, key, e) => {
    console.log(e.target.value);
    setStocks(prevState => {
      return prevState.map(obj => {
        if (obj.extraNo === id) {
          return { ...obj, [key]: e.target.value };
        } else {
          return { ...obj };
        }
      });
    });
  }

  return (
    <Container>
      <Head>
        <div style={{fontWeight: 'bold', fontSize: '20px'}}>
          재고 수정
        </div>
        <Button>수정완료</Button>
      </Head>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{background: 'black'}}>
            <TableRow>
              <TableCell sx={{color: 'white', padding: '0px 60px'}}>품목</TableCell>
              <TableCell align="center" sx={{color: 'white'}}>입고 수량</TableCell>
              <TableCell align="center" sx={{color: 'white'}}>현재 수량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow
                key={stock.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{padding: '0px 60px'}} component="th" scope="row">
                  {stock.name}
                </TableCell>
                <TableCell align="center">
                  <StyledInput
                    defaultValue="0"
                  />
                </TableCell>
                <TableCell align="center">{stock.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StockModify;