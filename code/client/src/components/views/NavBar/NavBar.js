import React, { useState } from 'react';
import { Drawer, Button, Icon } from 'antd';
import { useSelector } from 'react-redux';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import './Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user);
  // TODO: only show right nav bar

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav
      className="menu"
      style={{ position: 'fixed', zIndex: 999, width: '100%' }}
    >
      <div className="menu__logo">
        <a
          href="/"
          style={{ display: 'flex', justifyContent: 'space-between', textDecoration: 'none' }}
        >
          Trang chủ
        </a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
