/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Logo from '../LaboratoryStaffBoard/medicalTests/images/logo.jpg';

const { Title } = Typography;

function PatientInfo(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const patientId = props.match.params.id;

  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [patientType, setPatientType] = useState();
  const [department, setDepartment] = useState();
  const [doctor, setDoctor] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [successful, setSuccessful] = useState(false);

  const [fungusAndParasiteState, setFungusAndParasiteState] = useState();
  const [biochemicalState, setBioChemicalState] = useState();
  const [hematologyAndImmunologyState, setHematologyAndImmunologyState] = useState();
  const [resultState, setResultState] = useState();
  const [imagingState, setImagingState] = useState();
  const [getState, setGetState] = useState(false);

  const [fungusAndParasiteDiagnosis, setFungusAndParasiteDiagnosis] = useState();
  const [biochemicalDiagnosis, setBioChemicalDiagnosis] = useState();
  const [hematologyAndImmunologyDiagnosis, setHematologyAndImmunologyDiagnosis] = useState();
  const [resultDiagnosis, setResultDiagnosis] = useState();
  const [images, setImages] = useState([]);
  const [imageProcessing, setImageProcessing] = useState([]);

  const [stateDone1, setStateDone1] = useState(false);
  const [stateDone2, setStateDone2] = useState(false);
  const [stateDone3, setStateDone3] = useState(false);
  const [stateDone4, setStateDone4] = useState(false);
  const [stateDone5, setStateDone5] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    axios.get(`/api/patients/getPatientById?id=${patientId}`)
      .then((response) => {
        if (response.data.success) {
          const fulltime = response.data.patient[0].birthDate;
          const day = fulltime.substring(8, 10);
          const month = fulltime.substring(5, 7);
          const year = fulltime.substring(0, 4);
          const time = `${day}/${month}/${year}`;
          setName(response.data.patient[0].name);
          setAddress(response.data.patient[0].address);
          setGender(response.data.patient[0].gender);
          setBirthDate(time);
          setDepartment(response.data.patient[0].department);
          setPatientType(response.data.patient[0].patientType);
          setDoctor(response.data.patient[0].doctor);
        } else {
        //   alert(response.data.err);
        }
      });

    axios.get(`/api/diagnosis/getDiagnosisById?patientId=${patientId}`).then((response) => {
      if (response.data.success) {
        setDiagnosis(response.data.doc[0].doctorDiagnosis);
        setImagingState(response.data.doc[0].imaging);
        setFungusAndParasiteState(response.data.doc[0].fungusAndParasite);
        setBioChemicalState(response.data.doc[0].biochemical);
        setHematologyAndImmunologyState(response.data.doc[0].hematologyAndImmunology);
        setResultState(response.data.doc[0].result);
        setGetState(true);
      } else {
        // do something
      }
    });
  }, []);

  const populateTableData = () => {
    let count = 0;
    if (images !== [] && imageProcessing !== []) {
      count = images.length;
    }

    let returnString = '';

    for (let i = 0; i < count; i += 1) {
      returnString
      += `
      <tr>
      <td class="text-center">${i + 1}</td>
      <td class="text-center">${patientId}</td>
      <td class="text-center">
        <img
          style={{ minWidth: '512px', width: '512px', height: '285px' }}
          src='http://localhost:5000/${images[i]}'
          alt='patientImage-${i}'
        /></td>
      <td class="text-center">${parseFloat(imageProcessing[i]) * 100}%</td>
      </tr>
      `;
    }

    const bodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
    bodyRef.innerHTML = returnString;
  };

  useEffect(() => {
    const value = {
      patientId,
    };

    if (getState) {
      if (fungusAndParasiteState === 'done') {
        axios.post('/api/diagnosis/fungusAndParasiteDiagnosis/getFungusDiagnosisById', value)
          .then((response) => {
            if (response.data.success) {
              if (response.data.doc[0] !== undefined) {
                setFungusAndParasiteDiagnosis(response.data.doc[0].fungusDiagnosis);
              }
            } else {
              console.log(response.data.err);
            }
          });
      } else {
        setFungusAndParasiteDiagnosis('Chưa có/ Không có dữ liệu');
      }

      if (resultState === 'done') {
        axios.post('/api/diagnosis/result/getResultDiagnosisById', value)
          .then((response) => {
            if (response.data.success) {
              if (response.data.doc[0] !== undefined) {
                setResultDiagnosis(response.data.doc[0].diagnosis);
              }
            } else {
              console.log(response.data.err);
            }
          });
      } else {
        setResultDiagnosis('Chưa có/ Không có dữ liệu');
      }

      if (hematologyAndImmunologyState === 'done') {
        axios.post('/api/diagnosis/hematologyDiagnosis/getHematologyDiagnosisById', value)
          .then((response) => {
            if (response.data.success) {
              if (response.data.doc[0] !== undefined) {
                setHematologyAndImmunologyDiagnosis(response.data.doc[0].hematologyDiagnosis);
              }
            } else {
              console.log(response.data.err);
            }
          });
      } else {
        setHematologyAndImmunologyDiagnosis('Chưa có/ Không có dữ liệu');
      }

      if (biochemicalState === 'done') {
        axios.post('/api/diagnosis/biochemicalDiagnosis/getBiochemicalDiagnosisById', value)
          .then((response) => {
            if (response.data.success) {
              if (response.data.doc[0] !== undefined) {
                setBioChemicalDiagnosis(response.data.doc[0].biochemicalDiagnosis);
              }
            } else {
              console.log(response.data.err);
            }
          });
      } else {
        setBioChemicalDiagnosis('Chưa có/ Không có dữ liệu');
      }

      if (imagingState === 'done') {
        axios.post('/api/diagnosis/imagingDiagnosis/getImagingDiagnosisById', value)
          .then((response) => {
            if (response.data.success) {
              if (response.data.doc[0] !== undefined) {
                setImages(response.data.doc[0].images);
                setImageProcessing(response.data.doc[0].imagingDiagnosis);
                setDone(true);
              }
            } else {
              console.log(response.data.err);
            }
          });
      } else {
        setImagingState('Chưa có/ Không có dữ liệu');
      }
    }
  }, [getState]);

  useEffect(() => {
    if (done) {
      populateTableData();
    }
  }, [done]);

  const downloadForm = () => {
    const divToDownload = document.getElementById('download-form');
    html2canvas(divToDownload, { useCORS: true, scrollY: -window.scrollY }).then((canvas) => {
      const divImage = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(divImage);
      const width = 210;
      const height = (imgProps.height * width) / imgProps.width;
      pdf.addImage(divImage, 'png', 0, 10, width, height);
      const title = `${patientId}_phieuxetnghiem.pdf`;
      pdf.save(title);
    });
  };

  return (
    <>
      {getState && done && images.length > 0 && (
        <div className="outer-form">
          <div className="laboratory-form" id="download-form">
            <div className="form-row">
              <div className="form-group col-md-2">
                <img src={Logo} alt="logo" width="100%" height="90%" />
              </div>
              <div className="form-group col-md-8">
                <p>
                  <b>
                    Bệnh viện Da liễu Trung ương
                    <br />
                    15A Phương Mai - Đống Đa - Hà Nội
                    <br />
                    Website:
                    {' '}
                    <a href="http://dalieu.vn" style={{ color: 'black' }}>
                      http://dalieu.vn
                    </a>
                  </b>
                </p>
                <p style={{ textAlign: 'center', fontSize: '24px' }}>
                  <b>THÔNG TIN BỆNH NHÂN</b>
                </p>
                <p style={{ textAlign: 'center', fontSize: '14px', fontStyle: 'italic' }}>
                  (Kết quả chẩn đoán và xét nghiệm được lấy từ lần cuối bệnh nhân khám và xét nghiệm)
                </p>
              </div>

              <div className="form-group col-md-2">
                <div>
                  <label htmlFor="patientId">
                    Mã BN:
                    {' '}
                    {patientId}
                  </label>
                </div>
              </div>
            </div>

            {/* form fields */}
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="username">
                  Họ tên người bệnh:
                  {' '}
                  {name}
                </label>
              </div>

              <div className="form-group col-md-3">
                <label htmlFor="birthDate">
                  Năm sinh:
                  {' '}
                  {birthDate}
                </label>
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="gender">
                  Giới tính:
                  {' '}
                  {gender}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="address">
                  Địa chỉ:
                  {' '}
                  {address}
                </label>
              </div>

              <div className="form-group col-md-5">
                <label htmlFor="patientType">
                  Đối tượng:
                  {' '}
                  {patientType}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="diagnosis">
                  Chẩn đoán của bác sĩ:
                  {' '}
                  {diagnosis}
                </label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="number">
                  Số BHYT:
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="department">
                  Khoa phòng:
                  {' '}
                  PK
                  {department}
                </label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="doctor">
                  Bác sĩ:
                  {' '}
                  {doctor}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="fungus">
                  Kết quả xét nghiệm nấm - kí sinh trùng:
                  {' '}
                  {fungusAndParasiteDiagnosis}
                </label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="biochemical">
                  Kết quả xét nghiệm sinh hóa máu:
                  {' '}
                  {biochemicalDiagnosis}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="hematology">
                  Kết quả xét nghiệm huyết học - miễn dịch:
                  {' '}
                  {hematologyAndImmunologyDiagnosis}
                </label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="result">
                  Kết quả xét nghiệm tổng quát:
                  {' '}
                  {resultDiagnosis}
                </label>
              </div>
            </div>

            <div style={{ padding: 20 }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={3}>Kết quả phân tích ảnh</Title>
              </div>
              <table className="table table-bordered" id="myTable">
                <thead>
                  <tr style={{ textAlign: 'center' }}>
                    <th scope="col" style={{ width: '5%' }}>
                      STT
                    </th>
                    <th scope="col" style={{ width: '10%' }}>
                      Mã bệnh nhân
                    </th>
                    <th scope="col" style={{ width: '50%' }}>
                      Ảnh
                    </th>
                    <th scope="col" style={{ width: '15%' }}>
                      Tỉ lệ bị ung thư hắc tố da (Melanoma)
                    </th>
                  </tr>
                </thead>
                <tbody />
              </table>
            </div>
          </div>
        </div>
      )}

      {getState && !done && images.length === 0 && (
        <div className="outer-form">
          <div className="laboratory-form" id="download-form">
            <div className="form-row">
              <div className="form-group col-md-2">
                <img src={Logo} alt="logo" width="100%" height="90%" />
              </div>
              <div className="form-group col-md-8">
                <p>
                  <b>
                    Bệnh viện Da liễu Trung ương
                    <br />
                    15A Phương Mai - Đống Đa - Hà Nội
                    <br />
                    Website:
                    {' '}
                    <a href="http://dalieu.vn" style={{ color: 'black' }}>
                      http://dalieu.vn
                    </a>
                  </b>
                </p>
                <p style={{ textAlign: 'center', fontSize: '24px' }}>
                  <b>THÔNG TIN BỆNH NHÂN</b>
                </p>

                <p style={{ textAlign: 'center', fontSize: '14px', fontStyle: 'italic' }}>
                  (Kết quả chẩn đoán và xét nghiệm được lấy từ lần cuối bệnh nhân khám và xét nghiệm)
                </p>
              </div>

              <div className="form-group col-md-2">
                <div>
                  <label htmlFor="patientId">
                    Mã BN:
                    {' '}
                    {patientId}
                  </label>
                </div>
              </div>
            </div>

            {/* form fields */}
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="username">
                  Họ tên người bệnh:
                  {' '}
                  {name}
                </label>
              </div>

              <div className="form-group col-md-3">
                <label htmlFor="birthDate">
                  Năm sinh:
                  {' '}
                  {birthDate}
                </label>
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="gender">
                  Giới tính:
                  {' '}
                  {gender}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="address">
                  Địa chỉ:
                  {' '}
                  {address}
                </label>
              </div>

              <div className="form-group col-md-5">
                <label htmlFor="patientType">
                  Đối tượng:
                  {' '}
                  {patientType}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="diagnosis">
                  Chẩn đoán của bác sĩ:
                  {' '}
                  {diagnosis}
                </label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="number">
                  Số BHYT:
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="department">
                  Khoa phòng:
                  {' '}
                  PK
                  {department}
                </label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="doctor">
                  Bác sĩ:
                  {' '}
                  {doctor}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="fungus">
                  Kết quả xét nghiệm nấm - kí sinh trùng:
                  {' '}
                  {fungusAndParasiteDiagnosis}
                </label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="biochemical">
                  Kết quả xét nghiệm sinh hóa máu:
                  {' '}
                  {biochemicalDiagnosis}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="hematology">
                  Kết quả xét nghiệm huyết học - miễn dịch:
                  {' '}
                  {hematologyAndImmunologyDiagnosis}
                </label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="result">
                  Kết quả xét nghiệm tổng quát:
                  {' '}
                  {resultDiagnosis}
                </label>
              </div>
            </div>

          </div>
        </div>
      )}

      {!done && !getState && images.length === 0 && (
        <div className="p-5 text-center">
          <h6 className="mb-3">Đang tải thông tin bệnh nhân...</h6>
        </div>
      )}

      {getState && done && (
      <div>
        <br />
        <div className="form-row justify-content-center">

          <button className="btn btn-primary" onClick={downloadForm}>
            Tải hồ sơ bệnh nhân
          </button>
        </div>
      </div>
      )}
    </>
  );
}

export default PatientInfo;
