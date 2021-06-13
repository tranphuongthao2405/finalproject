/* eslint-disable new-cap */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import Logo from '../LaboratoryStaffBoard/medicalTests/images/logo.jpg';

function ImageProcessing(props) {
  const patientId = props.match.params.id;
  const date = new Date().toLocaleString('en-GB');
  const user = useSelector((state) => state.user);

  const [name, setName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState();
  const [address, setAddress] = useState();
  const [patientType, setPatientType] = useState();
  const [department, setDepartment] = useState();

  const [images, setImages] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [imageProcessing, setImageProcessing] = useState([]);
  const [done, setDone] = useState(false);
  let tempCount = 0;

  useEffect(() => {
    axios.get(`/api/patients/getPatientById?id=${patientId}`)
      .then((response) => {
        if (response.data.success) {
          const fulltime = response.data.patient[0].birthDate;
          const day = fulltime.substring(8, 10);
          const month = fulltime.substring(5, 7);
          const year = fulltime.substring(0, 4);
          const time = `${day}/${month}/${year}`;
          setName(response.data.patient[0].name);
          setAddress(response.data.patient[0].address);
          setGender(response.data.patient[0].gender);
          setBirthDate(time);
          setDepartment(response.data.patient[0].department);
          setPatientType(response.data.patient[0].patientType);
        } else {
          alert(response.data.err);
        }
      });
  }, []);

  useEffect(() => {
    if (images && images.length > 0) {
      const imagesArr = [];

      // eslint-disable-next-line no-unused-expressions
      images
        // eslint-disable-next-line array-callback-return
        && images.map((item) => {
          const folder = item.substring(0, 8);
          const mimage = `m${item.substring(8)}`;
          const mitem = folder + mimage;
          const dimage = `d${item.substring(8)}`;
          const ditem = folder + dimage;
          imagesArr.push({
            original: `http://localhost:5000/${item}`,
            thumbnail: `http://localhost:5000/${item}`,
          });
          imagesArr.push({
            original: `http://localhost:5000/${mitem}`,
            thumbnail: `http://localhost:5000/${mitem}`,
          });
          imagesArr.push({
            original: `http://localhost:5000/${ditem}`,
            thumbnail: `http://localhost:5000/${ditem}`,
          });
        });
      setImagesArray(imagesArr);
    }
  }, [images]);

  useEffect(() => {
    const dataToSubmit = {
      patientId,
    };

    axios.post('/api/diagnosis/imagingDiagnosis/getImagingDiagnosisById', dataToSubmit)
      .then((response) => {
        if (response.data.success) {
          if (response.data.doc[0] !== undefined) {
            setImages(response.data.doc[0].images);
            setImageProcessing(response.data.doc[0].imagingDiagnosis);
            const dataToSubmit2 = {
              patientId,
              imaging: 'done',
            };

            axios.post('/api/diagnosis/updateImagingDiagnosis', dataToSubmit2).then((res) => {
              if (res.data.success) {
                // alert('Update information successfully');
                setDone(true);
              } else {
                alert('Failed to update information');
              }
            });
          }
        } else {
          console.log(response.data.err);
        }
      });
  }, []);

  const downloadForm = () => {
    const divToDownload = document.getElementById('download-form');
    html2canvas(divToDownload, {
      scrollY: -window.scrollY,
      useCORS: true,
    }).then((canvas) => {
      const divImage = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(divImage);
      const width = 210;
      const height = (imgProps.height * width) / imgProps.width;
      pdf.addImage(divImage, 'png', 0, 10, width, height);
      const title = `${patientId}_chandoanhinhanh.pdf`;
      pdf.save(title);
    });
  };

  const imgType = (value) => {
    let returnType;
    if (value % 3 === 1) {
      returnType = 'Ảnh gốc';
    } else if (value % 3 === 2) {
      returnType = 'Ảnh mask';
    } else if (value % 3 === 0) {
      returnType = 'Ảnh so sánh';
    }
    return returnType;
  };

  const returnPercentage = (value) => {
    let percentage;
    let returnString;
    if (value % 3 === 1) {
      percentage = parseFloat(imageProcessing[value - 1]) % 100;
      returnString = `${percentage}%`;
    } else {
      returnString = '';
    }
    return returnString;
  };

  return (
    <>
      {done && images && images.length > 0 && imagesArray && user.userData ? (
        <div className="outer-form">
          <div className="laboratory-form" id="download-form">
            <div className="form-row">
              <div className="form-group col-md-2">
                <img src={Logo} alt="logo" width="100%" height="90%" />
              </div>
              <div className="form-group col-md-8">
                <p>
                  <b>
                    Bệnh viện Da liễu Trung ương
                    <br />
                    15A Phương Mai - Đống Đa - Hà Nội
                    <br />
                    Website:
                    {' '}
                    <a href="http://dalieu.vn" style={{ color: 'black' }}>
                      http://dalieu.vn
                    </a>
                  </b>
                </p>
                <p style={{ textAlign: 'center', fontSize: '24px' }}>
                  <b>PHIẾU CHỤP CHẨN ĐOÁN HÌNH ẢNH</b>
                </p>
              </div>

              <div>
                <label htmlFor="patientId">
                  Mã BN:
                  {' '}
                  {patientId}
                </label>
              </div>
            </div>

            {/* form fields */}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="username">
                  Họ tên người bệnh:
                  {' '}
                  {name}
                </label>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="birthDate">
                  Năm sinh:
                  {' '}
                  {birthDate}
                </label>
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="gender">
                  Giới tính:
                  {' '}
                  {gender}
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">
                Địa chỉ:
                {' '}
                {address}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="patientType">
                Đối tượng:
                {' '}
                {patientType}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="department">
                Khoa phòng:
                {' '}
                PK
                {department}
              </label>
            </div>
            <p style={{ textAlign: 'center', fontSize: '18px' }}>
              <b>KẾT QUẢ PHÂN TÍCH HÌNH ẢNH</b>
            </p>
            {imagesArray && imagesArray.length > 0 && (
            <table className="table table-bordered">
              <thead>
                <th scope="col" className="text-center">STT</th>
                <th scope="col" className="text-center">Ảnh</th>
                <th scope="col" className="text-center">Loại ảnh</th>
                <th scope="col" className="text-center">Tỉ lệ bị Melanoma</th>
              </thead>
                {imagesArray.map((img) => {
                  tempCount += 1;
                  return (
                    <tbody>
                      <td className="text-center">{tempCount}</td>
                      <td className="text-center"><img style={{ width: 256, height: 256 }} src={img.original} alt="img-diagnosis" /></td>
                      <td className="text-center">{imgType(tempCount)}</td>
                      <td className="text-center">{returnPercentage(tempCount)}</td>
                    </tbody>
                  );
                })}
            </table>
            )}

            <div className="form-row">
              <div className="col" />
              <div className="col">
                <p style={{ fontStyle: 'italic', textAlign: 'center' }}>
                  In phiếu ngày
                  {' '}
                  {date}
                </p>
                <p style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  NHÂN VIÊN CHỤP CHẨN ĐOÁN HÌNH ẢNH
                  <br />
                  {user.userData.firstname}
                  {' '}
                  {user.userData.lastname}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : ((
        <div className="p-5 text-center">
          <h6 className="mb-3">Đang tải phiếu chẩn đoán hình ảnh...</h6>
        </div>
      ))}

      {done && images && images.length > 0 && imagesArray && (
      <div>
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25%' }} className="not-download">
          <ImageGallery items={imagesArray} />
        </div>

        <div className="form-row justify-content-center">
          <button className="btn btn-primary" onClick={downloadForm}>
            Tải kết quả chẩn đoán hình ảnh
          </button>
        </div>
      </div>
      )}
    </>
  );
}

export default ImageProcessing;
