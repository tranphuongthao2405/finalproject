/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';

function UserList() {
  const [users, setUsers] = useState();
  const [showTable, setShowTable] = useState(false);
  let count = 0;

  useEffect(() => {
    axios.get('/api/users/getAllUsers').then((response) => {
      if (response.data.success) {
        setShowTable(true);
        setUsers(response.data.users);
      } else {
        setShowTable(false);
      }
    });
  }, []);

  const search = () => {
    // Declare variables
    let td; let i; let txtValue;
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('myTable');
    const tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i += 1) {
      td = tr[i].getElementsByTagName('td')[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  };

  const onDeleteClick = (e) => {
    let id = e.target.id;
    id = id.substring(6);

    axios.get(`/api/users/deleteUserById?id=${id}`).then((response) => {
      if (response.data.success) {
        // console.log(response.data.result);
      } else {
        // alert(response.data.err);
      }
    });

    const tr = document.getElementById(id);
    tr.remove();
  };

  return (
    <div style={{ width: '100%' }}>
      <div className="p-5 text-center">
        <h3 className="mb-3">DANH SÁCH NGƯỜI DÙNG HỆ THỐNG</h3>
      </div>
      {users && users.length > 0 && showTable && (
        <div className="container-fluid">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-8" />
                  <div className="col-sm-4">
                    <div className="search-box" style={{ width: '70%' }}>
                      <i className="material-icons">&#xE8B6;</i>
                      <input type="text" className="form-control" placeholder="Tìm kiếm theo vai trò&hellip;" id="searchInput" onKeyUp={search} />
                    </div>
                  </div>
                </div>
              </div>
              <table
                data-search="true"
                tabIndex={-1}
                data-search-on-enter-key="true"
                className="table table-striped table-hover table-bordered"
                id="myTable"
              >
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>
                      Họ
                    </th>
                    <th>Tên</th>
                    <th>
                      Email
                    </th>
                    <th>Vai trò</th>
                    <th>
                      Trạng thái
                    </th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>

                  {
                   users.map(((user) => {
                     let role;
                     switch (user.role) {
                       case 'admin':
                         role = 'Admin';
                         break;
                       case 'staff':
                         role = 'Nhân viên';
                         break;
                       case 'laboratory staff':
                         role = 'Nhân viên xét nghiệm';
                         break;
                       case 'imaging staff':
                         role = 'Nhân viên chụp chẩn đoán hình ảnh';
                         break;
                       case 'doctor':
                         role = 'Bác sĩ';
                         break;
                       default:
                     }
                     count += 1;
                     return (
                       <tr id={user._id}>
                         <td>{count}</td>
                         <td>{user.firstname}</td>
                         <td>{user.lastname}</td>
                         <td>{user.email}</td>
                         <td>{role}</td>
                         <td>{user.token ? 'Đang hoạt động' : 'Đang không hoạt động'}</td>
                         <td>
                           <a href={`/useredit/${user._id}`} className="edit" title="Edit" data-toggle="tooltip">
                             <i
                               className="material-icons"
                             >
                               &#xE254;
                             </i>
                           </a>
                           <a
                             className="delete"
                             title="Delete"
                             data-toggle="tooltip"
                             onClick={onDeleteClick}
                           >
                             <i className="material-icons" id={`delete${user._id}`}>&#xE872;</i>
                           </a>
                         </td>
                       </tr>
                     );
                   }))
                 }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) }
    </div>
  );
}

export default React.memo(UserList);
