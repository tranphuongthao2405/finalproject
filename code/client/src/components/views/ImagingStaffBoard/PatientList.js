/* eslint-disable max-len */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientList() {
  const [patients, setPatients] = useState();
  const [showTable, setShowTable] = useState(false);
  const [imagingState, setImagingState] = useState([]);
  const [doctorDiagnosis, setDoctorDiagnosis] = useState([]);

  let count = 0;
  let tempCount = 0;

  useEffect(() => {
    axios.get('/api/patients/getAllPatients').then((response) => {
      if (response.data.success) {
        setPatients(response.data.patients);
      } else {
        setShowTable(false);
      }
    });
  }, []);

  useEffect(() => {
    if (patients) {
      for (let i = 0; i < patients.length; i += 1) {
        const values = {
          patientId: patients[i].patientId,
        };

        axios.post('/api/diagnosis/getDiagnosisById', values).then((response) => {
          if (response.data.success) {
            if (response.data.doc[0].doctorDiagnosis !== '') {
              doctorDiagnosis[tempCount] = response.data.doc[0].doctorDiagnosis;

              if (response.data.doc[0].imaging === 'done') {
                imagingState[tempCount] = 'Đã xong';
              } else if (response.data.doc[0].biochemical === 'pending') {
                imagingState[tempCount] = 'Có';
              } else if (response.data.doc[0].biochemical === '') {
                imagingState[tempCount] = 'Không';
              }
            } else {
              doctorDiagnosis[tempCount] = 'Chưa chẩn đoán';
              imagingState[tempCount] = 'Chưa xử lý';
            }

            tempCount += 1;
            if (tempCount === patients.length) {
              setShowTable(true);
            }
          } else {
            // do something
            setShowTable(false);
          }
        });
      }
    }
  }, [patients, showTable]);

  return (
    <div>
      <div className="p-5 text-center">
        <h3 className="mb-3">HƯỚNG DẪN</h3>
        <p>Ấn vào tên bệnh nhân cần chụp chẩn đoán hình ảnh để tiến hành</p>
      </div>
      <div className="p-5 text-center">
        <h3 className="mb-3">DANH SÁCH BỆNH NHÂN TIẾP NHẬN</h3>
      </div>
      {patients && patients.length > 0 && showTable ? (
        <table className="table table-bordered">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th scope="col" style={{ width: '5%' }}>
                STT
              </th>
              <th scope="col" style={{ width: '15%' }}>
                Họ tên
              </th>
              <th scope="col" style={{ width: '5%' }}>
                Mã bệnh nhân
              </th>
              <th scope="col" style={{ width: '10%' }}>
                Ngày sinh
              </th>
              <th scope="col" style={{ width: '5%' }}>
                Giới tính
              </th>
              <th scope="col" style={{ width: '10%' }}>
                Chẩn đoán của bác sĩ
              </th>
              <th scope="col" style={{ width: '10%' }}>
                Cần chụp chẩn đoán hình ảnh
              </th>
            </tr>
          </thead>
          <tbody>
            {
                 patients.map((patient) => {
                   const fulltime = patient.birthDate;
                   const day = fulltime.substring(8, 10);
                   const month = fulltime.substring(5, 7);
                   const year = fulltime.substring(0, 4);
                   const time = `${day}/${month}/${year}`;
                   count += 1;
                   const pCount = count - 1;

                   return ((
                     <tr>
                       <td className="text-center">{count}</td>
                       <td className="text-center">{imagingState[pCount] !== 'Đã xong' && imagingState[pCount] !== 'Chưa xử lý' ? (<a href={`/imagingStaffBoard/${patient.patientId}`} style={{ textDecoration: 'none' }}>{patient.name}</a>) : (patient.name)}</td>
                       <td className="text-center">{patient.patientId}</td>
                       <td className="text-center">{time}</td>
                       <td className="text-center">{patient.gender}</td>
                       <td className="text-center">{doctorDiagnosis[pCount]}</td>
                       <td className="text-center">{imagingState[pCount] === 'Đã xong' ? (<a href={`/imageProcessing/${patient.patientId}`} style={{ textDecoration: 'none' }}>{imagingState[pCount]}</a>) : (imagingState[pCount])}</td>
                     </tr>
                   ));
                 })
            }
          </tbody>
        </table>
      ) : (
        <div className="p-5 text-center">
          <h6 className="mb-3">Đang tải danh sách bệnh nhân...</h6>
        </div>
      ) }
    </div>
  );
}

export default PatientList;
