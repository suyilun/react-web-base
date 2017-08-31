import React from 'react';
import { Menu } from 'antd';

const HeaderMenu = () => (
  <div>
    <div className="logo" />
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={
        { lineHeight: '64px' }
      }
    >
      <Menu.Item key="1">nav 1</Menu.Item>
      <Menu.Item key="2">nav 2</Menu.Item>
      <Menu.Item key="3">nav 3</Menu.Item>
    </Menu>
  </div>
);
// class HeaderMenu extends React.Component {
//   render() {
//     return (<div>1</div>);
//   }
// }
export default HeaderMenu;
