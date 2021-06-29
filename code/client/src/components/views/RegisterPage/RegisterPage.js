/* eslint-disable no-alert */
/* eslint-disable no-shadow */
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
  Form, Input, Button, Select,
} from 'antd';
import { registerUser } from '../../../_actions/user_actions';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        lastName: '',
        firstName: '',
        password: '',
        confirmPassword: '',
        role: '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('Vui lòng nhập họ'),
        lastName: Yup.string().required('Vui lòng nhập tên'),
        email: Yup.string()
          .email('Email không hợp lệ')
          .required('Vui lòng nhập email'),
        password: Yup.string()
          .min(6, 'Mật khẩu phải có tối thiểu 6 ký tự')
          .required('Vui lòng nhập mật khẩu'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Mật khẩu phải khớp')
          .required('Vui lòng nhập lại mật khẩu xác nhận'),
        role: Yup.string().required('Vui lòng chọn vai trò'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const dataToSubmit = {
            email: values.email,
            password: values.password,
            firstname: values.firstName,
            lastname: values.lastName,
            role: values.role,
          };

          dispatch(registerUser(dataToSubmit)).then((response) => {
            if (response.payload.success) {
              props.history.push('/login');
            } else {
              alert(response.payload.err.errmsg);
            }
          });

          setSubmitting(false);
        }, 500);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">
            <Form
              style={{ minWidth: '550px' }}
              {...formItemLayout}
              onSubmit={handleSubmit}
              className="form"
            >
              <Form.Item style={{ textAlign: 'end' }}>
                <h2>Đăng ký</h2>
              </Form.Item>
              <Form.Item required label="Họ">
                <Input
                  id="firstName"
                  placeholder="Nhập họ"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.firstName && touched.firstName
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.firstName && touched.firstName && (
                  <div className="input-feedback">{errors.firstName}</div>
                )}
              </Form.Item>

              <Form.Item required label="Tên">
                <Input
                  id="lastName"
                  placeholder="Nhập tên"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Email"
                hasFeedback
                validateStatus={
                  errors.email && touched.email ? 'error' : 'success'
                }
              >
                <Input
                  id="email"
                  placeholder="Nhập email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item
                required
                label="Mật khẩu"
                hasFeedback
                validateStatus={
                  errors.password && touched.password ? 'error' : 'success'
                }
              >
                <Input
                  id="password"
                  placeholder="Nhập mật khẩu"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Xác nhận mật khẩu" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Nhập mật khẩu xác nhận"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item required label="Vai trò" hasFeedback>
                <Select
                  id="role"
                  placeholder="Chọn vai trò"
                  value={values.role}
                  onChange={(selectedOption) => handleChange('role')(selectedOption)}
                  onBlur={handleBlur}
                  className={
                    errors.role && touched.role
                      ? 'text-input error'
                      : 'text-input'
                  }
                >
                  <Option value="admin">Admin</Option>
                  <Option value="doctor">Bác sĩ</Option>
                  <Option value="laboratory staff">Nhân viên xét nghiệm</Option>
                  <Option value="imaging staff">Nhân viên chụp chẩn đoán hình ảnh</Option>
                  <Option value="staff">Nhân viên</Option>
                </Select>
                {errors.role && touched.role && (
                  <div className="input-feedback">{errors.role}</div>
                )}
              </Form.Item>

              <Form.Item style={{ textAlign: 'center' }} {...tailFormItemLayout}>
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                >
                  Đăng ký
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}

export default RegisterPage;
