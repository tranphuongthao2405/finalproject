/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_SERVER } from '../../../Config';

const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

function RightMenu(props) {
  const user = useSelector((state) => state.user);
  let name;
  if (user !== undefined) {
    if (user.userData !== undefined) {
      name = `${user.userData.firstname} ${user.userData.lastname}`;
    }
  }

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push('/login');
      } else {
        alert('Failed to log out');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="signin">
          <a href="/login" style={{ textDecoration: 'none' }}>Đăng ký</a>
        </Menu.Item>
        <Menu.Item key="signup">
          <a href="/register" style={{ textDecoration: 'none' }}>Đăng ký</a>
        </Menu.Item>
      </Menu>
    );
  }
  return (
    <>
      {user !== undefined && user.userData !== undefined && (
      <Menu mode={props.mode}>
        <SubMenu title={(
          <span>
            {' '}
            Xin chào,
            {' '}
            {name}
          </span>
    )}
        >
          <MenuItemGroup>
            <Menu.Item key="user info">
              <a href={`/user/${localStorage.userId}`} style={{ textDecoration: 'none' }}>
                Cập nhật thông tin
              </a>
            </Menu.Item>
            <Menu.Item key="logout">
              <a onClick={logoutHandler}>Đăng xuất</a>
            </Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
      )}
    </>

  );
}

export default withRouter(RightMenu);
