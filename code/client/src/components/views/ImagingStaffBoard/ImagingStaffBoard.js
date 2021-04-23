/* eslint-disable no-lonely-if */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import {
  Form, Input, Button, Typography,
} from 'antd';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;

function ImagingStaffBoard() {
  const [patientId, setPatientId] = useState();
  const [images, setImages] = useState([]);
  const [id, setId] = useState();

  const updateImages = (newImage) => {
    setImages(newImage);
  };

  const onChangePatientId = (e) => {
    setPatientId(e.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (
      !patientId
      || !images
    ) {
      alert('Please fill out all the fields');
    } else {
      if (patientId !== undefined) {
        const values1 = { patientId };
        axios.post('/api/patients/getPatientById', values1)
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.patient[0]);
              setId(response.data.patient[0]._id);

              const values2 = {
                id,
                images,
              };

              axios.post('/api/diagnosis/updateImage', values2).then((res) => {
                if (res.data.success) {
                  alert('Update information successfully');
                } else {
                  alert('Failed to update information');
                }
              });
            } else {
              alert(response.data.err);
            }
          });
      }
    }
  };

  return (
    <div style={{ maxWidth: '90%', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Tải ảnh chụp chẩn đoán của bệnh nhân</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div className="form-group row justify-content-center">
          <label style={{ display: 'block', marginTop: 10 }} className="col-md-1">Mã BN:</label>
          <Input className="form-group col-md-2" style={{ marginTop: '5px' }} onChange={onChangePatientId} value={patientId} />
        </div>
        <br />
        <br />
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <div className="form-group row justify-content-center">
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </Form>
    </div>
  );
}

export default ImagingStaffBoard;
