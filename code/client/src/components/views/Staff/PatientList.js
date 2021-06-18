/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientsList.css';

function PatientList() {
  const [patients, setPatients] = useState();
  const [showTable, setShowTable] = useState(false);
  let count = 0;

  useEffect(() => {
    axios.get('/api/patients/getAllPatients').then((response) => {
      if (response.data.success) {
        setShowTable(true);
        setPatients(response.data.patients);
      } else {
        setShowTable(false);
        alert('Không thể tải danh sách bệnh nhân');
      }
    });
  }, []);

  const search = () => {
    // Declare variables
    let td; let i; let txtValue;
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('staffTable');
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
        <h3 className="mb-3">DANH SÁCH BỆNH NHÂN</h3>
      </div>
      {patients && patients.length > 0 && showTable && (
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
                id="staffTable"
              >
                <thead>
                  <tr>
                    <th>
                      STT
                    </th>
                    <th>
                      Họ tên
                    </th>
                    <th>
                      Mã bệnh nhân
                    </th>
                    <th>
                      Ngày sinh
                    </th>
                    <th>
                      Giới tính
                    </th>
                    <th>
                      Địa chỉ
                    </th>
                    <th>
                      Đối tượng
                    </th>
                    <th>
                      Bác sĩ điều trị
                    </th>
                    <th>
                      Phòng khám
                    </th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>

                  {patients.map(((patient) => {
                    const fulltime = patient.birthDate;
                    const day = fulltime.substring(8, 10);
                    const month = fulltime.substring(5, 7);
                    const year = fulltime.substring(0, 4);
                    const time = `${day}/${month}/${year}`;
                    count += 1;
                    return (
                      <tr id={patient.patientId}>
                        <td>{count}</td>
                        <td>{patient.name}</td>
                        <td>{patient.patientId}</td>
                        <td>{time}</td>
                        <td>{patient.gender}</td>
                        <td>{patient.address}</td>
                        <td>{patient.patientType}</td>
                        <td>{patient.doctor}</td>
                        <td>{patient.department}</td>
                        <td>
                          <a
                            href={`/patientsInfoUpdate/${patient.patientId}`}
                            className="edit"
                            title="Sửa"
                            data-toggle="tooltip"
                          >
                            <i
                              className="material-icons"
                            >
                              &#xE254;
                            </i>
                          </a>
                        </td>
                      </tr>
                    );
                  }))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) }
    </div>
  );
}

export default React.memo(PatientList);
