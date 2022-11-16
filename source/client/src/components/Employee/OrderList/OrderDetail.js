import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import moment from 'moment';

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

const DinnerContent = ({dinner}) => {
  console.log(dinner.dinnerName);
  return (
    <div style={{marginBottom: '15px'}}>
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
        <span style={{fontWeight: '600', fontSize: '12px'}}>{dinner.dinnerName}&nbsp;&nbsp;</span>
        <span style={{fontSize: '10px'}}>{dinner.style}</span>
      </div>
      {
        dinner.extraList.map((extra) => {
          if (extra.amount > 0){
            return(
            <div style={{fontSize: '12px'}}>{extra.extraName}&nbsp;{extra.amount}개</div>
            );
          }
        })
      }
      
    </div>
  );
}

const StateButton = ({state}) => {
  const text = ['주문 취소','조리 시작', '조리 완료', '배달 시작', '배달 완료'];
  if (state === 1) {
    return (
      <div>
        <OrangeButton>조리 시작</OrangeButton>
        <Button>주문 취소</Button>
      </div>
    );
  }
  return (
    <OrangeButton>{text[state]}</OrangeButton>
  );
}

const OrderDetail = ({ order }) => {
  return (
    <Container>
      <Head>
        <div style={{fontWeight: 'bold', fontSize: '20px'}}>
          주문 정보
        </div>
        <div style={{fontSize: '12px'}}>
          <span style={{marginRight: '6px'}}>주문일자</span>
          <span>{moment(order.createdAt).format('MM/DD hh시 mm분')}</span>
        </div>
      </Head>
      <Content>
        <div>
          <Box>
            <BoxHead>예약 정보</BoxHead>
            <BoxContent head="주문번호" content={order.orderIdx} />
            <BoxContent head="예약시간" content={moment(order.deliveredAt).format('MM/DD hh:00')}/>
          </Box>
          <Box>
            <BoxHead>배송 정보</BoxHead>
            <BoxContent head="주소" content={order.address} />
            <BoxContent head="연락처" content={order.phoneNum}/>
          </Box>
        </div>
        <Box>
        <BoxHead>주문 정보</BoxHead>
          {
            order.dinnerList?.map((dinner, index) => {
              console.log(dinner);
              return <DinnerContent key={index} dinner={dinner}/>;
            })
          }
        </Box>
      </Content>
      <ButtonLayout>
        {order.state === 5 ?  null : <StateButton state={order.state}/>}
      </ButtonLayout>
    </Container>
  );
};

export default OrderDetail;