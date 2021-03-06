/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FormFooter from './FormFooter';
import Logo from './images/logo.jpg';

function HematologyAndImmunology(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const patientId = props.match.params.patientId;
  const form = useRef();
  const history = useHistory();
  const [count, setCount] = useState(0);

  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [patientType, setPatientType] = useState();
  const [department, setDepartment] = useState();
  // const [doctor, setDoctor] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [successful, setSuccessful] = useState(false);

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

  const [amountSum, setAmountSum] = useState(0);
  const [paymentSum, setPaymentSum] = useState(0);
  const [totalSum, setTotalSum] = useState(0);

  const [submit, setSubmit] = useState(false);
  const [checkLine, setCheckLine] = useState(false);
  const [checkForm, setCheckForm] = useState(false);

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
  }, []);

  const onChangeDiagnosis = (e) => {
    setDiagnosis(e.target.value);
  };

  const onChangeCaseType = (e) => {
    setCaseType(e.target.value);
  };

  const onChangeInitialSample = (e) => {
    setInitialSample(e.target.value);
  };

  const onSubmitClick = () => {
    setSubmit(true);
    if (count === 0) {
      setCheckLine(false);
    } else {
      setCheckLine(true);
    }
  };

  const checkAllTableField = () => {
    let allFieldFilled = true;
    document.getElementById('myTable').querySelectorAll('[required]').forEach((element) => {
      if (!element.value) {
        allFieldFilled = false;
      }
    });
    return allFieldFilled;
  };

  const onChangeTestName = (e) => {
    const cntStr = e.target.name.substring(8);
    const cntNum = parseInt(cntStr, 10);
    testName[cntNum - 1] = e.target.value;
  };

  const onChangeQuantity = (e) => {
    const cntStr = e.target.name.substring(8);
    const cntNum = parseInt(cntStr, 10);
    quantity[cntNum - 1] = e.target.value;
  };

  const onChangePrice = (e) => {
    const cntStr = e.target.name.substring(5);
    const cntNum = parseInt(cntStr, 10);
    price[cntNum - 1] = e.target.value;
  };

  const onChangeAmount = (e) => {
    const cntStr = e.target.name.substring(6);
    const cntNum = parseInt(cntStr, 10);
    amount[cntNum - 1] = e.target.value;
  };

  const onChangeInsurance = (e) => {
    const cntStr = e.target.name.substring(9);
    const cntNum = parseInt(cntStr, 10);
    insurance[cntNum - 1] = e.target.value;
  };

  const onChangePayment = (e) => {
    const cntStr = e.target.name.substring(7);
    const cntNum = parseInt(cntStr, 10);
    payment[cntNum - 1] = e.target.value;
  };

  const onChangeDiff = (e) => {
    const cntStr = e.target.name.substring(4);
    const cntNum = parseInt(cntStr, 10);
    diff[cntNum - 1] = e.target.value;
  };

  const onChangeTotal = (e) => {
    const cntStr = e.target.name.substring(5);
    const cntNum = parseInt(cntStr, 10);
    total[cntNum - 1] = e.target.value;
  };

  const onAddRow = () => {
    if (checkAllTableField()) {
      const tempCount = count + 1;
      setCount(tempCount);
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

      const value1 = testName[tempCount - 1] ? testName[tempCount - 1] : '';
      const value2 = quantity[tempCount - 1] ? quantity[tempCount - 1] : '';
      const value3 = price[tempCount - 1] ? price[tempCount - 1] : '';
      const value4 = amount[tempCount - 1] ? amount[tempCount - 1] : '';
      const value5 = insurance[tempCount - 1] ? insurance[tempCount - 1] : '';
      const value6 = payment[tempCount - 1] ? payment[tempCount - 1] : '';
      const value7 = diff[tempCount - 1] ? diff[tempCount - 1] : '';
      const value8 = total[tempCount - 1] ? total[tempCount - 1] : '';

      // Append a text node to the cell
      newCell1.innerHTML = `<div class="text-center">${tempCount}</div>`;
      newCell2.innerHTML = `<input type="text" class="form-control col" name="testName${tempCount}" onchange="" value="${value1}" required />`;
      newCell2.onchange = onChangeTestName;
      newCell3.innerHTML = `<input type="text" class="form-control col" name="quantity${tempCount}" onchange="" value="${value2}" required />`;
      newCell3.onchange = onChangeQuantity;
      newCell4.innerHTML = `<input type="text" class="form-control col" name="price${tempCount}" onchange="" value="${value3}" required />`;
      newCell4.onchange = onChangePrice;
      newCell5.innerHTML = `<input type="text" class="form-control col" name="amount${tempCount}" onchange="" value="${value4}" required />`;
      newCell5.onchange = onChangeAmount;
      newCell6.innerHTML = `<input type="text" class="form-control col" name="insurance${tempCount}" onchange="" value="${value5}" />`;
      newCell6.onchange = onChangeInsurance;
      newCell7.innerHTML = `<input type="text" class="form-control col" name="payment${tempCount}" onchange="" value="${value6}" required />`;
      newCell7.onchange = onChangePayment;
      newCell8.innerHTML = `<input type="text" class="form-control col" name="diff${tempCount}" onchange="" value="${value7}" />`;
      newCell8.onchange = onChangeDiff;
      newCell9.innerHTML = `<input type="text" class="form-control col" name="total${tempCount}" onchange="" value="${value8}" required/>`;
      newCell9.onchange = onChangeTotal;
    }
  };

  const calculateSum = (valueArr) => {
    let sum = 0;
    valueArr.forEach((value) => {
      const intValue = (value !== '') ? parseInt(value, 10) : 0;
      sum += intValue;
    });
    return sum;
  };

  const calculateAmountSum = () => {
    if (checkAllTableField) {
      if (amount.length >= 1) {
        setAmountSum(calculateSum(amount));
      }
    }
  };

  const calculatePaymentSum = () => {
    if (checkAllTableField) {
      if (payment.length >= 1) {
        setPaymentSum(calculateSum(payment));
      }
    }
  };

  const calculateTotalSum = () => {
    if (checkAllTableField) {
      if (total.length >= 1) {
        setTotalSum(calculateSum(total));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    if (submit) {
      calculateAmountSum();
      calculatePaymentSum();
      calculateTotalSum();
      setCheckForm(true);
      // if true then save to database

      if (checkForm && checkLine) {
        const dataToSubmit = {
          patientId,
          initialSample,
          caseType,
          diagnosis,
          testName,
          quantity,
          price,
          amount,
          insurance,
          payment,
          diff,
          total,
        };

        axios.post('/api/diagnosis/hematologyDiagnosis/saveHematologyForm', dataToSubmit)
          .then((response) => {
            if (response.data.success) {
              const dataToSubmit2 = {
                patientId,
                hematologyAndImmunology: 'done',
              };

              axios.post('/api/diagnosis/updateHematologyDiagnosis', dataToSubmit2).then((res) => {
                if (res.data.success) {
                  // alert('Update information successfully');
                  history.push(`/hematologyForm/${patientId}`);
                } else {
                  // alert('Failed to update information');
                }
              });
            } else {
              alert('Kh??ng th??? l??u th??ng tin phi???u x??t nghi???m');
            }
          });
      }
    }
  };

  return (
    <div className="laboratory-form">
      <form onSubmit={handleSubmit} ref={form}>
        {!successful && (
        <div>
          {/* form header */}
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
                <b>PHI???U HUY???T H???C - MI???N D???CH</b>
              </p>

              <div style={{ textAlign: 'center' }}>
                <div
                  className="form-check form-check-inline"
                  onChange={onChangeCaseType}
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    name="casetype"
                    value="Th?????ng"
                    required
                  />
                  Th?????ng
                </div>

                <div
                  className="form-check form-check-inline"
                  onChange={onChangeCaseType}
                >
                  <input
                    type="radio"
                    className="form-check-input"
                    name="casetype"
                    value="C???p c???u"
                    required
                  />
                  C???p c???u
                </div>
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
            <div className="form-group row justify-content-center">
              <label htmlFor="initialSample" className="col-md-2" style={{ marginTop: 5 }}>
                M???u ban ?????u:
              </label>
              <input
                type="text"
                className="form-control col-md-2"
                name="initialSample"
                value={initialSample}
                onChange={onChangeInitialSample}
                required
              />
            </div>
            <p>TH???C HI???N X??T NGHI???M T???I KHU L???Y B???NH PH???M</p>
          </div>

          {/* form fields */}
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="username">H??? t??n ng?????i b???nh:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={name}
                disabled
              />
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="birthDate">N??m sinh:</label>
              <input
                type="text"
                className="form-control"
                name="birthDate"
                value={birthDate}
                disabled
              />
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="gender">Gi???i t??nh:</label>
              <select
                name="gender"
                className="form-control"
                value={gender}
                disabled
              >
                <option value="Nam">Nam</option>
                <option value="N???">N???</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">?????a ch???:</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={address}
              disabled
            />
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="patientType">?????i t?????ng:</label>
              <select
                name="patientType"
                className="form-control"
                value={patientType}
                disabled
              >
                <option value="Kh??m trong gi???">Kh??m trong gi???</option>
                <option value="Kh??m ngo??i gi???">Kh??m ngo??i gi???</option>
              </select>
            </div>

            <div className="form-group col-md-8">
              <label htmlFor="department">Khoa ph??ng:</label>
              <input
                type="text"
                className="form-control"
                name="department"
                value={department}
                disabled
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="diagnosis">Ch???n ??o??n:</label>
            <input
              type="text"
              className="form-control"
              name="diagnosis"
              value={diagnosis}
              onChange={onChangeDiagnosis}
              required
            />
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
              {/* add row button */}
              <tr>
                <td colSpan="9" className="text-center">
                  <button className="btn btn-primary" onClick={onAddRow}>
                    <i className="bi bi-plus-square">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                      </svg>
                      {' '}
                    </i>
                    <span style={{ marginTop: 8, marginLeft: 5 }}>
                      Th??m d??ng
                    </span>
                  </button>
                </td>
              </tr>
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
        )}
        <div className="form-row justify-content-center">
          <button className="btn btn-primary" onClick={onSubmitClick}>
            Xem phi???u x??t nghi???m
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(HematologyAndImmunology);
