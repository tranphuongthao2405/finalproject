/* eslint-disable max-len */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
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
  const [resultCheck, setResultCheck] = useState([]);
  const [doneDiagnosis, setDoneDiagnosis] = useState([]);

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
              doneDiagnosis[tempCount] = true;
              if (response.data.doc[0].imaging === 'done') {
                imagingState[tempCount] = 'Đã xong';
              } else if (response.data.doc[0].biochemical === 'pending') {
                imagingState[tempCount] = 'Có';
              } else if (response.data.doc[0].biochemical === '') {
                imagingState[tempCount] = 'Không';
              }

              if (response.data.doc[0].biochemical === 'done') {
                biochemicalCheck[tempCount] = 'Đã xong';
              } else if (response.data.doc[0].biochemical === 'pending') {
                biochemicalCheck[tempCount] = 'Có';
              } else if (response.data.doc[0].biochemical === '') {
                biochemicalCheck[tempCount] = 'Không';
              }

              if (response.data.doc[0].hematologyAndImmunology === 'done') {
                hematologyAndImmunologyCheck[tempCount] = 'Đã xong';
              } else if (response.data.doc[0].hematologyAndImmunology === 'pending') {
                hematologyAndImmunologyCheck[tempCount] = 'Có';
              } else if (response.data.doc[0].hematologyAndImmunology === '') {
                hematologyAndImmunologyCheck[tempCount] = 'Không';
              }

              if (response.data.doc[0].fungusAndParasite === 'done') {
                fungusAndParasiteCheck[tempCount] = 'Đã xong';
              } else if (response.data.doc[0].fungusAndParasite === 'pending') {
                fungusAndParasiteCheck[tempCount] = 'Có';
              } else if (response.data.doc[0].fungusAndParasite === '') {
                fungusAndParasiteCheck[tempCount] = 'Không';
              }

              if (response.data.doc[0].result === 'done') {
                resultCheck[tempCount] = 'Đã xong';
              } else if (response.data.doc[0].result === 'pending') {
                resultCheck[tempCount] = 'Có';
              } else if (response.data.doc[0].result === '') {
                resultCheck[tempCount] = 'Không';
              }
            } else {
              doneDiagnosis[tempCount] = false;
              imagingState[tempCount] = 'Chưa xử lý';
              fungusAndParasiteCheck[tempCount] = 'Chưa xử lý';
              biochemicalCheck[tempCount] = 'Chưa xử lý';
              hematologyAndImmunologyCheck[tempCount] = 'Chưa xử lý';
              resultCheck[tempCount] = 'Chưa xử lý';
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
      <div>
        <h3 className="mb-3">HƯỚNG DẪN:</h3>
        <p>
          1. Chọn bệnh nhân cần chẩn đoán (Tên bệnh nhân được in xanh)
          <br />
          2. Thực hiện khám và đưa ra chẩn đoán sơ bộ ban đầu
          <br />
          3. Sau khi chẩn đoán, theo dõi trạng thái xét nghiệm và các chẩn đoán hình ảnh của bệnh nhân
          <br />
          4. Có thể ấn vào xem chi tiết thông tin về các xét nghiệm và các ảnh chụp chẩn đoán của bệnh nhân nếu có trạng thái 'Đã xong'
        </p>
      </div>

      <div className="p-5 text-center">
        <h3 className="mb-3">DANH SÁCH BỆNH NHÂN TIẾP NHẬN</h3>
      </div>
      {patients && patients.length > 0 && showTable ? (
        <table className="table table-bordered">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th scope="col" style={{ width: '2%' }}>
                STT
              </th>
              <th scope="col" style={{ width: '12%' }}>
                Họ tên
              </th>
              <th scope="col" style={{ width: '5%' }}>
                Mã bệnh nhân
              </th>
              <th scope="col" style={{ width: '6%' }}>
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
              <th scope="col" style={{ width: '10%' }}>
                Phiếu xét nghiệm tổng quan
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
                      <td className="text-center">{doneDiagnosis[pCount] ? (`${patient.name} (Đã chẩn đoán)`) : (<a href={`/doctorBoard/${patient.patientId}`} style={{ textDecoration: 'none' }}>{patient.name}</a>)}</td>
                      <td className="text-center">{patient.patientId}</td>
                      <td className="text-center">{time}</td>
                      <td className="text-center">{patient.gender}</td>
                      <td className="text-center">{imagingState[pCount] === 'Đã xong' ? (<a href={`/imageProcessing/${patient.patientId}`} style={{ textDecoration: 'none' }}>Đã xong</a>) : (`${imagingState[pCount]}`)}</td>
                      <td className="text-center">{biochemicalCheck[pCount]}</td>
                      <td className="text-center">{fungusAndParasiteCheck[pCount]}</td>
                      <td className="text-center">{hematologyAndImmunologyCheck[pCount]}</td>
                      <td className="text-center">{resultCheck[pCount]}</td>
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
      )}
    </div>
  );
}

export default PatientList;
