import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      }
    });
  }, []);

  return (
    <div>
      <div className="p-5 text-center">
        <h3 className="mb-3">DANH SÁCH BỆNH NHÂN</h3>
      </div>
      {patients && patients.length > 0 && showTable && (
        <table className="table table-bordered">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th scope="col">
                STT
              </th>
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
              <th scope="col">
                Bác sĩ điều trị
              </th>
              <th scope="col">
                Phòng khám
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
                  return ((
                    <tr>
                      <td className="text-center">{count}</td>
                      <td className="text-center">{patient.name}</td>
                      <td className="text-center">{patient.patientId}</td>
                      <td className="text-center">{time}</td>
                      <td className="text-center">{patient.gender}</td>
                      <td className="text-center">{patient.address}</td>
                      <td className="text-center">{patient.patientType}</td>
                      <td className="text-center">{patient.doctor}</td>
                      <td className="text-center">{patient.department}</td>
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
