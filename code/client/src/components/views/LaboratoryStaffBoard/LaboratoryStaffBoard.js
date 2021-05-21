/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import { Modal, Button } from 'antd';

// TODO: handle redirect link, current redirect is not true
function LaboratoryStaffBoard() {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [patientId, setPatientId] = useState();
  const [error, setError] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  // eslint-disable-next-line consistent-return
  const handleOk = () => {
    if (patientId !== undefined) {
      history.push(`/laboratoryStaffBoard/biochemical/${patientId}`);
      setError(false);
      setIsModalVisible(false);
    } else {
      setError(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setError(false);
  };

  const onChangeId = (e) => {
    setPatientId(e.target.value);
  };

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">PHIẾU NẤM - KÍ SINH TRÙNG</h5>
            <p className="card-text">
              Mẫu phiếu xét nghiệm nấm - ký sinh trùng
            </p>
            <Button type="primary" onClick={showModal}>
              Điền phiếu
            </Button>
            <Modal style={{ zIndex: 9999 }} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Form>
                <div className="form-group">
                  <label htmlFor="patientId">Vui lòng nhập mã bệnh nhân:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="patientId"
                    value={patientId}
                    onChange={onChangeId}
                    required
                  />
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      Vui lòng điền đầy đủ thông tin bắt buộc
                    </div>
                  )}
                </div>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">PHIẾU SINH HÓA MÁU</h5>
            <p className="card-text">
              Mẫu phiếu xét nghiệm sinh hóa máu
            </p>
            <Button type="primary" onClick={showModal}>
              Điền phiếu
            </Button>
            <Modal style={{ zIndex: 9999 }} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Form>
                <div className="form-group">
                  <label htmlFor="patientId">Vui lòng nhập mã bệnh nhân:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="patientId"
                    value={patientId}
                    onChange={onChangeId}
                    required
                  />
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      Vui lòng điền đầy đủ thông tin bắt buộc
                    </div>
                  )}
                </div>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">PHIẾU HUYẾT HỌC - MIỄN DỊCH</h5>
            <p className="card-text">
              Mẫu phiếu xét nghiệm huyết học - miễn dịch
            </p>
            <Button type="primary" onClick={showModal}>
              Điền phiếu
            </Button>
            <Modal style={{ zIndex: 9999 }} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Form>
                <div className="form-group">
                  <label htmlFor="patientId">Vui lòng nhập mã bệnh nhân:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="patientId"
                    value={patientId}
                    onChange={onChangeId}
                    required
                  />
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      Vui lòng điền đầy đủ thông tin bắt buộc
                    </div>
                  )}
                </div>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">PHIẾU KẾT QUẢ XÉT NGHIỆM</h5>
            <p className="card-text">
              Mẫu phiếu kết quả xét nghiệm
            </p>
            <Button type="primary" onClick={showModal}>
              Điền phiếu
            </Button>
            <Modal style={{ zIndex: 9999 }} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <Form>
                <div className="form-group">
                  <label htmlFor="patientId">Vui lòng nhập mã bệnh nhân:</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="patientId"
                    value={patientId}
                    onChange={onChangeId}
                    required
                  />
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      Vui lòng điền đầy đủ thông tin bắt buộc
                    </div>
                  )}
                </div>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaboratoryStaffBoard;
