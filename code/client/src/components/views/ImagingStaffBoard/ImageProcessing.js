/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

function ImageProcessing(props) {
  const patientId = props.match.params.id;

  const [images, setImages] = useState([]);
  const [imageProcessing, setImageProcessing] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Kết quả phân tích ảnh</Title>
      </div>
    </div>
  );
}

export default ImageProcessing;
