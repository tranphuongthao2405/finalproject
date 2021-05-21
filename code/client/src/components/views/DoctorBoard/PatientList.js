/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import axios from 'axios';

function PatientList() {
  const [patients, setPatients] = useState();
  const [showTable, setShowTable] = useState(false);
  // state to check process
  const [imagingState, setImagingState] = useState([]);
  const [biochemicalCheck, setBioChemicalCheck] = useState([]);
  const [fungusAndParasiteCheck, setFungusAndParasiteCheck] = useState([]);
  const [hematologyAndImmunologyCheck, setHematologyAndImmunologyCheck] = useState([]);

  let count = 0;

  useEffect(() => {
    axios.get('/api/patients/getAllPatients').then((response) => {
      if (response.data.success) {
        setShowTable(true);
        setPatients(response.data.patients);
      } else {
        setShowTable(false);
      }
    });
  }, [patients]);

  return (
    <div>
      <div className="p-5 text-center">
        <h3 className="mb-3">DANH SÁCH BỆNH NHÂN TIẾP NHẬN</h3>
      </div>
      {patients && patients.length > 0 && setShowTable && (
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
                Cần chụp chẩn đoán hình ảnh
              </th>
              <th scope="col" style={{ width: '10%' }}>
                Cần xét nghiệm sinh hóa máu
              </th>
              <th scope="col" style={{ width: '10%' }}>
                Cần xét nghiệm nấm - ký sinh trùng
              </th>
              <th scope="col" style={{ width: '10%' }}>
                Cần xét nghiệm huyết học - miễn dịch
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

                  const values = {
                    patientId: patient.patientId,
                  };

                  axios.post('/api/diagnosis/getDiagnosisById', values).then((response) => {
                    if (response.data.success) {
                      if (response.data.doc[0].biochemical === 'done') {
                        biochemicalCheck[pCount] = 'Đã xong';
                      } else if (response.data.doc[0].biochemical === 'pending') {
                        biochemicalCheck[pCount] = 'Có';
                      } else if (response.data.doc[0].biochemical === '') {
                        biochemicalCheck[pCount] = 'Không';
                      } else if (response.data.doc[0].biochemical === 'processing') {
                        biochemicalCheck[pCount] = 'Chưa xử lý';
                      }

                      if (response.data.doc[0].hematologyAndImmunology === 'done') {
                        hematologyAndImmunologyCheck[pCount] = 'Đã xong';
                      } else if (response.data.doc[0].hematologyAndImmunology === 'pending') {
                        hematologyAndImmunologyCheck[pCount] = 'Có';
                      } else if (response.data.doc[0].hematologyAndImmunology === '') {
                        hematologyAndImmunologyCheck[pCount] = 'Không';
                      } else if (response.data.doc[0].hematologyAndImmunology === 'processing') {
                        hematologyAndImmunologyCheck[pCount] = 'Chưa xử lý';
                      }

                      if (response.data.doc[0].fungusAndParasite === 'done') {
                        fungusAndParasiteCheck[pCount] = 'Đã xong';
                      } else if (response.data.doc[0].fungusAndParasite === 'pending') {
                        fungusAndParasiteCheck[pCount] = 'Có';
                      } else if (response.data.doc[0].fungusAndParasite === '') {
                        fungusAndParasiteCheck[pCount] = 'Không';
                      } else if (response.data.doc[0].fungusAndParasite === 'processing') {
                        fungusAndParasiteCheck[pCount] = 'Chưa xử lý';
                      }

                      if (response.data.doc[0].imaging === 'done') {
                        imagingState[pCount] = 'Đã xong';
                      } else if (response.data.doc[0].imaging === 'pending') {
                        imagingState[pCount] = 'Có';
                      } else if (response.data.doc[0].imaging === '') {
                        imagingState[pCount] = 'Không';
                      } else if (response.data.doc[0].fungusAndParasite === 'processing') {
                        fungusAndParasiteCheck[pCount] = 'Chưa xử lý';
                      }
                    } else {
                      // do something
                    }
                  });
                  return ((
                    <tr>
                      <td className="text-center">{count}</td>
                      <td className="text-center"><a href={`/doctorBoard/${patient.patientId}`} style={{ textDecoration: 'none' }}>{patient.name}</a></td>
                      <td className="text-center">{patient.patientId}</td>
                      <td className="text-center">{time}</td>
                      <td className="text-center">{patient.gender}</td>
                      <td className="text-center">{imagingState[pCount] === 'Đã xong' ? (<a href={`/imageProcessing/${patient.patientId}`} style={{ textDecoration: 'none' }}>Đã xong</a>) : (`${imagingState[pCount]}`)}</td>
                      <td className="text-center">{biochemicalCheck[pCount]}</td>
                      <td className="text-center">{fungusAndParasiteCheck[pCount]}</td>
                      <td className="text-center">{hematologyAndImmunologyCheck[pCount]}</td>
                    </tr>
                  ));
                })
            }
          </tbody>
        </table>
      ) }
    </div>
  );
}

export default PatientList;
