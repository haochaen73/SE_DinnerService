import React, {useState} from 'react';
import styled from 'styled-components';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const CartTextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: black;
  font-weight: 500;
  padding: 50px 50px;
  //border-bottom: 1px solid lightgray;
`
const SDatePicker = styled(DatePicker)`
  border-radius: 20px;
  border: 1px solid black;
  padding: 10px 10px;
  font-weight: 500;
`
const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 40px;
  margin-bottom: 20px;
`
const BoxHead = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 30px;
`
const Cart = () => {
  const [startDate, setStartDate] = useState(setMinutes(new Date(), 0));
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <div>
      <CartTextDiv>장바구니</CartTextDiv>
      <Box>
        <BoxHead>날짜 선택</BoxHead>
        <SDatePicker
          locale={ko}
          closeOnScroll={true} // 스크롤 하면 선택box 닫히게
          selected={startDate} // 처음에 맨 위에 표시된 input에 나오는게 지금 날짜
          onChange={(date) => setStartDate(date)} // 내가 선택한 날짜가 맨 위에 표시 됨
          showTimeSelect // 시간 나오게 하기
          timeFormat="HH:mm" //시간 포맷 
          timeIntervals={60} // 15분 단위로 선택 가능한 box가 나옴
          minTime={setHours(setMinutes(new Date(), 0), 15)}
          maxTime={setHours(setMinutes(new Date(), 0), 21)}
          minDate={new Date()}
          filterTime={filterPassedTime}
          dateFormat="MM/dd aa hh:mm"
        />
      </Box>
      <Box>
        <BoxHead>주문 정보</BoxHead>
      </Box>
    </div>
  );
};

export default Cart;