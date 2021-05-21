/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
/* eslint-disable no-lonely-if */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from 'antd';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;

function ImagingStaffBoard(props) {
  const pId = props.match.params.id;

  const history = useHistory();
  const [images, setImages] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    if (images && images.length > 0) {
      const imagesArr = [];

      // eslint-disable-next-line no-unused-expressions
      images
        // eslint-disable-next-line array-callback-return
        && images.map((item) => {
          imagesArr.push({
            original: `http://localhost:5000/${item}`,
            thumbnail: `http://localhost:5000/${item}`,
          });
        });
      setImagesArray(imagesArr);
    }
  }, [images]);

  const updateImages = (newImage) => {
    setImages(newImage);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    setSuccessful(false);
    if (images.length !== []) {
      const dataToSubmit = {
        pId,
        images,
      };

      axios.post('/api/diagnosis/imagingDiagnosis/uploadImage', dataToSubmit).then((res) => {
        if (res.data.success) {
          // alert('Update information successfully');
        } else {
          alert('Failed to update information');
        }
      });

      const dataToSubmit2 = {
        imaging: 'done',
      };

      axios.post('/api/diagnosis/updateImagingDiagnosis', dataToSubmit2).then((res) => {
        if (res.data.success) {
          // alert('Update information successfully');
        } else {
          alert('Failed to update information');
        }
      });

      history.push(`/imageProcessing/${pId}`);
    }
  };

  return (
    <div style={{ maxWidth: '90%', margin: '2rem auto' }}>
      <div>
        <h3 className="mb-3">HƯỚNG DẪN:</h3>
        <p>
          1. Xem danh sách tiếp nhận bệnh nhân để xem thông tin các bệnh nhân cần chụp chẩn đoán
          <br />
          2. Thực hiện chụp chẩn đoán cho bệnh nhân
          <br />
          3.  Nhập mã bệnh nhân và upload các ảnh liên quan của bệnh nhân
        </p>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Tải ảnh chụp chẩn đoán của bệnh nhân</Title>
      </div>

      <form onSubmit={onSubmit}>
        <div className="form-group form-row justify-content-center">
          <label
            style={{ display: 'inline-block', marginTop: 10 }}
            className="col-md-1"
          >
            Mã BN:
          </label>
          {pId && (
            <input
              type="text"
              className="form-control col-md-2"
              name="patientId"
              value={pId}
              disabled
            />
          )}
        </div>
        <br />
        <br />
        <FileUpload refreshFunction={updateImages} />
        <br />
        <br />
        {imagesArray && imagesArray.length > 0 && (
          <div className="form-row justify-content-center">
            <ImageGallery items={imagesArray} />
          </div>
        )}

        <br />
        <br />
        <div className="form-row justify-content-center">
          <button className="btn btn-primary btn-block form-group col-md-3">
            Tiến hành phân tích ảnh
          </button>
        </div>
      </form>

    </div>
  );
}

export default ImagingStaffBoard;
