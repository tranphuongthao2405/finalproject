import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState();
  const [showTable, setShowTable] = useState(false);
  let count = 0;

  useEffect(() => {
    axios.get('/api/users/getAllUsers').then((response) => {
      if (response.data.success) {
        setShowTable(true);
        setUsers(response.data.users);
      } else {
        setShowTable(false);
      }
    });
  }, []);

  return (
    <div>
      <div className="p-5 text-center">
        <h3 className="mb-3">DANH SÁCH NGƯỜI DÙNG HỆ THỐNG</h3>
      </div>
      {users && users.length > 0 && showTable && (
        <table className="table table-bordered">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th scope="col">
                STT
              </th>
              <th scope="col">
                Họ
              </th>
              <th scope="col">
                Tên
              </th>
              <th scope="col">
                Email
              </th>
              <th scope="col">
                Vai trò
              </th>
              <th scope="col">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody>
            {
                users.map((user) => {
                  let role;
                  switch (user.role) {
                    case 'admin':
                      role = 'Admin';
                      break;
                    case 'staff':
                      role = 'Nhân viên';
                      break;
                    case 'laboratory staff':
                      role = 'Nhân viên xét nghiệm';
                      break;
                    case 'imaging staff':
                      role = 'Nhân viên chụp chẩn đoán hình ảnh';
                      break;
                    case 'doctor':
                      role = 'Bác sĩ';
                      break;
                    default:
                  }
                  count += 1;
                  return ((
                    <tr>
                      <td className="text-center">{count}</td>
                      <td className="text-center">{user.firstname}</td>
                      <td className="text-center">{user.lastname}</td>
                      <td className="text-center">{user.email}</td>
                      <td className="text-center">{role}</td>
                      <td className="text-center">{user.token ? 'Đang hoạt động' : 'Đang không hoạt động'}</td>
                    </tr>
                  ));
                })
            }
          </tbody>
        </table>
      ) }
    </div>
  );
}

export default UserList;
