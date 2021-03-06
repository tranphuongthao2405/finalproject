/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import SCHEDULE from '../../../constant/Constant';

const { Title } = Typography;

function PatientsInfoInput(props) {
  const history = useHistory();
  let doctors = [];

  const [patientId, setPatientId] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState();
  const [address, setAddress] = useState('');
  const [patientType, setPatientType] = useState('');
  const [doctor, setDoctor] = useState();
  const [department, setDepartment] = useState();

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

  const onChangeDoctor = (e) => {
    setDoctor(e.target.value);
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
      const values = {
        writer: props.user.userData._id,
        patientId,
        name,
        birthDate,
        gender,
        address,
        patientType,
        doctor,
        department,
      };
      axios.post('/api/patients/uploadInfo', values).then((response) => {
        if (response.data.success) {
          const data = {
            patientId,
          };
          axios.post('/api/diagnosis/putDiagnosis', data).then((res) => {
            if (res.data.success) {
              history.push('/patientsList');
            } else {
              // alert('Failed to put primary information');
            }
          });
        } else {
          alert('Thêm mới thông tin bệnh nhân lỗi');
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
        <Title level={2}>Nhập thông tin bệnh nhân</Title>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <label htmlFor="patientId">Mã BN:</label>
              <input
                type="text"
                className="form-control"
                name="patientId"
                value={patientId}
                onChange={onChangePatientId}
                required
              />
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <label htmlFor="username">Họ tên người bệnh:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                onChange={onChangeName}
                required
              />
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
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
            <div className="form-group col-md-5">
              <label htmlFor="gender">Giới tính:</label>
              <select
                name="gender"
                className="form-control"
                value={gender}
                onChange={onChangeGender}
                required
              >
                <option value="">Chọn giới tính bệnh nhân</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <label htmlFor="address">Địa chỉ:</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={address}
                onChange={onChangeAddress}
                required
              />
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <label htmlFor="patientType">Đối tượng:</label>
              <select
                name="patientType"
                className="form-control"
                value={patientType}
                onChange={onChangePatientType}
                required
              >
                <option value="">Chọn đối tượng</option>
                <option value="Khám trong giờ">Khám trong giờ</option>
                <option value="Khám ngoài giờ">Khám ngoài giờ</option>
              </select>
            </div>
          </div>

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

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <h6 className="mb-3">Bác sĩ điều trị:</h6>
              <select
                name="doctor"
                className="form-control"
                value={doctor}
                onChange={onChangeDoctor}
                required
              >
                <option value="">Chọn bác sĩ</option>
                {SCHEDULE.forEach((item) => {
                  if (item.PK === department) {
                    doctors = item.doctor;
                  }
                })}
                {
                  doctors !== [] && doctors.map((dr) => (
                    <option key={`${dr.name}${dr.level}`} value={dr.name}>
                      {dr.level}
                      .
                      {' '}
                      {dr.name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="form-row justify-content-center">
            <button className="btn btn-primary btn-block form-group col-md-2">
              Thêm thông tin bệnh nhân
            </button>
          </div>
        </div>

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
      </form>
    </div>
  );
}

export default PatientsInfoInput;
