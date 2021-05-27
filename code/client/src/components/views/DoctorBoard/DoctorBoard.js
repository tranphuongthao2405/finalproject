/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SCHEDULE from '../../../constant/Constant';

function DoctorBoard(props) {
  const history = useHistory();
  const patientId = props.match.params.id;

  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [patientType, setPatientType] = useState();
  const [doctor, setDoctor] = useState();
  const [department, setDepartment] = useState();
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState();
  const [necessaryWork, setNecessaryWork] = useState([]);

  const [showInfo, setShowInfo] = useState(false);
  const [notFound, setNotFound] = useState(false);
  let doctors = [];

  // state to check process
  const [imagingCheck, setImagingCheck] = useState(false);
  const [biochemicalCheck, setBioChemicalCheck] = useState(false);
  const [fungusAndParasiteCheck, setFungusAndParasiteCheck] = useState(false);
  const [hematologyAndImmunologyCheck, setHematologyAndImmunologyCheck] = useState(false);

  const onChangePrimaryDiagnosis = (e) => {
    setPrimaryDiagnosis(e.target.value);
  };

  const onChangeNecessaryWork = (e) => {
    setNecessaryWork([...necessaryWork, e.target.value]);
  };

  useEffect(() => {
    if (necessaryWork.includes('Chụp chẩn đoán hình ảnh')) {
      setImagingCheck(true);
    }
    if (necessaryWork.includes('Xét nghiệm sinh hóa máu')) {
      setBioChemicalCheck(true);
    }
    if (necessaryWork.includes('Xét nghiệm nấm - kí sinh trùng')) {
      setFungusAndParasiteCheck(true);
    }
    if (necessaryWork.includes('Xét nghiệm huyết học - miễn dịch')) {
      setHematologyAndImmunologyCheck(true);
    }
  }, [necessaryWork]);

  useEffect(() => {
    axios.get(`/api/patients/getPatientById?id=${patientId}`)
      .then((response) => {
        if (response.data.success) {
          const fulltime = response.data.patient[0].birthDate;
          const day = fulltime.substring(8, 10);
          const month = fulltime.substring(5, 7);
          const year = fulltime.substring(0, 4);
          const time = `${day}/${month}/${year}`;
          setBirthDate(time);
          setName(response.data.patient[0].name);
          setAddress(response.data.patient[0].address);
          setGender(response.data.patient[0].gender);
          setPatientType(response.data.patient[0].patientType);
          setShowInfo(true);
          setNotFound(false);
        } else {
          setShowInfo(false);
          setNotFound(true);
          // alert(response.data.err);
        }
      });
  }, []);

  const onChangeDepartment = (e) => {
    console.log(e.target.value);
    setDepartment(e.target.value);
  };

  const onChangeDoctor = (e) => {
    console.log(e.target.value);
    setDoctor(e.target.value);
  };

  const checkAllTableField = () => {
    let allFieldFilled = true;
    document.getElementById('checkForm').querySelectorAll('[required]').forEach((element) => {
      if (!element.value) {
        allFieldFilled = false;
      }

      if (element.type === 'radio') {
        let radioValueCheck = false;
        document.getElementById('checkForm').querySelectorAll(`[name=${element.name}]`).forEach((r) => {
          if (r.checked) radioValueCheck = true;
        });
        allFieldFilled = radioValueCheck;
      }
    });
    return allFieldFilled;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (checkAllTableField) {
      // update doctor and department for patient
      const dataToUpdate = {
        patientId,
        doctor,
        department,
      };
      axios.post('/api/patients/updateInfo', dataToUpdate).then((response) => {
        if (response.data.success) {
          // do something
        } else {
          // do something
        }
      });

      const value1 = imagingCheck ? 'pending' : '';
      const value2 = biochemicalCheck ? 'pending' : '';
      const value3 = fungusAndParasiteCheck ? 'pending' : '';
      const value4 = hematologyAndImmunologyCheck ? 'pending' : '';
      const dataToUpdate2 = {
        patientId,
        value1,
        value2,
        value3,
        value4,
        primaryDiagnosis,
      };
      axios.post('/api/diagnosis/updateDiagnosis', dataToUpdate2).then((response) => {
        if (response.data.success) {
          // do something
          history.push('/patientStateReceived');
        } else {
          // do something
        }
      });
    }
  };

  return (
    <div>
      {/* show information of patient */}
      {showInfo && (
      <div>
        <div className="p-5 text-center">
          <h3 className="mb-3">THÔNG TIN BỆNH NHÂN</h3>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th scope="col">
                Họ tên
              </th>
              <th scope="col">
                Mã bệnh nhân
              </th>
              <th scope="col">
                Ngày sinh
              </th>
              <th scope="col">
                Giới tính
              </th>
              <th scope="col">
                Địa chỉ
              </th>
              <th scope="col">
                Đối tượng
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{name}</td>
              <td className="text-center">{patientId}</td>
              <td className="text-center">{birthDate}</td>
              <td className="text-center">{gender}</td>
              <td className="text-center">{address}</td>
              <td className="text-center">{patientType}</td>
            </tr>
          </tbody>
        </table>

        <div className="p-5 text-center">
          <h3 className="mb-3">PHẦN DÀNH CHO BÁC SĨ</h3>
        </div>

        {/* assign imaging */}
        {/* assign labratory */}
        <form id="checkForm" onSubmit={onSubmit}>
          <div className="form-row justify-content-center">
            <div className="form-group col-md-6">
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
            {/* still some bugs when select first doctor */}
            <div className="form-group col-md-6">
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
            <div className="form-group col-md-12">
              <h6 className="mb-3">
                Chẩn đoán ban đầu:
              </h6>
              <textarea
                placeholder="Nhập chẩn đoán ban đầu của bệnh nhân"
                className="form-control "
                name="primaryDiagnosis"
                value={primaryDiagnosis}
                onChange={onChangePrimaryDiagnosis}
                required
              />
            </div>
          </div>

          <h6 className="mb-3">Các chẩn đoán và xét nghiệm cần thiết:</h6>
          <div>
            <div
              className="form-check form-check-inline"
              onChange={onChangeNecessaryWork}
            >
              <input
                type="checkbox"
                className="form-check-input"
                name="necessaryWork"
                value="Chụp chẩn đoán hình ảnh"
              />
              <label className="form-check-label" htmlFor="necessaryWork">Chụp chẩn đoán hình ảnh</label>
            </div>
            <br />
            <div
              className="form-check form-check-inline"
              onChange={onChangeNecessaryWork}
            >
              <input
                type="checkbox"
                className="form-check-input"
                name="necessaryWork"
                value="Xét nghiệm sinh hóa máu"
              />
              <label className="form-check-label" htmlFor="necessaryWork">Xét nghiệm sinh hóa máu</label>
            </div>
            <br />
            <div
              className="form-check form-check-inline"
              onChange={onChangeNecessaryWork}
            >
              <input
                type="checkbox"
                className="form-check-input"
                name="necessaryWork"
                value="Xét nghiệm nấm - kí sinh trùng"
              />
              <label className="form-check-label" htmlFor="necessaryWork">Xét nghiệm nấm - kí sinh trùng</label>
            </div>
            <br />
            <div
              className="form-check form-check-inline"
              onChange={onChangeNecessaryWork}
            >
              <input
                type="checkbox"
                className="form-check-input"
                name="necessaryWork"
                value="Xét nghiệm huyết học - miễn dịch"
              />
              <label className="form-check-label" htmlFor="necessaryWork">Xét nghiệm huyết học - miễn dịch</label>
            </div>
          </div>
          <br />
          <br />

          <div className="form-row justify-content-center">
            <button className="btn btn-primary btn-block form-group col-md-3">
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
      )}
    </div>
  );
}

export default DoctorBoard;
