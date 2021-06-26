/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';

function LandingPage() {
  const user = useSelector((state) => state.user);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {user.userData && user.userData.role === 'doctor' && (
      <div className="card" style={{ width: '80%' }}>
        <h3 className="mb-3 note note-primary">Hướng dẫn dùng hệ thống dành cho bác sĩ:</h3>
        <p>
          1. Bác sĩ xem danh sách bệnh nhân tiếp nhận bằng cách ấn vào mục Danh sách bệnh nhân tiếp nhận.
          Bác sĩ có thể tìm kiếm bệnh nhân trong danh sách theo mã bệnh nhân.
          <br />
          <br />
          2. Những bệnh nhân đã khám và chẩn đoán sẽ được đánh dấu Đã chẩn đoán. Tên những bệnh nhân cần khám và chẩn đoán được in xanh.
          <br />
          <br />
          3. Ấn vào tên bệnh nhân cần chẩn đoán và điền các kết quả tương ứng, đồng thời có thể
          điều phối bệnh nhân làm xét nghiệm hoặc chụp chẩn đoán hình ảnh nếu cần thiết.
          <br />
          <br />
          4. Sau khi chẩn đoán, theo dõi trạng thái xét nghiệm và các chẩn đoán hình ảnh của bệnh nhân.
          <br />
          <br />
          5. Có thể ấn vào xem chi tiết thông tin về các xét nghiệm và các ảnh chụp chẩn đoán của bệnh nhân nếu có trạng thái 'Đã xong'.
          <br />
          <br />
          6. Bác sĩ có thể tìm kiếm thông tin bệnh nhân bằng cách ấn vào mục Hồ sơ bệnh nhân.
          Trong mục này, sau khi nhập 1 trong 2 trường thông tin yêu cầu, bác sĩ ấn Tìm kiếm, hệ thống sẽ trả về kết quả
          và bác sĩ có thể ấn vào Xem chi tiết để xem thông tin về bệnh nhân.
          <br />
          <br />
          <footer style={{ textAlign: 'end', color: '#007bff' }}>
            Nếu có khó khăn trong quá trình sử dụng hệ thống,
            vui lòng liên hệ tới SĐT: 0964086794
            <br />
            hoặc gửi mail tới địa chỉ: tranphuongthao24051999@gmail.com để được hỗ trợ.
          </footer>
        </p>
      </div>
      )}

      {user.userData && user.userData.role === 'staff' && (
      <div className="card" style={{ width: '80%' }}>
        <h3 className="mb-3 note note-primary">Hướng dẫn dùng hệ thống dành cho nhân viên:</h3>
        <p>
          1. Chọn mục Nhập thông tin bệnh nhân để bắt đầu.
          <br />
          <br />
          2. Nhập đầy đủ thông tin bệnh nhân và ấn Thêm thông tin bệnh nhân sau khi nhập xong.
          <br />
          <br />
          3. Nhân viên có thể xem danh sách bệnh nhân tại mục Danh sách bệnh nhân. Tại đây,
          nhân viên có thể xem danh sách bệnh nhân, tìm kiếm bệnh nhân theo mã bệnh nhân
          hoặc chỉnh sửa thông tin bệnh nhân bằng cách ấn vào biểu tượng chỉnh sửa.
          <br />
          <br />
          4. Nếu nhân viên chỉnh sửa thông tin bệnh nhân, sau khi chỉnh sửa cần nhấn nút Cập nhật thông tin bệnh nhân
          để thông tin của bệnh nhân được cập nhật trên hệ thống.
          <br />
          <br />
          <footer style={{ textAlign: 'end', color: '#007bff' }}>
            Nếu có khó khăn trong quá trình sử dụng hệ thống,
            vui lòng liên hệ tới SĐT: 0964086794
            <br />
            hoặc gửi mail tới địa chỉ: tranphuongthao24051999@gmail.com để được hỗ trợ.
          </footer>
        </p>
      </div>
      )}

      {user.userData && user.userData.role === 'laboratory staff' && (
      <div className="card" style={{ width: '80%' }}>
        <h3 className="mb-3 note note-primary">Hướng dẫn dùng hệ thống dành cho nhân viên xét nghiệm:</h3>
        <p>
          1. Nhân viên xét nghiệm xem danh sách bệnh nhân tiếp nhận bằng cách ấn vào mục Danh sách bệnh nhân tiếp nhận.
          Nhân viên xét nghiệm có thể tìm kiếm bệnh nhân trong danh sách theo mã bệnh nhân.
          <br />
          <br />
          2. Những bệnh nhân đã khám và chẩn đoán có chẩn đoán của bác sĩ kèm theo, nếu chưa thì sẽ hiện là 'Chưa xử lý'.
          Những bệnh nhân cần xét nghiệm sẽ có các trường thông tin phiếu xét nghiệm đánh dấu là 'Có'.
          <br />
          <br />
          3. Sau khi xét nghiệm, nhân viên xét nghiệm ấn vào những mục xét nghiệm hiển thị chữ 'Có' của bệnh nhân để tiến hành điền phiếu xét nghiệm.
          <br />
          <br />
          4. Sau khi điền xong phiếu xét nghiệm, nhân viên tiến hành ấn Xem phiếu xét nghiệm để xem chi tiết phiếu xét nghiệm
          và tải phiếu xét nghiệm lên hệ thống. Sau đó hệ thống sẽ hiển thị phiếu xét nghiệm đầy đủ. Tại đây, nhân viên xét nghiệm có thể
          lựa chọn tải phiếu xét nghiệm dưới dạng pdf bằng cách nhấn nút Tải phiếu xét nghiệm.
          <br />
          <br />
          5. Nhân viên xét nghiệm có thể ấn vào xem chi tiết thông tin về các xét nghiệm của bệnh nhân nếu có trạng thái 'Đã xong'.
          <br />
          <br />
          <footer style={{ textAlign: 'end', color: '#007bff' }}>
            Nếu có khó khăn trong quá trình sử dụng hệ thống,
            vui lòng liên hệ tới SĐT: 0964086794
            <br />
            hoặc gửi mail tới địa chỉ: tranphuongthao24051999@gmail.com để được hỗ trợ.
          </footer>
        </p>
      </div>
      )}

      {user.userData && user.userData.role === 'imaging staff' && (
      <div className="card" style={{ width: '80%' }}>
        <h3 className="mb-3 note note-primary">Hướng dẫn dùng hệ thống dành cho nhân viên chẩn đoán hình ảnh:</h3>
        <p>
          1. Nhân viên chẩn đoán hình ảnh xem danh sách bệnh nhân tiếp nhận bằng cách ấn vào mục Danh sách bệnh nhân tiếp nhận.
          Nhân viên chẩn đoán hình ảnh có thể tìm kiếm bệnh nhân trong danh sách theo mã bệnh nhân.
          <br />
          <br />
          2. Những bệnh nhân đã khám và chẩn đoán có chẩn đoán của bác sĩ kèm theo, nếu chưa thì sẽ hiện là 'Chưa xử lý'.
          Những bệnh nhân cần chẩn đoán hình ảnh sẽ có trường thông tin cần chẩn đoán hình ảnh đánh dấu là 'Có'.
          <br />
          <br />
          3. Sau khi chẩn đoán hình ảnh, nhân viên chẩn đoán hình ảnh ấn vào tên bệnh nhân được in xanh có mục cần chẩn đoán hình ảnh
          hiển thị chữ 'Có' để tiến hành tải ảnh lên hệ thống.
          <br />
          <br />
          4. Sau khi tải ảnh lên hệ thống, nhân viên ấn Tiến hành phân tích ảnh để hệ thống xử lý ảnh của bệnh nhân và đưa vào mô hình
          chẩn đoán ung thư hắc tố da. Sau đó, hệ thống sẽ hiển thị phiếu chẩn đoán hình ảnh đầy đủ của bệnh nhân kèm các kết quả phân tích.
          Tại đây, nhân viên chẩn đoán hình ảnh có thể lựa chọn tải phiếu chẩn đoán hình ảnh dưới dạng pdf bằng cách nhấn nút
          Tải kết quả chẩn đoán hình ảnh.
          <br />
          <br />
          5. Nhân viên chẩn đoán hình ảnh có thể ấn vào xem chi tiết thông tin về kết quả chẩn đoán hình ảnh
          của bệnh nhân nếu có trạng thái 'Đã xong'.
          <br />
          <br />
          <footer style={{ textAlign: 'end', color: '#007bff' }}>
            Nếu có khó khăn trong quá trình sử dụng hệ thống,
            vui lòng liên hệ tới SĐT: 0964086794
            <br />
            hoặc gửi mail tới địa chỉ: tranphuongthao24051999@gmail.com để được hỗ trợ.
          </footer>
        </p>
      </div>
      )}

      {user.userData && user.userData.role === 'admin' && (
      <div className="card" style={{ width: '80%' }}>
        <h3 className="mb-3 note note-primary">Hướng dẫn dùng hệ thống dành cho quản trị viên:</h3>
        <p>
          1. Quản trị viên có thể thêm mới tài khoản người dùng bằng cách chọn mục Nhập thông tin người dùng.
          <br />
          <br />
          2. Quản trị viên cần nhập đầy đủ thông tin và ấn Thêm thông tin người dùng để thêm mới tài khoản người dùng trong hệ thống.
          <br />
          <br />
          3. Quản trị viên có thể xem danh sách người dùng tại mục Danh sách người dùng. Tại đây,
          quản trị viên có thể xem danh sách người dùng, tìm kiếm người dùng theo vai trò, chỉnh sửa thông tin người dùng
          bằng cách ấn vào biểu tượng chỉnh sửa hoặc xóa một tài khoản người dùng bằng cách ấn vào biểu tượng xóa.
          <br />
          <br />
          4. Nếu quản trị viên chỉnh sửa thông tin người dùng, sau khi chỉnh sửa cần nhấn nút Cập nhật thông tin người dùng
          để thông tin của người dùng được cập nhật trên hệ thống.
          <br />
          <br />
          <footer style={{ textAlign: 'end', color: '#007bff' }}>
            Nếu có khó khăn trong quá trình sử dụng hệ thống,
            vui lòng liên hệ tới SĐT: 0964086794
            <br />
            hoặc gửi mail tới địa chỉ: tranphuongthao24051999@gmail.com để được hỗ trợ.
          </footer>
        </p>
      </div>
      )}
    </div>
  );
}

export default LandingPage;
