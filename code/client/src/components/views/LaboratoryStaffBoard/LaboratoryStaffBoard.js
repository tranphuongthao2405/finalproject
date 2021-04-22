import React from 'react';
import { Link } from 'react-router-dom';

function LaboratoryStaffBoard() {
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">PHIẾU NẤM - KÍ SINH TRÙNG</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <Link to="/laboratoryStaffBoard/fungusAndParasite" className="btn btn-primary">
              Điền phiếu
            </Link>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">PHIẾU SINH HÓA MÁU</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <Link to="/laboratoryStaffBoard/biochemical" className="btn btn-primary">
              Điền phiếu
            </Link>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">PHIẾU HUYẾT HỌC - MIỄN DỊCH</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <Link to="/laboratoryStaffBoard/hematologyAndImmunology" className="btn btn-primary">
              Điền phiếu
            </Link>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">PHIẾU KẾT QUẢ XÉT NGHIỆM</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <Link to="/laboratoryStaffBoard/result" className="btn btn-primary">
              Điền phiếu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LaboratoryStaffBoard;
