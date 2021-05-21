import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import UserInfo from './views/UserInfo/UserInfo';
import LaboratoryStaffBoard from './views/LaboratoryStaffBoard/LaboratoryStaffBoard';
import Biochemical from './views/LaboratoryStaffBoard/medicalTests/Biochemical';
import FungusAndParasite from './views/LaboratoryStaffBoard/medicalTests/FungusAndParasite';
import HematologyAndImmunology from './views/LaboratoryStaffBoard/medicalTests/HematologyAndImmunology';
import Result from './views/LaboratoryStaffBoard/medicalTests/Result';
import ImagingStaffBoard from './views/ImagingStaffBoard/ImagingStaffBoard';
import AdminBoard from './views/AdminBoard/AdminBoard';
import DoctorBoard from './views/DoctorBoard/DoctorBoard';
import PatientList from './views/AdminBoard/PatientList';
import patientStateReceived from './views/DoctorBoard/PatientList';
import imagingPatientList from './views/ImagingStaffBoard/PatientList';
import laboratoryPatientList from './views/LaboratoryStaffBoard/PatientList';
import ImageProcessing from './views/ImagingStaffBoard/ImageProcessing';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="main">
        <NavBar />
        <div className="middle" style={{ paddingTop: '69px' }}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, true)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, false)} />
            <Route exact path="/user/:userId" component={Auth(UserInfo, true)} />
            <Route exact path="/laboratoryStaffBoard" component={Auth(LaboratoryStaffBoard, true)} />
            <Route exact path="/imagingStaffBoard/:id" component={Auth(ImagingStaffBoard, true)} />
            <Route exact path="/adminBoard" component={Auth(AdminBoard, true)} />
            <Route exact path="/doctorBoard/:id" component={Auth(DoctorBoard, true)} />
            <Route exact path="/laboratoryStaffBoard/biochemical/:patientId" component={Auth(Biochemical, true)} />
            <Route exact path="/laboratoryStaffBoard/fungusAndParasite/:patientId" component={Auth(FungusAndParasite, true)} />
            <Route exact path="/laboratoryStaffBoard/hematologyAndImmunology/:patientId" component={Auth(HematologyAndImmunology, true)} />
            <Route exact path="/laboratoryStaffBoard/result/:patientId" component={Auth(Result, true)} />
            <Route exact path="/patientsList" component={Auth(PatientList, true)} />
            <Route exact path="/patientStateReceived" component={Auth(patientStateReceived, true)} />
            <Route exact path="/imagingPatientList" component={Auth(imagingPatientList, true)} />
            <Route exact path="/laboratoryPatientList" component={Auth(laboratoryPatientList, true)} />
            <Route exact path="/imageProcessing/:id" component={Auth(ImageProcessing, true)} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
