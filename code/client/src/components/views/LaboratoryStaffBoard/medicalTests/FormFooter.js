import React from 'react';

function FormFooter() {
  const date = new Date().toLocaleString('en-GB');
  return (
    <div className="form-row">
      <div className="col">
        <p style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center' }}>
          Chỉ định ngày
          {' '}
          {date}
        </p>
      </div>
      <div className="col">
        <p style={{ fontStyle: 'italic', textAlign: 'center' }}>
          In phiếu ngày
          {' '}
          {date}
        </p>
        <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
          BÁC SĨ ĐIỀU TRỊ
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default FormFooter;
