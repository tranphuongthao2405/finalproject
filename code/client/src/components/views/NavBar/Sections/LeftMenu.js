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
        <Menu>
          <Menu.Item key="adminBoard">
            <a href="/adminBoard" style={{ textDecoration: 'none' }}>Nhập thông tin bệnh nhân</a>
          </Menu.Item>
          <Menu.Item key="patientList">
            <a href="/patientsList" style={{ textDecoration: 'none' }}>Danh sách bệnh nhân</a>
          </Menu.Item>
        </Menu>
      )}

      {doctorBoard && (
        <Menu>
          <Menu.Item key="patientsReceived">
            <a href="/patientStateReceived" style={{ textDecoration: 'none' }}>Danh sách bệnh nhân tiếp nhận</a>
          </Menu.Item>
          <Menu.Item key="doctorBoard">
            <a href="/doctorBoard" style={{ textDecoration: 'none' }}>Chẩn đoán</a>
          </Menu.Item>
        </Menu>
      )}

      {laboratoryStaffBoard && (
        <Menu>
          <Menu.Item key="patientsReceived">
            <a href="/laboratoryPatientList" style={{ textDecoration: 'none' }}>Danh sách bệnh nhân tiếp nhận</a>
          </Menu.Item>
          <Menu.Item key="laboratoryStaffBoard">
            <a href="/laboratoryStaffBoard" style={{ textDecoration: 'none' }}>Điền phiếu xét nghiệm</a>
          </Menu.Item>
        </Menu>
      )}

      {imagingStaffBoard && (
      <Menu>
        <Menu.Item key="patientsReceived">
          <a href="/imagingPatientList" style={{ textDecoration: 'none' }}>Danh sách bệnh nhân tiếp nhận</a>
        </Menu.Item>
        <Menu.Item key="imagingStaffBoard">
          <a href="/imagingStaffBoard" style={{ textDecoration: 'none' }}>Chụp chẩn đoán hình ảnh</a>
        </Menu.Item>
      </Menu>
      )}

    </Menu>
  );
}

export default LeftMenu;
