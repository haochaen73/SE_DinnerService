import React from 'react';
import Header from './Header';

const Layout = (props) => {
  return (
    <div>
      <Header/>
      <div>
        {props.childern}
      </div>
    </div>
  );
};

export default Layout;