import { Reset } from 'styled-reset'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main'
import Order from './pages/Order';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header';
import styled, {css} from 'styled-components';
import SignupEmp from './pages/SignupEmp';
import SignupCus from './pages/SignupCus';
import Cart from './pages/Cart';
import MyPage from './pages/MyPage';
import OrderComplete from './pages/OrderComplete';
import Employee from './pages/Employee';
import OrderHistoryDetail from './pages/OrderHistoryDetail';
import OrderEdit from './pages/OrderEdit';

const Container = styled.div`
  width: 1000px;
  margin: 0 auto;
  height: 100%;
`
function App() {
  return (
    <Container>
      <Reset />
      <BrowserRouter>
        <Header/>
				<Routes>
          <Route path="/" index element={<Main />}></Route>
          <Route path="/login" index element={<Login/>}></Route>
          <Route path="/signup" index element={<Signup/>}></Route>
          <Route path="/order" index element={<Order/>}></Route>
          <Route path="/cart" index element={<Cart/>}></Route>
          <Route path="/ordercomplete" index element={<OrderComplete/>}></Route>
          <Route path="/employee" index element={<Employee/>}></Route>
          <Route path="/signup-employee" index element={<SignupEmp/>}></Route>
          <Route path="/signup-customer" index element={<SignupCus/>}></Route>
          <Route path="/mypage" index element={<MyPage/>}></Route>
          <Route path="/order-history-detail" index element={<OrderHistoryDetail/>}></Route>
          <Route path="/orderedit" index element={<OrderEdit/>}></Route>
          <Route path="*" index element={<NotFound/>}></Route>
				</Routes>
			</BrowserRouter>
    </Container>
  );
}

export default App;
