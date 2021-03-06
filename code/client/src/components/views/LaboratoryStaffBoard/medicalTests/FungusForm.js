/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import FormFooter from './FormFooter';
import Logo from './images/logo.jpg';

function FungusForm(props) {
// eslint-disable-next-line react/destructuring-assignment
  const patientId = props.match.params.id;

  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [patientType, setPatientType] = useState();
  const [department, setDepartment] = useState();
  const [diagnosis, setDiagnosis] = useState();

  const [caseType, setCaseType] = useState();

  // state for form field
  const [testName, setTestName] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [price, setPrice] = useState([]);
  const [amount, setAmount] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [payment, setPayment] = useState([]);
  const [diff, setDiff] = useState([]);
  const [total, setTotal] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [amountSum, setAmountSum] = useState(0);
  const [paymentSum, setPaymentSum] = useState(0);
  const [totalSum, setTotalSum] = useState(0);
  const [done, setDone] = useState(false);

  const calculateSum = (valueArr) => {
    let sum = 0;
    valueArr.forEach((value) => {
      const intValue = (value !== '') ? parseInt(value, 10) : 0;
      sum += intValue;
    });
    return sum;
  };

  const calculateAmountSum = () => {
    if (amount.length >= 1) {
      setAmountSum(calculateSum(amount));
    }
  };

  const calculatePaymentSum = () => {
    if (payment.length >= 1) {
      setPaymentSum(calculateSum(payment));
    }
  };

  const calculateTotalSum = () => {
    if (total.length >= 1) {
      setTotalSum(calculateSum(total));
    }
  };

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
      const newCell7 = newRow.insertCell(6);
      const newCell8 = newRow.insertCell(7);
      const newCell9 = newRow.insertCell(8);

      const value1 = testName[i];
      const value2 = quantity[i];
      const value3 = price[i];
      const value4 = amount[i];
      const value5 = insurance[i] === undefined ? '' : insurance[i];
      const value6 = payment[i];
      const value7 = diff[i] === undefined ? '' : diff[i];
      const value8 = total[i];

      // Append a text node to the cell
      newCell1.innerHTML = `<div class="text-center">${i + 1}</div>`;
      newCell2.innerHTML = `<div class="text-center">${value1}</div>`;
      newCell3.innerHTML = `<div class="text-center">${value2}</div>`;
      newCell4.innerHTML = `<div class="text-center">${value3}</div>`;
      newCell5.innerHTML = `<div class="text-center">${value4}</div>`;
      newCell6.innerHTML = `<div class="text-center">${value5}</div>`;
      newCell7.innerHTML = `<div class="text-center">${value6}</div>`;
      newCell8.innerHTML = `<div class="text-center">${value7}</div>`;
      newCell9.innerHTML = `<div class="text-center">${value8}</div>`;
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
        } else {
          alert('Kh??ng th??? t???i th??ng tin b???nh nh??n');
        }
      });

    const dataToSubmit = {
      patientId,
    };

    axios.post('/api/diagnosis/fungusAndParasiteDiagnosis/getFungusDiagnosisById', dataToSubmit)
      .then((response) => {
        if (response.data.success) {
          if (response.data.doc[0] !== undefined) {
            setCaseType(response.data.doc[0].caseType);
            setDiagnosis(response.data.doc[0].fungusDiagnosis);
            setTestName(response.data.doc[0].testname);
            setQuantity(response.data.doc[0].quantity);
            setPrice(response.data.doc[0].price);
            setAmount(response.data.doc[0].amount);
            setInsurance(response.data.doc[0].insurance);
            setPayment(response.data.doc[0].payment);
            setDiff(response.data.doc[0].diff);
            setTotal(response.data.doc[0].total);
            setDone(true);
          }
        } else {
          alert('Kh??ng th??? l???y th??ng tin phi???u x??t nghi???m n???m - k?? sinh tr??ng c???a b???nh nh??n');
        }
      });
  }, []);

  useEffect(() => {
    if (done) {
      calculateAmountSum();
      calculatePaymentSum();
      calculateTotalSum();
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
      const title = `${patientId}_phieunamkisinhtrung.pdf`;
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
                  <b>PHI???U N???M - K?? SINH TR??NG</b>
                </p>

                <div style={{ textAlign: 'center' }}>
                  {caseType === 'Th?????ng' ? (
                    <>
                      <div
                        className="form-check form-check-inline"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="casetype"
                          defaultChecked
                          value="Th?????ng"
                          required
                          disabled
                        />
                        Th?????ng
                      </div>

                      <div
                        className="form-check form-check-inline"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="casetype"
                          value="C???p c???u"
                          required
                          disabled
                        />
                        C???p c???u
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="form-check form-check-inline"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="casetype"
                          value="Th?????ng"
                          required
                          disabled
                        />
                        Th?????ng
                      </div>

                      <div
                        className="form-check form-check-inline"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="casetype"
                          defaultChecked
                          value="C???p c???u"
                          required
                          disabled
                        />
                        C???p c???u
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="patientId">
                  M?? BN:
                  {' '}
                  {patientId}
                </label>
              </div>
            </div>

            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
              <h4>TH???C HI???N X??T NGHI???M T???I KHU L???Y B???NH PH???M</h4>
            </div>

            {/* form fields */}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="username">
                  - H??? t??n ng?????i b???nh:
                  {' '}
                  {name}
                </label>
              </div>

              <div className="form-group col-md-4">
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

            <div className="form-group">
              <label htmlFor="address">
                - ?????a ch???:
                {' '}
                {address}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="patientType">
                - ?????i t?????ng:
                {' '}
                {patientType}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="department">
                - Khoa ph??ng:
                {' '}
                PK
                {department}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="diagnosis">
                - Ch???n ??o??n:
                {' '}
                {diagnosis}
              </label>
            </div>

            {/* TODO: add rows to table */}
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr style={{ textAlign: 'center' }}>
                  <th scope="col" style={{ width: '5%' }}>
                    STT
                    <br />
                    {' '}
                    (1)
                  </th>
                  <th scope="col" style={{ width: '25%' }}>
                    T??n x??t nghi???m
                    {' '}
                    <br />
                    {' '}
                    (2)
                  </th>
                  <th scope="col" style={{ width: '5%' }}>
                    S.L
                    {' '}
                    <br />
                    {' '}
                    (3)
                  </th>
                  <th scope="col">
                    ????n gi??
                    {' '}
                    <br />
                    {' '}
                    (4)
                  </th>
                  <th scope="col">
                    Th??nh ti???n
                    <br />
                    {' '}
                    (5)
                  </th>
                  <th scope="col">
                    B???o hi???m
                    <br />
                    {' '}
                    (6)
                  </th>
                  <th scope="col">
                    BN chi tr???
                    <br />
                    {' '}
                    (7)
                  </th>
                  <th scope="col">
                    Ch??nh l???ch
                    <br />
                    {' '}
                    (8)
                  </th>
                  <th scope="col">
                    BN ph???i tr???
                    <br />
                    {' '}
                    (7+8)
                  </th>
                </tr>
              </thead>
              <tbody />
              <tfoot>
                <tr />
                {/* TODO: complete function to count total amount */}
                <tr>
                  <td colSpan="4" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    T???ng
                  </td>
                  <td className="text-center">
                    {amountSum}
                  </td>
                  <td />
                  <td className="text-center">
                    {paymentSum}
                  </td>
                  <td />
                  <td className="text-center">
                    {totalSum}
                  </td>
                </tr>
              </tfoot>
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

export default FungusForm;
