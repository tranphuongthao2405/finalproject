/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import SCHEDULE from '../../../constant/Constant';

const { Title } = Typography;

function UserInput() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [role, setRole] = useState();
  const [password, setPassword] = useState();
  const [department, setDepartment] = useState();

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

  const checkAllTableField = () => {
    let allFieldFilled = true;
    document.getElementById('checkForm').querySelectorAll('[required]').forEach((element) => {
      if (!element.value) {
        allFieldFilled = false;
      }
    });
    return allFieldFilled;
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (checkAllTableField) {
      let dataToSubmit;
      if (department) {
        dataToSubmit = {
          email,
          password,
          firstname,
          lastname,
          role,
          department,
        };
      } else {
        dataToSubmit = {
          email,
          password,
          firstname,
          lastname,
          role,
        };
      }

      dispatch(registerUser(dataToSubmit)).then((response) => {
        if (response.payload.success) {
          history.push('/userlist');
        } else {
          alert(response.payload.err.errmsg);
        }
      });
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%',
    }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Nh???p th??ng tin ng?????i d??ng</Title>
      </div>
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
                required
              />
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <label htmlFor="firstname">H???:</label>
              <input
                type="text"
                className="form-control"
                name="firstname"
                value={firstname}
                onChange={onChangeFirstname}
                required
              />
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <label htmlFor="lastname">T??n:</label>
              <input
                type="text"
                className="form-control"
                name="lastname"
                value={lastname}
                onChange={onChangeLastname}
                required
              />
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <label htmlFor="password">M???t kh???u:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={onChangePassword}
                required
              />
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <label htmlFor="role">Vai tr??:</label>
              <select
                name="role"
                className="form-control"
                value={role}
                onChange={onChangeRole}
                required
              >
                <option value="">Ch???n vai tr?? ng?????i d??ng</option>
                <option value="admin">Admin</option>
                <option value="doctor">B??c s??</option>
                <option value="laboratory staff">Nh??n vi??n x??t nghi???m</option>
                <option value="imaging staff">Nh??n vi??n ch???p ch???n ??o??n h??nh ???nh</option>
                <option value="staff">Nh??n vi??n</option>
              </select>
            </div>
          </div>

          {role === 'doctor' && (
          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <h6 className="mb-3">Ph??ng kh??m:</h6>
              <select
                name="department"
                className="form-control"
                value={department}
                onChange={onChangeDepartment}
                required
              >
                <option value="">Ch???n ph??ng kh??m</option>
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
              Th??m th??ng tin ng?????i d??ng
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserInput;
