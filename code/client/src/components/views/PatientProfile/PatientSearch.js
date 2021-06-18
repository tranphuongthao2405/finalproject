/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

function PatientSearch() {
  const [patientId, setPatientId] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [patients, setPatients] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [searchTerms, setSearchTerms] = useState({
    diagnosis: '',
    patientId: '',
  });

  const [noInfo, setNoInfo] = useState(false);

  const getPatients = (variables) => {
    if (variables.searchTerm !== undefined && variables.searchTerm.patientId !== '') {
      axios.get(`/api/patients/getPatientById?id=${variables.searchTerm.patientId}`)
        .then((response) => {
          if (response.data.success) {
            setPatients(response.data.patient);
          } else {
            alert(response.data.err);
          }
        });

      axios.get(`/api/diagnosis/getDiagnosisById?patientId=${variables.searchTerm.patientId}`).then((response) => {
        if (response.data.success) {
          setDiagnosis(response.data.doc[0].doctorDiagnosis);
          setShowInfo(true);
        } else {
          setShowInfo(false);
          // do something
        }
      });
    } else if (variables.searchTerm !== undefined && variables.searchTerm.patientId === '' && variables.searchTerm.diagnosis !== '') {
      const dataToSubmit = {
        diagnosis: variables.searchTerm.diagnosis,
      };
      axios.post('/api/diagnosis/getDiagnosis', dataToSubmit).then((response) => {
        if (response.data.success) {
          for (let i = 0; i < response.data.doc.length; i += 1) {
            if (response.data.doc[i] !== undefined) {
              axios.get(`/api/patients/getPatientById?id=${response.data.doc[i].patientId}`)
                .then((res) => {
                  if (res.data.success) {
                    patients[i] = res.data.patient[0];
                    if (i === response.data.doc.length - 1) {
                      setShowInfo(true);
                    }
                  } else {
                    setShowInfo(false);
                    // alert(res.data.err);
                  }
                });
            }
          }
        } else {
          // do something
        }
      });
    }
  };

  useEffect(() => {
    const variables = {
      skip,
      limit,
    };

    if (variables.searchTerm === undefined) {
      setNoInfo(true);
    }
    getPatients(variables);
  }, []);

  const onChangePatientId = (e) => {
    setPatientId(e.target.value);
    searchTerms.patientId = e.target.value;
    setShowInfo(false);
  };

  const onChangeDiagnosis = (e) => {
    setDiagnosis(e.target.value);
    searchTerms.diagnosis = e.target.value;
    setShowInfo(false);
  };

  const search = () => {
    const variables = {
      skip: 0,
      limit,
      searchTerm: searchTerms,
    };
    if (searchTerms.patientId === '' && searchTerms.diagnosis === '') {
      setNoInfo(true);
    }
    setSkip(0);
    getPatients(variables);
  };

  const onLoadMore = () => {
    const skipTemp = skip + limit;
    const variables = {
      skip: skipTemp,
      limit,
      loadMore: true,
      searchTerm: searchTerms,
    };
    getPatients(variables);
    setSkip(skipTemp);
  };

  return (
    <div>
      <div
        className="searchBox"
        style={{
          backgroundColor: '#eeeeee', padding: 30, borderRadius: '10px', width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2}>Tìm kiếm thông tin bệnh nhân</Title>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <label className="col-md-4" htmlFor="patientId" style={{ marginTop: 5, marginLeft: 10 }}>
                Mã bệnh nhân:
              </label>
              <input
                type="text"
                className="form-control col-md-7"
                patientId="patientId"
                value={searchTerms.patientId}
                onChange={onChangePatientId}
              />
            </div>
          </div>
          <br />
          <br />

          <div className="col-md-12">
            <div className="row">
              <label className="col-md-4" htmlFor="diagnosis" style={{ marginTop: 5, marginLeft: 10 }}>
                Chẩn đoán bệnh:
              </label>
              <input
                type="text"
                className="form-control col-md-7"
                patientId="diagnosis"
                value={searchTerms.diagnosis}
                onChange={onChangeDiagnosis}
              />
            </div>
          </div>
        </div>

        <br />

        <div className="form-row justify-content-center">
          <button className="btn btn-primary" onClick={search}>
            Tìm kiếm
          </button>
        </div>

        {postSize >= limit && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={onLoadMore}>Tải thêm</button>
        </div>
        )}
      </div>
      <br />
      <br />

      {patients && patients.length > 0 && showInfo ? patients.map((patient) => (
        <div>
          <div
            className="row"
            style={{
              backgroundColor: '#eeeeee',
              borderRadius: '10px',
              width: '100%',
              marginLeft: 2,
              paddingLeft: 10,
            }}
          >

            <div className="col-md-9">
              <p style={{ paddingTop: 10 }}>
                Họ tên bệnh nhân:
                {' '}
                {patient.name}
              </p>
              <p>
                Chẩn đoán:
                {' '}
                {diagnosis}
              </p>
            </div>
            <div className="col-md-2" style={{ marginTop: '4%' }}>
              <a href={`/patientProfile/${patient.patientId}`} style={{ textDecoration: 'none' }}>Xem chi tiết</a>
            </div>
          </div>
          <br />
        </div>
      )) : (
        <div>
          {noInfo ? (
            <div className="p-5 text-center">
              <h6 className="mb-3" style={{ fontStyle: 'italic' }}>
                Vui lòng nhập ít nhất một trong hai trường thông tin để tìm kiếm
                <br />
                {' '}
                thông tin bệnh nhân...
              </h6>
              {' '}
            </div>
          ) : (
            <div className="p-5 text-center">
              <h6 className="mb-3">Đang tải thông tin bệnh nhân...</h6>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PatientSearch;
