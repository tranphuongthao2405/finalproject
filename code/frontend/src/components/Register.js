import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import { isEmail } from "validator";

import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Vui lòng điền đầy đủ thông tin bắt buộc
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Vui lòng điền địa chỉ email hợp lệ
      </div>
    );
  }
};

const validUsername = (value) => {
  if (value.length < 6) {
    return (
      <div className="alert alert-danger" role="alert">
        Tên đăng nhập phải có độ dài tối thiểu 6 kí tự
      </div>
    );
  }
};

const validPassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Mật khẩu phải có độ dài tối thiểu 6 kí tự và không vượt quá 40 kí tự
      </div>
    );
  }
};

const handleRole = (value) => {
  if (value === "Doctor") {
    return (
      <div className="alert alert-danger" role="alert">
        Tên đăng nhập phải có định dạng Kxx-username. Ví dụ: K19-NguyenVanA
        <br />
        Xem chi tiết phòng khám và lịch khám tại&nbsp;
        <a href="https://dalieu.vn/wp-content/uploads/2021/03/L%E1%BB%8Bch-kh%C3%A1m-T3-converted.pdf">
          đây.
        </a>
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkButton = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState([]);
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeRole = (e) => {
    role.push(e.target.value);
  };

  const checkUsernameAndRole = () => {
    if (role[0] === "Doctor") {
      if (username.includes("K") && username.includes("-")) {
        if (username.indexOf("K") < username.indexOf("-")) {
          return true;
        }
      }
    }

    return false;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    if (checkButton.current.context._errors.length === 0) {
      if (role[0] === "Doctor" && checkUsernameAndRole) {
        dispatch(register(username, email, password, role))
          .then(() => {
            setSuccessful(true);
          })
          .catch(() => {
            setSuccessful(false);
          });
      } else {
        dispatch(register(username, email, password, role))
          .then(() => {
            setSuccessful(true);
          })
          .catch(() => {
            setSuccessful(false);
          });
      }
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Tên đăng nhập:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, validUsername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu:</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, validPassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Vị trí:</label>
                <Select
                  name="role"
                  className="form-control"
                  value={role}
                  onChange={onChangeRole}
                  validations={[required, handleRole]}
                >
                  <option value="">Chọn vị trí làm việc</option>
                  <option value="Doctor">Bác sĩ</option>
                  <option value="Laboratory staff">
                    Nhân viên xét nghiệm/chẩn đoán
                  </option>
                </Select>
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Đăng ký</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
                style={{ textAlign: "center", margin: 10 }}
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkButton} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
