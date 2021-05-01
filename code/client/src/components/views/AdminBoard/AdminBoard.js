/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { Typography } from 'antd';
import DatePicker from 'react-datepicker';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const { Title } = Typography;

// eslint-disable-next-line consistent-return
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Vui lòng điền đầy đủ thông tin bắt buộc
      </div>
    );
  }
};

function AdminBoard(props) {
  const form = useRef();
  const checkButton = useRef();

  const [patientId, setPatientId] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState();
  const [address, setAddress] = useState('');
  const [patientType, setPatientType] = useState('');
  // get doctor request from department room
  // TODO: using redux
  const [department, setDepartment] = useState();
  const [successful, setSuccessful] = useState(false);

  const onChangePatientId = (e) => {
    setPatientId(e.target.value);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeDate = (value) => {
    setBirthDate(value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const onChangePatientType = (e) => {
    setPatientType(e.target.value);
  };

  const onChangeDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    if (checkButton.current.context._errors.length === 0 && props.user.userData !== undefined) {
      const values = {
        writer: props.user.userData._id,
        patientId,
        name,
        birthDate,
        gender,
        address,
        patientType,
        department,
      };
      axios.post('/api/patients/uploadInfo', values).then((response) => {
        if (response.data.success) {
          setSuccessful(true);
          alert('Upload information successfully');
        } else {
          setSuccessful(false);
          alert('Failed to upload information');
        }
      });
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Nhập thông tin bệnh nhân</Title>
      </div>
      <Form onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div>
            <div className="form-row justify-content-center">
              <div className="form-group col-md-6">
                <label htmlFor="patientId">Mã BN:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="patientId"
                  value={patientId}
                  onChange={onChangePatientId}
                  validations={[required]}
                />
              </div>
            </div>

            <div className="form-row justify-content-center">
              <div className="form-group col-md-6">
                <label htmlFor="username">Họ tên người bệnh:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required]}
                />
              </div>
            </div>

            <div className="form-row justify-content-center">
              <div className="form-group col-md-6">
                <label htmlFor="datebirth">Năm sinh:</label>
                <br />
                <DatePicker
                  className="form-control"
                  mode="date"
                  format="YYYY-MM-DD"
                  selected={birthDate}
                  onChange={onChangeDate}
                />
              </div>
            </div>

            <div className="form-row justify-content-center">
              <div className="form-group col-md-6">
                <label htmlFor="gender">Giới tính:</label>
                <Select
                  name="gender"
                  className="form-control"
                  value={gender}
                  onChange={onChangeGender}
                  validations={[required]}
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                </Select>
              </div>
            </div>

            <div className="form-row justify-content-center">
              <div className="form-group col-md-6">
                <label htmlFor="address">Địa chỉ:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="address"
                  value={address}
                  onChange={onChangeAddress}
                  validations={[required]}
                />
              </div>
            </div>

            <div className="form-row justify-content-center">
              <div className="form-group col-md-6">
                <label htmlFor="patientType">Đối tượng:</label>
                <Select
                  name="patientType"
                  className="form-control"
                  value={patientType}
                  onChange={onChangePatientType}
                  validations={[required]}
                >
                  <option value="Office hours">Khám trong giờ</option>
                  <option value="Outside office hours">Khám ngoài giờ</option>
                </Select>
              </div>
            </div>

            <div className="form-row justify-content-center">
              <div className="form-group col-md-6">
                <label htmlFor="department">Khoa phòng:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="department"
                  value={department}
                  onChange={onChangeDepartment}
                  validations={[required]}
                />
              </div>
            </div>

            <div className="form-row justify-content-center">
              <button className="btn btn-primary btn-block form-group col-md-3">
                Thêm thông tin bệnh nhân
              </button>
            </div>
          </div>
        )}

        {/* {message && (
          <div className="form-group">
            <div
              className={
                successful ? 'alert alert-success' : 'alert alert-danger'
              }
              role="alert"
              style={{ textAlign: 'center', margin: 10 }}
            >
              {message}
            </div>
          </div>
        )} */}
        <CheckButton style={{ display: 'none' }} ref={checkButton} />
      </Form>
    </div>
  );
}

export default AdminBoard;
