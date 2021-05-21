/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';

function LeftMenu(props) {
  const user = useSelector((state) => state.user);

  return (
    <Menu mode={props.mode}>
      { user.userData !== undefined && user.userData.role === 'admin' && (
        <Menu>
          <Menu.Item key="adminBoard">
            <a href="/adminBoard" style={{ textDecoration: 'none' }}>Nhập thông tin bệnh nhân</a>
          </Menu.Item>
          <Menu.Item key="patientList">
            <a href="/patientsList" style={{ textDecoration: 'none' }}>Danh sách bệnh nhân</a>
          </Menu.Item>
        </Menu>
      )}

      {user.userData !== undefined && user.userData.role === 'doctor' && (
        <Menu>
          <Menu.Item key="patientsReceived">
            <a href="/patientStateReceived" style={{ textDecoration: 'none' }}>Danh sách bệnh nhân tiếp nhận</a>
          </Menu.Item>
        </Menu>
      )}

      {user.userData !== undefined && user.userData.role === 'laboratory staff' && (
        <Menu>
          <Menu.Item key="patientsReceived">
            <a href="/laboratoryPatientList" style={{ textDecoration: 'none' }}>Danh sách bệnh nhân tiếp nhận</a>
          </Menu.Item>
          <Menu.Item key="laboratoryStaffBoard">
            <a href="/laboratoryStaffBoard" style={{ textDecoration: 'none' }}>Điền phiếu xét nghiệm</a>
          </Menu.Item>
        </Menu>
      )}

      {user.userData !== undefined && user.userData.role === 'imaging staff' && (
      <Menu>
        <Menu.Item key="patientsReceived">
          <a href="/imagingPatientList" style={{ textDecoration: 'none' }}>Danh sách bệnh nhân tiếp nhận</a>
        </Menu.Item>
      </Menu>
      )}

    </Menu>
  );
}

export default LeftMenu;
