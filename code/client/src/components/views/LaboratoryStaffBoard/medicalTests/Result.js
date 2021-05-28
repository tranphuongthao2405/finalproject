/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Logo from './images/logo.jpg';

function Result(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const patientId = props.match.params.patientId;
  const form = useRef();
  const date = new Date().toLocaleString('en-GB');
  let count = 1;

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
  const [quantity, setQuantity] = useState([]);
  const [price, setPrice] = useState([]);
  const [amount, setAmount] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [payment, setPayment] = useState([]);
  const [diff, setDiff] = useState([]);
  const [total, setTotal] = useState([]);

  const [amountSum, setAmountSum] = useState();
  const [paymentSum, setPaymentSum] = useState();
  const [totalSum, setTotalSum] = useState();

  const [submit, setSubmit] = useState(false);

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
          alert(response.data.err);
        }
      });
  }, []);

  const calculateSum = (valueArr) => {
    let sum = 0;
    valueArr.forEach((value) => {
      const intValue = (value !== '') ? parseInt(value, 10) : 0;
      sum += intValue;
    });
    return sum;
  };

  useEffect(() => {
    if (amount.length >= 1) {
      setAmountSum(calculateSum(amount));
    }

    if (payment.length >= 1) {
      setPaymentSum(calculateSum(payment));
    }

    if (total.length >= 1) {
      setTotalSum(calculateSum(total));
    }
  }, [amount.length, payment.length, total.length, count]);

  const onChangeDiagnosis = (e) => {
    setDiagnosis(e.target.value);
  };

  const onChangeTestName = (e) => {
    testName[count - 1] = e.target.value;
  };

  const onChangeQuantity = (e) => {
    quantity[count - 1] = e.target.value;
  };

  const onChangePrice = (e) => {
    price[count - 1] = e.target.value;
  };

  const onChangeAmount = (e) => {
    amount[count - 1] = e.target.value;
  };

  const onChangeInsurance = (e) => {
    insurance[count - 1] = e.target.value;
  };

  const onChangePayment = (e) => {
    payment[count - 1] = e.target.value;
  };

  const onChangeDiff = (e) => {
    diff[count - 1] = e.target.value;
  };

  const onChangeTotal = (e) => {
    total[count - 1] = e.target.value;
  };

  const onSubmitClick = () => {
    setSubmit(true);
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

  const onAddRow = () => {
    // have to finish previous line before add next line
    // count is a share variable
    if (checkAllTableField()) {
      count += 1;
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
      let value1 = ''; let value2 = ''; let value3 = ''; let value4 = ''; let value5 = ''; let value6 = ''; let value7 = ''; let
        value8 = '';
      const onChangeValue1 = (e) => {
        value1 = e.target.value;
        testName[count - 1] = value1;
      };

      const onChangeValue2 = (e) => {
        value2 = e.target.value;
        quantity[count - 1] = value2;
      };

      const onChangeValue3 = (e) => {
        value3 = e.target.value;
        price[count - 1] = value3;
      };

      const onChangeValue4 = (e) => {
        value4 = e.target.value;
        amount[count - 1] = value4;
      };

      const onChangeValue5 = (e) => {
        value5 = e.target.value;
        insurance[count - 1] = value5;
      };

      const onChangeValue6 = (e) => {
        value6 = e.target.value;
        payment[count - 1] = value6;
      };

      const onChangeValue7 = (e) => {
        value7 = e.target.value;
        diff[count - 1] = value7;
      };

      const onChangeValue8 = (e) => {
        value8 = e.target.value;
        total[count - 1] = value8;
      };

      // Append a text node to the cell
      newCell1.innerHTML = `<div class="text-center">${count}</div>`;
      newCell2.innerHTML = `<input type="text" class="form-control col" name="testName${count}" onchange="" value="${value1}" required />`;
      newCell2.onchange = onChangeValue1;
      newCell3.innerHTML = `<input type="text" class="form-control col" name="quantity${count}" onchange="" value="${value2}" required />`;
      newCell3.onchange = onChangeValue2;
      newCell4.innerHTML = `<input type="text" class="form-control col" name="price${count}" onchange="" value="${value3}" required />`;
      newCell4.onchange = onChangeValue3;
      newCell5.innerHTML = `<input type="text" class="form-control col" name="amount${count}" onchange="" value="${value4}" required />`;
      newCell5.onchange = onChangeValue4;
      newCell6.innerHTML = `<input type="text" class="form-control col" name="insurance${count}" onchange="" value="${value5}" />`;
      newCell6.onchange = onChangeValue5;
      newCell7.innerHTML = `<input type="text" class="form-control col" name="payment${count}" onchange="" value="${value6}" required />`;
      newCell7.onchange = onChangeValue6;
      newCell8.innerHTML = `<input type="text" class="form-control col" name="diff${count}" onchange="" value="${value7}" />`;
      newCell8.onchange = onChangeValue7;
      newCell9.innerHTML = `<input type="text" class="form-control col" name="total${count}" onchange="" value="${value8}" required/>`;
      newCell9.onchange = onChangeValue8;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    if (submit) {
      // form.current.validateAll();
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
                  <b>PHIẾU KẾT QUẢ XÉT NGHIỆM</b>
                </p>
              </div>

              <div className="form-group col-md-2">
                <div>
                  <label htmlFor="patientId">
                    Mã BN:
                    {' '}
                    {patientId}
                  </label>
                </div>
                <div>
                  <label>
                    Ngày NM:
                    {' '}
                    {date.substring(0, 10)}
                  </label>
                </div>
                <div>
                  <label>
                    Giờ NM:
                    {' '}
                    {date.substring(11)}
                  </label>
                </div>
              </div>

            </div>

            {/* form fields */}
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="username">Họ tên người bệnh:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  disabled
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="birthDate">Năm sinh:</label>
                <input
                  type="text"
                  className="form-control"
                  name="birthDate"
                  value={birthDate}
                  disabled
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="gender">Giới tính:</label>
                <select
                  name="gender"
                  className="form-control"
                  value={gender}
                  disabled
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Địa chỉ:</label>
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
                <label htmlFor="patientType">Đối tượng:</label>
                <select
                  name="patientType"
                  className="form-control"
                  value={patientType}
                  disabled
                >
                  <option value="Khám trong giờ">Khám trong giờ</option>
                  <option value="Khám ngoài giờ">Khám ngoài giờ</option>
                </select>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="department">Khoa phòng:</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={department}
                  disabled
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="doctor">Bác sĩ chỉ định:</label>
                <input
                  type="text"
                  className="form-control"
                  name="doctor"
                  value={doctor}
                  disabled
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="getPerson">Người lấy mẫu:</label>
              </div>

              <div className="form-group ">
                <label htmlFor="get">
                  Thời gian lấy mẫu:
                  {date.substring(11)}
                  {' '}
                  {' '}
                  {' '}
                  {date.substring(0, 10)}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="receivePerson">Người nhận mẫu: Administrator</label>
              </div>
              <div className="form-group">
                <label htmlFor="receive">
                  {' '}
                  Thời gian nhận mẫu:
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
                    TÊN XÉT NGHIỆM
                  </th>
                  <th scope="col" style={{ width: '10%' }}>
                    KẾT QUẢ
                  </th>
                  <th scope="col" style={{ width: '15%' }}>
                    TRỊ SỐ BÌNH THƯỜNG
                  </th>
                  <th scope="col">
                    ĐƠN VỊ
                  </th>
                  <th scope="col">
                    GHI CHÚ
                  </th>
                  <th scope="col">
                    MÁY XÉT NGHIỆM
                  </th>
                </tr>
              </thead>
              <tbody />
            </table>
            <br />
            <br />
            <br />
            <br />

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
        )}

        {/* {message && (
          <div className="form-group">
            <div
              className={
                successful ? 'alert alert-success' : 'alert alert-danger'
              }
              role="alert"
              style={{ textAlign: 'center', margin: 10 }}
            >
              {message}
            </div>
          </div>
        )} */}
        <button className="btn btn-primary btn-block" onClick={onSubmitClick}>
          In phiếu xét nghiệm
        </button>
      </form>
    </div>
  );
}

export default Result;
