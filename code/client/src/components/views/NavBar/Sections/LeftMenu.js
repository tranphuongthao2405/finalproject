/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { USER_SERVER } from '../../../Config';

const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector((state) => state.user);

  const [adminBoard, showAdminBoard] = useState(false);
  const [doctorBoard, showDoctorBoard] = useState(false);
  const [laboratoryStaffBoard, showLaboratoryStaffBoard] = useState(false);
  const [imagingStaffBoard, showImagingStaffBoard] = useState(false);

  useEffect(() => {
    if (user !== undefined && user.userData !== undefined) {
      switch (user.userData.role) {
        case 'admin':
          showAdminBoard(true);
          break;
        case 'doctor':
          showDoctorBoard(true);
          break;
        case 'laboratory staff':
          showLaboratoryStaffBoard(true);
          break;
        case 'imaging staff':
          showImagingStaffBoard(true);
          break;
        default:
      }
    }
  }, [user.userData]);

  return (
    <Menu mode={props.mode}>
      {adminBoard && (
        <Menu.Item key="adminBoard">
          <a href="/adminBoard" style={{ textDecoration: 'none' }}>Admin Board</a>
        </Menu.Item>
      )}

      {doctorBoard && (
      <Menu.Item key="doctorBoard">
        <a href="/" style={{ textDecoration: 'none' }}>Doctor Board</a>
      </Menu.Item>
      )}

      {laboratoryStaffBoard && (
      <Menu.Item key="laboratoryStaffBoard">
        <a href="/laboratoryStaffBoard" style={{ textDecoration: 'none' }}>Laboratory Staff Board</a>
      </Menu.Item>
      )}

      {imagingStaffBoard && (
      <Menu.Item key="imagingStaffBoard">
        <a href="/imagingStaffBoard" style={{ textDecoration: 'none' }}>Imaging Staff Board</a>
      </Menu.Item>
      )}

    </Menu>
  );
}

export default LeftMenu;
