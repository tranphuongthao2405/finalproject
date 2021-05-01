/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
/* eslint-disable no-lonely-if */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { Typography } from 'antd';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;

// eslint-disable-next-line consistent-return
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Vui lòng điền đầy đủ thông tin bắt buộc
      </div>
    );
  }
};

function ImagingStaffBoard() {
  const form = useRef();
  const checkButton = useRef();

  const [patientId, setPatientId] = useState();
  const [images, setImages] = useState([]);
  const [id, setId] = useState();
  const [successful, setSuccessful] = useState(false);

  const updateImages = (newImage) => {
    setImages(newImage);
  };

  const onChangePatientId = (e) => {
    setPatientId(e.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    if (checkButton.current.context._errors.length === 0) {
      if (patientId !== undefined) {
        const values = { patientId };
        axios.post('/api/patients/getPatientById', values).then((response) => {
          if (response.data.success) {
            setId(response.data.patient[0]._id);

            if (id && images !== []) {
              const dataToSubmit = {
                patient: id,
                biochemical: '',
                fungusAndParasite: '',
                hematologyAndImmunology: '',
                result: '',
                images,
                doctorDiagnosis: '',
              };

              axios.post('/api/diagnosis/updateImage', dataToSubmit).then((res) => {
                if (res.data.success) {
                  alert('Update information successfully');
                } else {
                  alert('Failed to update information');
                }
              });
            }
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

      <Form onSubmit={onSubmit} ref={form}>
        <div className="form-group row justify-content-center">
          <label
            style={{ display: 'block', marginTop: 10 }}
            className="col-md-1"
          >
            Mã BN:
          </label>
          <Input
            type="text"
            className="form-control"
            name="patientId"
            value={patientId}
            onChange={onChangePatientId}
            validations={[required]}
          />
        </div>
        <br />
        <br />
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        <div className="form-row justify-content-center">
          <button className="btn btn-primary btn-block form-group col-md-3">
            Upload
          </button>
        </div>
        <CheckButton style={{ display: 'none' }} ref={checkButton} />
      </Form>
    </div>
  );
}

export default ImagingStaffBoard;
