import React from 'react';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-left" style={{ width: '15%', marginLeft: '5%' }}>
        <h3 style={{ color: 'rgba(0, 0, 0, 0.65)' }}><span>Liên hệ</span></h3>
        <p className="footer-links">
          <a style={{ textDecoration: 'none' }} href="/">Trang chủ</a>
        </p>

      </div>

      <div className="footer-center" style={{ width: '40%' }}>
        <p className="footer-contact">
          <span style={{ fontWeight: 'bold' }}>Dr. Quang H. Nguyen</span>
          <ul>
            <li>
              <i className="fas fa-briefcase" />
              <p>
                Lecturer, Head of Bioinformatic Labs, AI Center,
                <br />
                School of Information and Communication Technology,
                <br />
                Hanoi University of Science and Technology
              </p>
            </li>
            <li>
              <i className="far fa-address-card" />
              Room 802, B1 Building, 1 Dai Co Viet Road, Ha Noi, Viet Nam
            </li>
            <li>
              <i className="fas fa-phone" />
              (+84) 24 3869 2463
            </li>
            <li>
              <i className="fas fa-info-circle" />
              quangnh [at] soict.hust.edu.vn or
            </li>
            <li>
              <i className="fas fa-globe" />
              <a href="http://nguyenhongquang.edu.vn/" style={{ textDecoration: 'none' }}>
                http://nguyenhongquang.edu.vn/
              </a>
            </li>
          </ul>
        </p>
      </div>

      <div className="footer-right" style={{ width: '25%', marginRight: '5%' }}>
        <p className="footer-contact">
          <span style={{ fontWeight: 'bold' }}>Thao P. Tran</span>
          <ul>
            <li>
              <i className="fas fa-briefcase" />
              School of Information and Communication Technology,
              <br />
              Hanoi University of Science and Technology
            </li>
            <li>
              <i className="fas fa-phone" />
              (+84) 964 086 794
            </li>
            <li>
              <i className="fas fa-info-circle" />
              thao.tp173383@sis.hust.edu.vn
            </li>
          </ul>
        </p>
      </div>
    </div>
  );
}

export default Footer;
