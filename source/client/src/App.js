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

const Container = styled.div`
  margin: 0px 200px;
  height: 100vh;
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
          <Route path="/orderlist" index element={<Cart/>}></Route>
          <Route path="/signup-employee" index element={<SignupEmp/>}></Route>
          <Route path="/signup-customer" index element={<SignupCus/>}></Route>
          <Route path="*" index element={<NotFound/>}></Route>
				</Routes>
			</BrowserRouter>
    </Container>
  );
}

export default App;
