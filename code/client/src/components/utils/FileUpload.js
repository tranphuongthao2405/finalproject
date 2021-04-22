import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';

function FileUpload(props) {
  const [images, setImages] = useState([]);

  const onDrop = (files) => {
    const formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);
    // save the Image we chose inside the Node Server
    Axios.post('/api/patient/uploadImage', formData, config).then(
      (response) => {
        if (response.data.success) {
          setImages([...images, response.data.image]);
          props.refreshFunction([...images, response.data.image]);
        } else {
          alert('Failed to save images');
        }
      },
    );
  };

  const onDelete = (image) => {
    const currentIndex = images.indexOf(image);

    const newImages = [...images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
    props.refreshFunction(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '35%',
              height: '400px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: '60%',
          height: '400px',
          border: '1px solid lightgray',
          overflowX: 'scroll',
          overflowY: 'hidden',
        }}
      >
        {images.map((image, index) => (
          <div onClick={() => onDelete(image)}>
            <img
              style={{ minWidth: '400px', width: '400px', height: '400px' }}
              src={`http://localhost:5000/${image}`}
              alt={`patientImage-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
