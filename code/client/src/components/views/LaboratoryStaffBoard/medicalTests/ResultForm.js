/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import FormFooter from './FormFooter';
import Logo from './images/logo.jpg';

function ResultForm(props) {
// eslint-disable-next-line react/destructuring-assignment
  const patientId = props.match.params.id;
  const date = new Date().toLocaleString('en-GB');

  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [patientType, setPatientType] = useState();
  const [department, setDepartment] = useState();
  const [doctor, setDoctor] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [successful, setSuccessful] = useState(false);

  // state for form field
  const [testName, setTestName] = useState([]);
  const [result, setResult] = useState([]);
  const [normalRate, setNormalRate] = useState([]);
  const [unit, setUnit] = useState([]);
  const [note, setNote] = useState([]);
  const [machine, setMachine] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [done, setDone] = useState(false);

  const onAddRow = () => {
    for (let i = 0; i < testName.length; i += 1) {
      const tableRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
      const newRow = tableRef.insertRow(tableRef.rows.length);

      // Insert a cell in the row at index 0
      const newCell1 = newRow.insertCell(0);
      const newCell2 = newRow.insertCell(1);
      const newCell3 = newRow.insertCell(2);
      const newCell4 = newRow.insertCell(3);
      const newCell5 = newRow.insertCell(4);
      const newCell6 = newRow.insertCell(5);

      const value1 = testName[i];
      const value2 = result[i];
      const value3 = normalRate[i];
      const value4 = unit[i];
      const value5 = note[i] === undefined ? ' ' : note[i];
      const value6 = machine[i];

      // Append a text node to the cell
      newCell1.innerHTML = `<div class="text-center">${value1}</div>`;
      newCell2.innerHTML = `<div class="text-center">${value2}</div>`;
      newCell3.innerHTML = `<div class="text-center">${value3}</div>`;
      newCell4.innerHTML = `<div class="text-center">${value4}</div>`;
      newCell5.innerHTML = `<div class="text-center">${value5}</div>`;
      newCell6.innerHTML = `<div class="text-center">${value6}</div>`;
    }
  };

  useEffect(() => {
    axios.get(`/api/patients/getPatientById?id=${patientId}`)
      .then((response) => {
        if (response.data.success) {
          const fulltime = response.data.patient[0].birthDate;
          const day = fulltime.substring(8, 10);
          const month = fulltime.substring(5, 7);
          const year = fulltime.substring(0, 4);
          const time = `${day}/${month}/${year}`;
          setName(response.data.patient[0].name);
          setAddress(response.data.patient[0].address);
          setGender(response.data.patient[0].gender);
          setBirthDate(time);
          setDepartment(response.data.patient[0].department);
          setPatientType(response.data.patient[0].patientType);
          setDoctor(response.data.patient[0].doctor);
        } else {
          alert('Kh??ng th??? t???i th??ng tin b???nh nh??n');
        }
      });

    const dataToSubmit = {
      patientId,
    };

    axios.post('/api/diagnosis/result/getResultDiagnosisById', dataToSubmit)
      .then((response) => {
        if (response.data.success) {
          if (response.data.doc[0] !== undefined) {
            setDiagnosis(response.data.doc[0].diagnosis);
            setTestName(response.data.doc[0].testname);
            setResult(response.data.doc[0].result);
            setNormalRate(response.data.doc[0].normalRate);
            setUnit(response.data.doc[0].unit);
            setNote(response.data.doc[0].note);
            setMachine(response.data.doc[0].machine);
            setDone(true);
          }
        } else {
          alert('Kh??ng th??? t???i th??ng tin ch???n ??o??n c???a b???nh nh??n');
        }
      });
  }, []);

  useEffect(() => {
    if (done) {
      onAddRow();
      setShowForm(true);
    }
  }, [done]);

  const downloadForm = () => {
    const divToDownload = document.getElementById('download-form');
    html2canvas(divToDownload, { scrollY: -window.scrollY }).then((canvas) => {
      const divImage = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(divImage);
      const width = 210;
      const height = (imgProps.height * width) / imgProps.width;
      pdf.addImage(divImage, 'png', 0, 10, width, height);
      const title = `${patientId}_phieuxetnghiem.pdf`;
      pdf.save(title);
    });
  };

  return (
    <>
      {done ? (
        <div className="outer-form">
          <div className="laboratory-form" id="download-form">
            <div className="form-row">
              <div className="form-group col-md-2">
                <img src={Logo} alt="logo" width="100%" height="90%" />
              </div>
              <div className="form-group col-md-8">
                <p>
                  <b>
                    B???nh vi???n Da li???u Trung ????ng
                    <br />
                    15A Ph????ng Mai - ?????ng ??a - H?? N???i
                    <br />
                    Website:
                    {' '}
                    <a href="http://dalieu.vn" style={{ color: 'black' }}>
                      http://dalieu.vn
                    </a>
                  </b>
                </p>
                <p style={{ textAlign: 'center', fontSize: '24px' }}>
                  <b>PHI???U K???T QU??? X??T NGHI???M</b>
                </p>
              </div>

              <div className="form-group col-md-2">
                <div>
                  <label htmlFor="patientId">
                    M?? BN:
                    {' '}
                    {patientId}
                  </label>
                </div>
                <div>
                  <label>
                    Ng??y NM:
                    {' '}
                    {date.substring(0, 10)}
                  </label>
                </div>
                <div>
                  <label>
                    Gi??? NM:
                    {' '}
                    {date.substring(11)}
                  </label>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
              <h4>TH???C HI???N X??T NGHI???M T???I KHU L???Y B???NH PH???M</h4>
            </div>

            {/* form fields */}
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="username">
                  H??? t??n ng?????i b???nh:
                  {' '}
                  {name}
                </label>
              </div>

              <div className="form-group col-md-3">
                <label htmlFor="birthDate">
                  N??m sinh:
                  {' '}
                  {birthDate}
                </label>
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="gender">
                  Gi???i t??nh:
                  {' '}
                  {gender}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="address">
                  ?????a ch???:
                  {' '}
                  {address}
                </label>
              </div>

              <div className="form-group col-md-5">
                <label htmlFor="patientType">
                  ?????i t?????ng:
                  {' '}
                  {patientType}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="diagnosis">
                  Ch???n ??o??n:
                  {' '}
                  {diagnosis}
                </label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="number">
                  S??? BHYT:
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="department">
                  Khoa ph??ng:
                  {' '}
                  PK
                  {department}
                </label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="doctor">
                  B??c s??:
                  {' '}
                  {doctor}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="getPerson">Ng?????i l???y m???u:</label>
              </div>

              <div className="form-group col-md-5">
                <label htmlFor="get">
                  Th???i gian l???y m???u:
                  {date.substring(11)}
                  {' '}
                  {' '}
                  {' '}
                  {date.substring(0, 10)}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-7">
                <label htmlFor="receivePerson">Ng?????i nh???n m???u: Administrator</label>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="receive">
                  {' '}
                  Th???i gian nh???n m???u:
                  {date.substring(11)}
                  {' '}
                  {' '}
                  {' '}
                  {date.substring(0, 10)}
                </label>
              </div>
            </div>

            {/* TODO: add rows to table */}
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th scope="col" style={{ width: '10%' }}>
                    T??N X??T NGHI???M
                  </th>
                  <th scope="col" style={{ width: '10%' }}>
                    K???T QU???
                  </th>
                  <th scope="col" style={{ width: '15%' }}>
                    TR??? S??? B??NH TH?????NG
                  </th>
                  <th scope="col">
                    ????N V???
                  </th>
                  <th scope="col">
                    GHI CH??
                  </th>
                  <th scope="col">
                    M??Y X??T NGHI???M
                  </th>
                </tr>
              </thead>
              <tbody />
            </table>

            <FormFooter />
          </div>
        </div>
      ) : ((
        <div className="p-5 text-center">
          <h6 className="mb-3">??ang t???i phi???u x??t nghi???m...</h6>
        </div>
      ))}

      {done && showForm && (
      <div>
        <br />
        <div className="form-row justify-content-center">

          <button className="btn btn-primary" onClick={downloadForm}>
            T???i phi???u x??t nghi???m
          </button>
        </div>
      </div>
      )}
    </>
  );
}

export default ResultForm;
