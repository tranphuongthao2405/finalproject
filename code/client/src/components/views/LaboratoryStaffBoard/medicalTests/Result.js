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

function Result(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const patientId = props.match.params.patientId;
  const form = useRef();
  const history = useHistory();
  const date = new Date().toLocaleString('en-GB');
  const [count, setCount] = useState(0);

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

  const [submit, setSubmit] = useState(false);
  const [checkLine, setCheckLine] = useState(false);

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
  }, []);

  const onChangeDiagnosis = (e) => {
    setDiagnosis(e.target.value);
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

  const onChangeResult = (e) => {
    const cntStr = e.target.name.substring(6);
    const cntNum = parseInt(cntStr, 10);
    result[cntNum - 1] = e.target.value;
  };

  const onChangeNormalRate = (e) => {
    const cntStr = e.target.name.substring(10);
    const cntNum = parseInt(cntStr, 10);
    normalRate[cntNum - 1] = e.target.value;
  };

  const onChangeUnit = (e) => {
    const cntStr = e.target.name.substring(4);
    const cntNum = parseInt(cntStr, 10);
    unit[cntNum - 1] = e.target.value;
  };

  const onChangeNote = (e) => {
    const cntStr = e.target.name.substring(4);
    const cntNum = parseInt(cntStr, 10);
    note[cntNum - 1] = e.target.value;
  };

  const onChangeMachine = (e) => {
    const cntStr = e.target.name.substring(7);
    const cntNum = parseInt(cntStr, 10);
    machine[cntNum - 1] = e.target.value;
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

      const value1 = testName[tempCount - 1] ? testName[tempCount - 1] : '';
      const value2 = result[tempCount - 1] ? result[tempCount - 1] : '';
      const value3 = normalRate[tempCount - 1] ? normalRate[tempCount - 1] : '';
      const value4 = unit[tempCount - 1] ? unit[tempCount - 1] : '';
      const value5 = note[tempCount - 1] ? note[tempCount - 1] : '';
      const value6 = machine[tempCount - 1] ? machine[tempCount - 1] : '';

      // Append a text node to the cell
      newCell1.innerHTML = `<input type="text" class="form-control col" name="testName${tempCount}" onchange="" value="${value1}" required />`;
      newCell1.onchange = onChangeTestName;
      newCell2.innerHTML = `<input type="text" class="form-control col" name="result${tempCount}" onchange="" value="${value2}" required />`;
      newCell2.onchange = onChangeResult;
      newCell3.innerHTML = `<input type="text" class="form-control col" name="normalrate${tempCount}" onchange="" value="${value3}" required />`;
      newCell3.onchange = onChangeNormalRate;
      newCell4.innerHTML = `<input type="text" class="form-control col" name="unit${tempCount}" onchange="" value="${value4}" required />`;
      newCell4.onchange = onChangeUnit;
      newCell5.innerHTML = `<input type="text" class="form-control col" name="note${tempCount}" onchange="" value="${value5}" />`;
      newCell5.onchange = onChangeNote;
      newCell6.innerHTML = `<input type="text" class="form-control col" name="machine${tempCount}" onchange="" value="${value6}" required />`;
      newCell6.onchange = onChangeMachine;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    if (submit) {
      if (checkLine) {
        const dataToSubmit = {
          patientId,
          diagnosis,
          testName,
          result,
          normalRate,
          unit,
          note,
          machine,
        };

        axios.post('/api/diagnosis/result/saveResultForm', dataToSubmit)
          .then((response) => {
            if (response.data.success) {
              const dataToSubmit2 = {
                patientId,
                result: 'done',
              };

              axios.post('/api/diagnosis/updateResultDiagnosis', dataToSubmit2).then((res) => {
                if (res.data.success) {
                  // alert('Update information successfully');
                  history.push(`/resultForm/${patientId}`);
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
              <div className="form-group col-md-6">
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

              <div className="form-group col-md-6">
                <label htmlFor="number">S??? BHYT:</label>
                <input
                  type="text"
                  className="form-control"
                  name="number"
                  value=""
                  disabled
                />
              </div>
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

              <div className="form-group col-md-4">
                <label htmlFor="department">Khoa ph??ng:</label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  value={department}
                  disabled
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="doctor">B??c s?? ch??? ?????nh:</label>
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
                <label htmlFor="getPerson">Ng?????i l???y m???u:</label>
              </div>

              <div className="form-group ">
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
              <div className="form-group col-md-8">
                <label htmlFor="receivePerson">Ng?????i nh???n m???u: Administrator</label>
              </div>
              <div className="form-group">
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
              <tfoot>
                {/* add row button */}
                <tr>
                  <td colSpan="6" className="text-center">
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
              </tfoot>
            </table>
            <br />
            <br />
            <br />
            <br />

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

export default React.memo(Result);
