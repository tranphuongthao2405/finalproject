/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

function ImageProcessing(props) {
  const patientId = props.match.params.id;

  const [images, setImages] = useState([]);
  const [imageProcessing, setImageProcessing] = useState([]);
  const [done, setDone] = useState(false);

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
    const dataToSubmit = {
      patientId,
    };

    axios.post('/api/diagnosis/imagingDiagnosis/getImagingDiagnosisById', dataToSubmit)
      .then((response) => {
        if (response.data.success) {
          if (response.data.doc[0] !== undefined) {
            setImages(response.data.doc[0].images);
            setImageProcessing(response.data.doc[0].imagingDiagnosis);
            const dataToSubmit2 = {
              patientId,
              imaging: 'done',
            };

            axios.post('/api/diagnosis/updateImagingDiagnosis', dataToSubmit2).then((res) => {
              if (res.data.success) {
                // alert('Update information successfully');
                setDone(true);
              } else {
                alert('Failed to update information');
              }
            });
          }
        } else {
          console.log(response.data.err);
        }
      });
  }, []);

  useEffect(() => {
    if (done) {
      populateTableData();
    }
  }, [done]);

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Kết quả phân tích ảnh</Title>
      </div>

      {images && done ? (
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
      ) : (
        <div className="p-5 text-center">
          <h6 className="mb-3">Đang tải kết quả phân tích ảnh...</h6>
        </div>
      )}
      <br />
      <br />

      {/* <div className="form-row text-center justify-content-center">
        <button className="btn btn-primary btn-block col-md-3">
          <a href="/imagingPatientList" style={{ textDecoration: 'none', color: 'white' }}>Quay về trang chủ</a>
        </button>
      </div> */}
    </div>
  );
}

export default ImageProcessing;
