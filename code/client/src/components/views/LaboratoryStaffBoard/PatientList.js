/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PatientList() {
  const [patients, setPatients] = useState();
  const [showTable, setShowTable] = useState(false);
  // state to check process
  const [doctorDiagnosis, setDoctorDiagnosis] = useState([]);
  const [biochemicalCheck, setBioChemicalCheck] = useState([]);
  const [fungusAndParasiteCheck, setFungusAndParasiteCheck] = useState([]);
  const [hematologyAndImmunologyCheck, setHematologyAndImmunologyCheck] = useState([]);
  const [resultCheck, setResultCheck] = useState([]);
  const [pId, setPId] = useState([]);

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
            pId[tempCount] = [response.data.doc[0].patientId];
            if (response.data.doc[0].doctorDiagnosis !== '') {
              doctorDiagnosis[tempCount] = response.data.doc[0].doctorDiagnosis;

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
              doctorDiagnosis[tempCount] = 'Chưa chẩn đoán';
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

  const showBiochemicalResult = (value, id) => {
    if (value === 'Có') {
      return (<a href={`/laboratoryStaffBoard/biochemical/${id}`} style={{ textDecoration: 'none' }}>Có</a>);
    } if (value === 'Đã xong') {
      return (<a href={`/biochemicalForm/${id}`} style={{ textDecoration: 'none' }}>Đã xong</a>);
    }
    return ('Không');
  };

  const showFungusResult = (value, id) => {
    if (value === 'Có') {
      return (<a href={`/laboratoryStaffBoard/fungusAndParasite/${id}`} style={{ textDecoration: 'none' }}>Có</a>);
    } if (value === 'Đã xong') {
      return (<a href={`/fungusForm/${id}`} style={{ textDecoration: 'none' }}>Đã xong</a>);
    }
    return ('Không');
  };

  const showHematologyResult = (value, id) => {
    if (value === 'Có') {
      return (<a href={`/laboratoryStaffBoard/hematologyAndImmunology/${id}`} style={{ textDecoration: 'none' }}>Có</a>);
    } if (value === 'Đã xong') {
      return (<a href={`/hematologyForm/${id}`} style={{ textDecoration: 'none' }}>Đã xong</a>);
    }
    return ('Không');
  };

  const showResult = (value, id) => {
    if (value === 'Có') {
      return (<a href={`/laboratoryStaffBoard/result/${id}`} style={{ textDecoration: 'none' }}>Có</a>);
    } if (value === 'Đã xong') {
      return (<a href={`/resultForm/${id}`} style={{ textDecoration: 'none' }}>Đã xong</a>);
    }
    return ('Không');
  };

  const search = () => {
    // Declare variables
    let td; let i; let txtValue;
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('labTable');
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
                      <input type="text" className="form-control" placeholder="Tìm kiếm theo mã bệnh nhân&hellip;" id="searchInput" onKeyUp={search} />
                    </div>
                  </div>
                </div>
              </div>
              <table
                data-search="true"
                tabIndex={-1}
                data-search-on-enter-key="true"
                id="labTable"
                className="table table-striped table-hover table-bordered"
              >
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
                      Chẩn đoán của bác sĩ
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
                      Xét nghiệm tổng quát
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
                      <td className="text-center">{patient.name}</td>
                      <td className="text-center">{patient.patientId}</td>
                      <td className="text-center">{time}</td>
                      <td className="text-center">{patient.gender}</td>
                      <td className="text-center">{doctorDiagnosis[pCount]}</td>
                      <td className="text-center">
                        {showBiochemicalResult(biochemicalCheck[pCount], patient.patientId)}
                      </td>
                      <td className="text-center">
                        {showFungusResult(fungusAndParasiteCheck[pCount], patient.patientId)}
                      </td>
                      <td className="text-center">
                        {showHematologyResult(hematologyAndImmunologyCheck[pCount], patient.patientId)}
                      </td>
                      <td className="text-center">
                        {showResult(resultCheck[pCount], patient.patientId)}
                      </td>
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
      )}
    </div>
  );
}

export default React.memo(PatientList);
