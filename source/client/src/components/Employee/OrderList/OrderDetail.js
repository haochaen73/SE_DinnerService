import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';

const Container = styled.div`
  padding: 40px;
`
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 40px;
`
const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr max-content;
  gap: 0px 20px;
`
const Box = styled.div`
  border: 1px solid lightgray;
  padding: 30px;
  margin-bottom: 20px;
`
const BoxHead = styled.div`
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid lightgray;
`
const OrangeButton = styled.button`
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 0.8rem;
  line-height: 1.5;
  border: 0px solid black;
  color: white;
  background: #F46335;  
  text-decoration: none;
  color: white;
  :hover{
    background: #F38562;
    cursor: pointer;
  }
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  gap: 20px;
`

const BoxContent = ({head, content}) => {
  return (
    <div style={{marginBottom: '15px'}}>
      <div style={{fontWeight: '600', fontSize: '12px', marginBottom: '10px'}}>
        {head}
      </div>
      <div style={{fontSize: '12px'}}>
        {content}
      </div>
    </div>
  );
}
const OrderDetail = ({order}) => {
  return (
    <Container>
      <Head>
        <div style={{fontWeight: 'bold', fontSize: '20px'}}>
          주문 정보
        </div>
        <div style={{fontSize: '12px'}}>
          <span style={{marginRight: '6px'}}>주문일자</span>
          <span>10/01 00:32</span>
        </div>
      </Head>
      <Content>
        <div>
          <Box>
            <BoxHead>배송 정보</BoxHead>
            <BoxContent head="주소" content="서울특별시 어쩌구 저쩌구" />
            <BoxContent head="연락처" content="010-1234-5678"/>
          </Box>
          <Box>
            <BoxHead>예약 정보</BoxHead>
            <BoxContent head="주문번호" content="1" />
            <BoxContent head="예약시간" content="10/01 14:00"/>
          </Box>
        </div>
        <Box>
        <BoxHead>주문 정보</BoxHead>
            <BoxContent head="프렌치 디너" content="+ 에그 스크램블 1개" />
        </Box>
      </Content>
      <ButtonLayout>
        <OrangeButton>조리 시작</OrangeButton>
        <Button>주문 취소</Button>
      </ButtonLayout>
    </Container>
  );
};

export default OrderDetail;