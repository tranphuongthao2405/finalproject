/* eslint-disable prefer-destructuring */
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
  const [pId, setPId] = useState([]);

  let count = 0;
  let tempCount = 0;

  useEffect(() => {
    axios.get('/api/patients/getAllPatients').then((response) => {
      if (response.data.success) {
        setPatients(response.data.patients);
      } else {
        setShowTable(false);
        alert('Không thể tải danh sách bệnh nhân');
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
            pId[tempCount] = [response.data.doc[0].patientId];
            if (response.data.doc[0].doctorDiagnosis !== '') {
              doctorDiagnosis[tempCount] = response.data.doc[0].doctorDiagnosis;

              if (response.data.doc[0].imaging === 'done') {
                imagingState[tempCount] = 'Đã xong';
              } else if (response.data.doc[0].imaging === 'pending') {
                imagingState[tempCount] = 'Có';
              } else if (response.data.doc[0].imaging === '') {
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
            setShowTable(false);
            alert('Không thể tải thông tin chẩn đoán của bệnh nhân');
          }
        });
      }
    }
  }, [patients, showTable]);

  const search = () => {
    // Declare variables
    let td; let i; let txtValue;
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('imgTable');
    const tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i += 1) {
      td = tr[i].getElementsByTagName('td')[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  };

  return (
    <div>
      {/* <div className="p-5 text-center">
        <h3 className="mb-3">HƯỚNG DẪN</h3>
        <p>Ấn vào tên bệnh nhân cần chụp chẩn đoán hình ảnh để tiến hành</p>
      </div> */}
      <div className="p-5 text-center">
        <h3 className="mb-3">DANH SÁCH BỆNH NHÂN TIẾP NHẬN</h3>
      </div>
      {patients && patients.length > 0 && showTable ? (
        <div className="container-fluid">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-8" />
                  <div className="col-sm-4">
                    <div className="search-box" style={{ width: '70%' }}>
                      <i className="material-icons">&#xE8B6;</i>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo mã bệnh nhân&hellip;"
                        id="searchInput"
                        onKeyUp={search}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <table
                data-search="true"
                tabIndex={-1}
                data-search-on-enter-key="true"
                className="table table-striped table-hover table-bordered"
                id="imgTable"
              >
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
                   let pCount;

                   for (let i = 0; i < pId.length; i += 1) {
                     if (pId[i].toString() === patient.patientId) {
                       pCount = i;
                       break;
                     }
                   }

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
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 text-center">
          <h6 className="mb-3">Đang tải danh sách bệnh nhân...</h6>
        </div>
      ) }
    </div>
  );
}

export default React.memo(PatientList);
