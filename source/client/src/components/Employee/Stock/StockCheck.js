import React from 'react';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const Container = styled.div`
  padding: 0px 40px;
`
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
`

const StockCheck = ({stocks}) => {
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
            {stocks.map((stock) => (
              <TableRow
                key={stock.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{padding: '0px 60px'}} component="th" scope="row">
                  {stock.name}
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

export default StockCheck;