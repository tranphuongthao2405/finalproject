/* eslint-disable prefer-destructuring */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Logo from './images/logo.jpg';

// eslint-disable-next-line consistent-return
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Vui lòng điền đầy đủ thông tin bắt buộc
      </div>
    );
  }
};

function Biochemical(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const patientId = props.match.params.patientId;
  const form = useRef();
  const checkButton = useRef();
  const date = new Date().toLocaleString('en-GB');

  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [patientType, setPatientType] = useState();
  // get doctor request from department room
  // TODO: using redux
  const [department, setDepartment] = useState();
  const [doctor, setDoctor] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [successful, setSuccessful] = useState(false);

  const [caseType, setCaseType] = useState();
  const [initialSample, setInitialSample] = useState();

  // state for form field
  const [number, setNumber] = useState();
  const [testName, setTestName] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [insurance, setInsurance] = useState();
  const [payment, setPayment] = useState();
  const [diff, setDiff] = useState();
  const [total, setTotal] = useState();

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
  }, []);

  const onChangeDiagnosis = (e) => {
    setDiagnosis(e.target.value);
  };

  const onChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const onChangeTestName = (e) => {
    setTestName(e.target.value);
  };

  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const onChangeInsurance = (e) => {
    setInsurance(e.target.value);
  };

  const onChangePayment = (e) => {
    setPayment(e.target.value);
  };

  const onChangeDiff = (e) => {
    setDiff(e.target.value);
  };

  const onChangeTotal = (e) => {
    setTotal(e.target.value);
  };

  const onChangeCaseType = (e) => {
    setCaseType(e.target.value);
  };

  const onChangeInitialSample = (e) => {
    setInitialSample(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    if (checkButton.current.context._errors.length === 0) {
      // dispatch(register(username, email, password, role))
      // .then(() => {
      //   setSuccessful(true);
      // })
      // .catch(() => {
      //   setSuccessful(false);
      // });
    }
  };

  return (
    <div className="laboratory-form">
      <Form onSubmit={handleSubmit} ref={form}>
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
                  <b>PHIẾU SINH HÓA MÁU</b>
                </p>

                <div style={{ textAlign: 'center' }}>
                  <div
                    className="form-check form-check-inline"
                    onChange={onChangeCaseType}
                  >
                    <Input
                      type="radio"
                      className="form-check-input"
                      name="casetype"
                      value="normal"
                      validations={[required]}
                    />
                    Thường
                  </div>

                  <div
                    className="form-check form-check-inline"
                    onChange={onChangeCaseType}
                  >
                    <Input
                      type="radio"
                      className="form-check-input"
                      name="casetype"
                      value="emergency"
                      validations={[required]}
                    />
                    Cấp cứu
                  </div>
                </div>
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="patientId">Mã BN:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="patientId"
                  value={patientId}
                  validations={[required]}
                />
              </div>
            </div>

            <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
              <div className="form-group row justify-content-center">
                <label htmlFor="initialSample" className="col-md-2">
                  Mẫu ban đầu:
                </label>
                <Input
                  type="text"
                  className="form-control col-md-6"
                  name="initialSample"
                  value={initialSample}
                  onChange={onChangeInitialSample}
                  validations={[required]}
                />
              </div>
              <p>THỰC HIỆN XÉT NGHIỆM TẠI KHU LẤY BỆNH PHẨM</p>
            </div>

            {/* form fields */}
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="username">Họ tên người bệnh:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  validations={[required]}
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="birthDate">Năm sinh:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="birthDate"
                  value={birthDate}
                  validations={[required]}
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="gender">Giới tính:</label>
                <Select
                  name="gender"
                  className="form-control"
                  value={gender}
                  validations={[required]}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </Select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Địa chỉ:</label>
              <Input
                type="text"
                className="form-control"
                name="address"
                value={address}
                validations={[required]}
              />
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="patientType">Đối tượng:</label>
                <Select
                  name="patientType"
                  className="form-control"
                  value={patientType}
                  validations={[required]}
                >
                  <option value="Khám trong giờ">Khám trong giờ</option>
                  <option value="Khám ngoài giờ">Khám ngoài giờ</option>
                </Select>
              </div>

              <div className="form-group col-md-8">
                <label htmlFor="department">Khoa phòng:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="department"
                  value={department}
                  validations={[required]}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="diagnosis">Chẩn đoán:</label>
              <Input
                type="text"
                className="form-control"
                name="diagnosis"
                value={diagnosis}
                onChange={onChangeDiagnosis}
                validations={[required]}
              />
            </div>

            {/* TODO: add rows to table */}
            <table className="table table-bordered">
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
              <tbody>
                <tr style={{ textAlign: 'center' }}>
                  <td>
                    <Input
                      type="text"
                      className="form-control col"
                      name="number"
                      value={number}
                      onChange={onChangeNumber}
                      validations={[required]}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      className="form-control col"
                      name="testName"
                      value={testName}
                      onChange={onChangeTestName}
                      validations={[required]}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      className="form-control col"
                      name="quantity"
                      value={quantity}
                      onChange={onChangeQuantity}
                      validations={[required]}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      className="form-control col"
                      name="price"
                      value={price}
                      onChange={onChangePrice}
                      validations={[required]}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      className="form-control col"
                      name="amount"
                      value={amount}
                      onChange={onChangeAmount}
                      validations={[required]}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      className="form-control col"
                      name="insurance"
                      value={insurance}
                      onChange={onChangeInsurance}
                      validations={[required]}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      className="form-control col"
                      name="payment"
                      value={payment}
                      onChange={onChangePayment}
                      validations={[required]}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      className="form-control col"
                      name="diff"
                      value={diff}
                      onChange={onChangeDiff}
                      validations={[required]}
                    />
                  </td>
                  <td>
                    <Input
                      type="text"
                      className="form-control col"
                      name="total"
                      value={total}
                      onChange={onChangeTotal}
                      validations={[required]}
                    />
                  </td>
                </tr>
                {/* TODO: complete function to count total amount */}
                <tr>
                  <td colSpan="4" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Tổng
                  </td>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              </tbody>
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

            <div className="form-group">
              <button className="btn btn-primary btn-block">
                In phiếu xét nghiệm
              </button>
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
        <CheckButton style={{ display: 'none' }} ref={checkButton} />
      </Form>
    </div>
  );
}

export default Biochemical;
