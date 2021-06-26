/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import SCHEDULE from '../../../constant/Constant';

const { Title } = Typography;

function UserEdit(props) {
  const history = useHistory();
  const userId = props.match.params.id;

  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [role, setRole] = useState();
  const [password, setPassword] = useState();
  const [department, setDepartment] = useState();
  const [done, setDone] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const onChangeLastname = (e) => {
    setLastname(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeRole = (e) => {
    setRole(e.target.value);
  };

  const onChangeDepartment = (e) => {
    setDepartment(e.target.value);
  };

  useEffect(() => {
    if (userId) {
      axios.get(`/api/users/getUserById?id=${userId}`)
        .then((response) => {
          if (response.data.success) {
            setEmail(response.data.user[0].email);
            setFirstname(response.data.user[0].firstname);
            setLastname(response.data.user[0].lastname);
            setRole(response.data.user[0].role);
            setDone(true);
          } else {
            alert('Không thể tải thông tin của tài khoản');
          }
        });
    }
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let dataToSubmit;
    if (department) {
      dataToSubmit = {
        userId,
        email,
        password,
        firstname,
        lastname,
        role,
        department,
      };
    } else {
      dataToSubmit = {
        userId,
        email,
        password,
        firstname,
        lastname,
        role,
      };
    }

    axios.post('/api/users/updateInformation', dataToSubmit).then((response) => {
      if (response.data.success) {
        history.push('/userlist');
      } else {
        alert('Cập nhật thông tin tài khoản lỗi');
      }
    });
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%',
    }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Chỉnh sửa thông tin người dùng</Title>
      </div>
      {done ? (
        <form onSubmit={handleSubmit}>
          <div>
            <div className="form-row justify-content-center">
              <div className="form-group col-md-5">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                />
              </div>
            </div>

            <div className="form-row justify-content-center">
              <div className="form-group col-md-5">
                <label htmlFor="firstname">Họ:</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  onChange={onChangeFirstname}
                />
              </div>
            </div>

            <div className="form-row justify-content-center">
              <div className="form-group col-md-5">
                <label htmlFor="lastname">Tên:</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={lastname}
                  onChange={onChangeLastname}
                />
              </div>
            </div>

            <div className="form-row justify-content-center">
              <div className="form-group col-md-5">
                <label htmlFor="password">Mật khẩu:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={onChangePassword}
                />
              </div>
            </div>

            <div className="form-row justify-content-center">
              <div className="form-group col-md-5">
                <label htmlFor="role">Vai trò:</label>
                <select
                  name="role"
                  className="form-control"
                  value={role}
                  onChange={onChangeRole}
                >
                  <option value="">Chọn vai trò người dùng</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Bác sĩ</option>
                  <option value="laboratory staff">Nhân viên xét nghiệm</option>
                  <option value="imaging staff">Nhân viên chụp chẩn đoán hình ảnh</option>
                  <option value="staff">Nhân viên</option>
                </select>
              </div>
            </div>

            {role === 'doctor' && (
            <div className="form-row justify-content-center">
              <div className="form-group col-md-5">
                <h6 className="mb-3">Phòng khám:</h6>
                <select
                  name="department"
                  className="form-control"
                  value={department}
                  onChange={onChangeDepartment}
                  required
                >
                  <option value="">Chọn phòng khám</option>
                  {
                  SCHEDULE.map((item) => (
                    <option key={item.PK} value={item.PK}>
                      PK
                      {item.PK}
                    </option>
                  ))
                }
                </select>
              </div>
            </div>
            )}
            <br />

            <div className="form-row justify-content-center">
              <button className="btn btn-primary btn-block form-group col-md-2">
                Cập nhật thông tin người dùng
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-5 text-center">
          <h6 className="mb-3">Đang tải thông tin người dùng...</h6>
        </div>
      )}
    </div>
  );
}

export default UserEdit;
