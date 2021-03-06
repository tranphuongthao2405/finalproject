/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import SCHEDULE from '../../../constant/Constant';

const { Title } = Typography;

function PatientsUpdate(props) {
  const history = useHistory();
  let doctors = [];
  const pId = props.match.params.id;

  const [patientId, setPatientId] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState();
  const [address, setAddress] = useState('');
  const [patientType, setPatientType] = useState('');
  const [doctor, setDoctor] = useState();
  const [department, setDepartment] = useState();
  const [done, setDone] = useState(false);

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

  useEffect(() => {
    if (pId) {
      axios.get(`/api/patients/getPatientById?id=${pId}`)
        .then((response) => {
          if (response.data.success) {
            const fulltime = response.data.patient[0].birthDate;
            const day = fulltime.substring(8, 10);
            const month = fulltime.substring(5, 7);
            const year = fulltime.substring(0, 4);
            const time = `${year}-${month}-${day}`;
            setPatientId(pId);
            setBirthDate(new Date(time));
            setName(response.data.patient[0].name);
            setAddress(response.data.patient[0].address);
            setGender(response.data.patient[0].gender);
            setPatientType(response.data.patient[0].patientType);
            setDoctor(response.data.patient[0].doctor);
            setDepartment(response.data.patient[0].department);
            setDone(true);
          } else {
            alert('Kh??ng th??? t???i th??ng tin b???nh nh??n');
          }
        });
    }
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

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

    axios.post('/api/patients/updateInformation', values)
      .then((response) => {
        if (response.data.success) {
          history.push('/patientsList');
        } else {
          alert('Kh??ng th??? c???p nh???t th??ng tin b???nh nh??n');
        }
      });
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%',
    }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>C???p nh???t th??ng tin b???nh nh??n</Title>
      </div>
      {done ? (
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
                C???p nh???t th??ng tin b???nh nh??n
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
      ) : (
        <div className="p-5 text-center">
          <h6 className="mb-3">??ang t???i th??ng tin b???nh nh??n...</h6>
        </div>
      )}
    </div>
  );
}

export default PatientsUpdate;
