import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Button from '../../Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const stockInfo = [
  {
    idx : 1,
    name : '와인 한 병',
  },
  {
    idx : 2,
    name : '와인 한 잔',
  },
  {
    idx : 3,
    name : '스테이크',
  },
  {
    idx : 4,
    name : '커피 한 잔',
  },
  {
    idx : 5,
    name : '커피 한 포트',
  },
  {
    idx : 6,
    name : '샐러드',
  },
  {
    idx : 7,
    name : '에그 스크램블',
  },
  {
    idx : 8,
    name : '베이컨',
  },
  {
    idx : 9,
    name : '샴페인',
  },
  {
    idx : 10,
    name : '바게트 빵',
  }
]

const stockamount = {
  amount1 : 0,
  amount2 : 0,
  amount3 : 0,
  amount4 : 0,
  amount5 : 0,
  amount6 : 0,
  amount7 : 0,
  amount8 : 0,
  amount9 : 0,
  amount10 : 0
}

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
  ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
        margin: 0; 
    }
  ::-webkit-outer-spin-button{
      -webkit-appearance: none; 
      margin: 0; 
  }    
`
const StockModify = () => {
  const[stocks, setStocks] = useState(stockInfo);
  const[stockAmount, setStockAmount] = useState(stockamount);
  const[getAmount, setGetAmount] = useState(stockamount);

  const modifyStockAmount = (e, key) => {
    console.log(e.target.value);
    setStockAmount(prevState => ({ ...prevState, [`amount${key}`]: Number(e.target.value) }));
  }

  const fetchStocks = async () => {
    try {
      const response = await axios.get('/stocks');
      setGetAmount(response.data.result);
    } catch (e) {

    }
  }

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <Container>
      <Head>
        <div style={{fontWeight: 'bold', fontSize: '20px'}}>
          재고 수정
        </div>
        <Button onClick={async () => {
          try {
            console.log(stocks);
            const response =  await axios.patch('/stocks/edit', {
              amount1: stockAmount['amount1'] + getAmount['amount1'],
              amount2: stockAmount['amount2'] + getAmount['amount2'],
              amount3: stockAmount['amount3'] + getAmount['amount3'],
              amount4: stockAmount['amount4'] + getAmount['amount4'],
              amount5: stockAmount['amount5'] + getAmount['amount5'],
              amount6: stockAmount['amount6'] + getAmount['amount6'],
              amount7: stockAmount['amount7'] + getAmount['amount7'],
              amount8: stockAmount['amount8'] + getAmount['amount8'],
              amount9: stockAmount['amount9'] + getAmount['amount9'],
              amount10: stockAmount['amount10'] + getAmount['amount10'],
            });
            alert(response.data.result);
          } catch(e) {

          }
          fetchStocks();
          setStockAmount(stockamount);
        }
        }>
          수정완료
        </Button>
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
                    value={stockAmount[`amount${stock.idx}`]}
                    onChange={(e) => modifyStockAmount(e, stock.idx)}
                  />
                </TableCell>
                <TableCell align="center">{getAmount[`amount${stock.idx}`] + stockAmount[`amount${stock.idx}`]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StockModify;