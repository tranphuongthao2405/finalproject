/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Logo from './images/logo.jpg';

function BiochemicalForm(props) {
// eslint-disable-next-line react/destructuring-assignment
  const patientId = props.match.params.id;
  const date = new Date().toLocaleString('en-GB');

  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [patientType, setPatientType] = useState();
  const [department, setDepartment] = useState();
  const [diagnosis, setDiagnosis] = useState();

  const [caseType, setCaseType] = useState();
  const [initialSample, setInitialSample] = useState();

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
          alert(response.data.err);
        }
      });

    const dataToSubmit = {
      patientId,
    };

    axios.post('/api/diagnosis/hematologyDiagnosis/getHematologyDiagnosisById', dataToSubmit)
      .then((response) => {
        if (response.data.success) {
          if (response.data.doc[0] !== undefined) {
            setCaseType(response.data.doc[0].caseType);
            setInitialSample(response.data.doc[0].initialSample);
            setDiagnosis(response.data.doc[0].hematologyDiagnosis);
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
          console.log(response.data.err);
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
      const title = `${patientId}_phieuhuyethocmiendich.pdf`;
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
                    Bệnh viện Da liễu Trung ương
                    <br />
                    15A Phương Mai - Đống Đa - Hà Nội
                    <br />
                    Website:
                    {' '}
                    <a href="http://dalieu.vn" style={{ color: 'black' }}>
                      http://dalieu.vn
                    </a>
                  </b>
                </p>
                <p style={{ textAlign: 'center', fontSize: '24px' }}>
                  <b>PHIẾU HUYẾT HỌC - MIỄN DỊCH</b>
                </p>

                <div style={{ textAlign: 'center' }}>
                  {caseType === 'Thường' ? (
                    <>
                      <div
                        className="form-check form-check-inline"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="casetype"
                          defaultChecked
                          value="Thường"
                          required
                          disabled
                        />
                        Thường
                      </div>

                      <div
                        className="form-check form-check-inline"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="casetype"
                          value="Cấp cứu"
                          required
                          disabled
                        />
                        Cấp cứu
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
                          value="Thường"
                          required
                          disabled
                        />
                        Thường
                      </div>

                      <div
                        className="form-check form-check-inline"
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          name="casetype"
                          defaultChecked
                          value="Cấp cứu"
                          required
                          disabled
                        />
                        Cấp cứu
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="patientId">
                  Mã BN:
                  {' '}
                  {patientId}
                </label>
              </div>
            </div>

            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
              <div className="form-group row justify-content-center">
                <label htmlFor="initialSample" className="col-md-2" style={{ marginTop: 5 }}>
                  Mẫu ban đầu:
                  {' '}
                  {initialSample}
                </label>
              </div>
              <h4>THỰC HIỆN XÉT NGHIỆM TẠI KHU LẤY BỆNH PHẨM</h4>
            </div>

            {/* form fields */}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="username">
                  - Họ tên người bệnh:
                  {' '}
                  {name}
                </label>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="birthDate">
                  Năm sinh:
                  {' '}
                  {birthDate}
                </label>
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="gender">
                  Giới tính:
                  {' '}
                  {gender}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">
                - Địa chỉ:
                {' '}
                {address}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="patientType">
                - Đối tượng:
                {' '}
                {patientType}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="department">
                - Khoa phòng:
                {' '}
                PK
                {department}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="diagnosis">
                - Chẩn đoán:
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
                    Tên xét nghiệm
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
                    Đơn giá
                    {' '}
                    <br />
                    {' '}
                    (4)
                  </th>
                  <th scope="col">
                    Thành tiền
                    <br />
                    {' '}
                    (5)
                  </th>
                  <th scope="col">
                    Bảo hiểm
                    <br />
                    {' '}
                    (6)
                  </th>
                  <th scope="col">
                    BN chi trả
                    <br />
                    {' '}
                    (7)
                  </th>
                  <th scope="col">
                    Chênh lệch
                    <br />
                    {' '}
                    (8)
                  </th>
                  <th scope="col">
                    BN phải trả
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
                    Tổng
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

            {/* TODO: update time realtime */}
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
          </div>
        </div>
      ) : ((
        <div className="p-5 text-center">
          <h6 className="mb-3">Đang tải phiếu xét nghiệm...</h6>
        </div>
      ))}

      {done && showForm && (
      <div>
        <br />
        <div className="form-row justify-content-center">

          <button className="btn btn-primary" onClick={downloadForm}>
            Tải phiếu xét nghiệm
          </button>
        </div>
      </div>
      )}
    </>
  );
}

export default BiochemicalForm;
