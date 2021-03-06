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
          alert('Th??m m???i th??ng tin b???nh nh??n l???i');
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
        <Title level={2}>Nh???p th??ng tin b???nh nh??n</Title>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <label htmlFor="patientId">M?? BN:</label>
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
              <label htmlFor="username">H??? t??n ng?????i b???nh:</label>
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
              <label htmlFor="datebirth">N??m sinh:</label>
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
              <label htmlFor="gender">Gi???i t??nh:</label>
              <select
                name="gender"
                className="form-control"
                value={gender}
                onChange={onChangeGender}
                required
              >
                <option value="">Ch???n gi???i t??nh b???nh nh??n</option>
                <option value="Nam">Nam</option>
                <option value="N???">N???</option>
              </select>
            </div>
          </div>

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <label htmlFor="address">?????a ch???:</label>
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
              <label htmlFor="patientType">?????i t?????ng:</label>
              <select
                name="patientType"
                className="form-control"
                value={patientType}
                onChange={onChangePatientType}
                required
              >
                <option value="">Ch???n ?????i t?????ng</option>
                <option value="Kh??m trong gi???">Kh??m trong gi???</option>
                <option value="Kh??m ngo??i gi???">Kh??m ngo??i gi???</option>
              </select>
            </div>
          </div>

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

          <div className="form-row justify-content-center">
            <div className="form-group col-md-5">
              <h6 className="mb-3">B??c s?? ??i???u tr???:</h6>
              <select
                name="doctor"
                className="form-control"
                value={doctor}
                onChange={onChangeDoctor}
                required
              >
                <option value="">Ch???n b??c s??</option>
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
              Th??m th??ng tin b???nh nh??n
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
