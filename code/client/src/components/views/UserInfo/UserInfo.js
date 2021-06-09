/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Form, Input, Button, Typography,
} from 'antd';
import axios from 'axios';

const { Title } = Typography;

const UserInfo = (props) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const onPasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const onEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const onFirstNameChange = (evt) => {
    setFirstName(evt.target.value);
  };

  const onLastNameChange = (evt) => {
    setLastName(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();

    const values = {
      userId: props.match.params.userId,
      lastName,
      firstName,
      email,
      password,
    };

    axios.post('/api/users/updateInformation', values).then((response) => {
      if (response.data.success) {
        alert('Update information successfully');
        props.history.push('/');
      } else {
        alert('Failed to update information');
      }
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Update Information</Title>
      </div>

      <form onSubmit={onSubmit} style={{ width: '800px' }}>
        <Form.Item>
          <label>Họ:</label>
          <Input
            type="text"
            placeholder="Nhập họ của bạn"
            value={firstName}
            onChange={onFirstNameChange}
          />
        </Form.Item>
        <Form.Item>
          <label>Tên:</label>
          <Input
            type="text"
            placeholder="Nhập tên của bạn"
            value={lastName}
            onChange={onLastNameChange}
          />
        </Form.Item>
        <Form.Item>
          <label>Email:</label>
          <Input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={onEmailChange}
          />
        </Form.Item>
        <Form.Item>
          <label>Mật khẩu mới:</label>
          <Input
            type="password"
            placeholder="Nhập mật khẩu mới"
            value={password}
            onChange={onPasswordChange}
          />
        </Form.Item>
        <Button size="default" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserInfo;
