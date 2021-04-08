import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { Link } from "react-router-dom";

function Navbar() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showDoctorBoard, setShowDoctorBoard] = useState(false);
  const [showStaffBoard, setShowStaffBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser) {
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
      setShowDoctorBoard(currentUser.roles.includes("ROLE_DOCTOR"));
      setShowStaffBoard(currentUser.roles.includes("ROLE_LABORATORY STAFF"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Bệnh viện Da liễu Trung ương
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Trang chủ
            </Link>
          </li>

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin dashboard
              </Link>
            </li>
          )}

          {showDoctorBoard && (
            <li className="nav-item">
              <Link to={"/doctor"} className="nav-link">
                Doctor
              </Link>
            </li>
          )}

          {showStaffBoard && (
            <li className="nav-item">
              <Link to={"/laboratoryTests"} className="nav-link">
                Các mẫu phiếu kết quả xét nghiệm
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Đăng xuất
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Đăng nhập
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Đăng ký
              </Link>
            </li>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
