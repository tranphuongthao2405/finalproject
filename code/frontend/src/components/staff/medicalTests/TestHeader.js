import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Input from "react-validation/build/input";
import "react-datepicker/dist/react-datepicker.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Vui lòng điền đầy đủ thông tin bắt buộc
      </div>
    );
  }
};

function TestHeader() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [address, setAddress] = useState("");
  const [patientType, setPatientType] = useState("");
  const [departmentRequest, setDepartmentRequest] = useState();
  // get doctor from department room
  const [doctor, setDoctor] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeDate = (date) => {
    setBirthDate(date);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div className="col-md-4">
        <div>
          <label htmlFor="username">Họ tên người bệnh:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onChangeName}
          />
        </div>

        <div>
          <label htmlFor="datebirth">Năm sinh:</label>
          <DatePicker selected={birthDate} onChange={onChangeDate} />
        </div>

        <div>
          <label htmlFor="address">Địa chỉ:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={address}
            onChange={onChangeAddress}
          />
        </div>
    </div>
  );
}

export default TestHeader;
