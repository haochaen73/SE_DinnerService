import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios'

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

const StockCheck = () => {
  const [stockAmount, setStockAmount] = useState(stockamount);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('/stocks');
        setStockAmount(response.data.result);
      } catch (e) {

      }
    }
    fetchStocks();
  }, []);

  return (
    <Container>
      <Head>
        <div style={{fontWeight: 'bold', fontSize: '20px'}}>
          재고 확인
        </div>
      </Head>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{background: 'black'}}>
            <TableRow>
              <TableCell sx={{color: 'white', padding: '0px 60px'}}>품목</TableCell>
              <TableCell align="center" sx={{color: 'white'}}>현재 수량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stockInfo?.map((stock) => (
              <TableRow
                key={stock.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{padding: '0px 60px'}} component="th" scope="row">
                  {stock.name}
                </TableCell>
                <TableCell align="center">{stockAmount[`amount${stock.idx}`]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StockCheck;