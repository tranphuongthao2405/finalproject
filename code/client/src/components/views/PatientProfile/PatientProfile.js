/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientAvatar from './images/patient_avatar.png';
import './PatientProfile.css';

function PatientProfile(props) {
  const patientId = props.match.params.id;
  const [patient, setPatient] = useState();
  const [diagnosis, setDiagnosis] = useState();

  useEffect(() => {
    axios.get(`/api/patients/getPatientById?id=${patientId}`)
      .then((response) => {
        if (response.data.success) {
          setPatient(response.data.patient[0]);
        } else {
          alert('Không thể tải thông tin bệnh nhân');
        }
      });

    axios.get(`/api/diagnosis/getDiagnosisById?patientId=${patientId}`).then((response) => {
      if (response.data.success) {
        setDiagnosis(response.data.doc[0]);
      } else {
        alert('Không thể tải thông tin chẩn đoán của bệnh nhân');
      }
    });
  }, []);

  const processBirthDate = (value) => {
    const fulltime = value;
    const day = fulltime.substring(8, 10);
    const month = fulltime.substring(5, 7);
    const year = fulltime.substring(0, 4);
    const time = `${day}/${month}/${year}`;
    return time;
  };

  return (
    <div className="container">
      <div className="profile-body">
        {patient && diagnosis && (
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src={PatientAvatar}
                    alt="Patient"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>{patient.name}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Họ tên đầy đủ</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {patient.name}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Mã bệnh nhân</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {patient.patientId}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Ngày sinh</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {processBirthDate(patient.birthDate)}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Giới tính</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {patient.gender}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Địa chỉ</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {patient.address}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Đối tượng</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {patient.patientType}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Bác sĩ điều trị</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {patient.doctor}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Phòng khám</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {patient.department}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Chẩn đoán của bác sĩ</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {diagnosis.doctorDiagnosis}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Kết quả xét nghiệm sinh hóa máu</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {diagnosis.biochemical === 'done' ? (
                      <a
                        style={{ textDecoration: 'none' }}
                        href={`/biochemicalForm/${patientId}`}
                      >
                        Xem chi tiết
                      </a>
                    ) : (<p>Chưa có thông tin</p>)}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Kết quả xét nghiệm nấm - kí sinh trùng</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {diagnosis.fungusAndParasite === 'done' ? (
                      <a
                        style={{ textDecoration: 'none' }}
                        href={`/fungusForm/${patientId}`}
                      >
                        Xem chi tiết
                      </a>
                    ) : (<p>Chưa có thông tin</p>)}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Kết quả xét nghiệm huyết học - miễn dịch</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {diagnosis.hematologyAndImmunology === 'done' ? (
                      <a
                        style={{ textDecoration: 'none' }}
                        href={`/hematologyForm/${patientId}`}
                      >
                        Xem chi tiết
                      </a>
                    ) : (<p>Chưa có thông tin</p>)}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Kết quả xét nghiệm tổng quan</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {diagnosis.result === 'done' ? (
                      <a
                        style={{ textDecoration: 'none' }}
                        href={`/resultForm/${patientId}`}
                      >
                        Xem chi tiết
                      </a>
                    ) : (<p>Chưa có thông tin</p>)}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <h6 className="mb-0">Kết quả chẩn đoán hình ảnh</h6>
                  </div>
                  <div className="col-sm-6 text-secondary">
                    {diagnosis.imaging === 'done' ? (
                      <a
                        style={{ textDecoration: 'none' }}
                        href={`/imageProcessing/${patientId}`}
                      >
                        Xem chi tiết
                      </a>
                    ) : (<p>Chưa có thông tin</p>)}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default PatientProfile;
