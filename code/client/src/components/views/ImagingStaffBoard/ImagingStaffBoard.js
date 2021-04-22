/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Form, Input, Button, Typography,
} from 'antd';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;

function ImagingStaffBoard() {
  const [patientId, setPatientId] = useState();
  const [images, setImages] = useState([]);

  const updateImages = (newImage) => {
    setImages(newImage);
  };

  const onChangePatientId = (e) => {
    setPatientId(e.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    if (
      patientId
      || !images
    ) {
      alert('Please fill out all the field');
    } else {
      const values = {
        patientId,
        images,
      };

    //   axios.post('/api/patient/uploadImagingDiagnosis', values).then((response) => {
    //     if (response.data.success) {
    //       alert('Upload tour successfully');
    //     } else {
    //       alert('Failed to upload tour');
    //     }
    //   });
    }
  };

  return (
    <div style={{ maxWidth: '90%', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Tải ảnh chụp chẩn đoán của bệnh nhân</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div className="form-group row justify-content-center">
          <label className="col-md-1">Mã BN:</label>
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
