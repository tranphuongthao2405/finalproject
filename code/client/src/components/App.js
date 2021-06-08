import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import UserInfo from './views/UserInfo/UserInfo';
import Biochemical from './views/LaboratoryStaffBoard/medicalTests/Biochemical';
import FungusAndParasite from './views/LaboratoryStaffBoard/medicalTests/FungusAndParasite';
import HematologyAndImmunology from './views/LaboratoryStaffBoard/medicalTests/HematologyAndImmunology';
import Result from './views/LaboratoryStaffBoard/medicalTests/Result';
import ImagingStaffBoard from './views/ImagingStaffBoard/ImagingStaffBoard';
import AdminBoard from './views/AdminBoard/AdminBoard';
import DoctorBoard from './views/DoctorBoard/DoctorBoard';
import PatientList from './views/AdminBoard/PatientList';
import DoctorPatientList from './views/DoctorBoard/PatientList';
import ImagingPatientList from './views/ImagingStaffBoard/PatientList';
import LaboratoryPatientList from './views/LaboratoryStaffBoard/PatientList';
import ImageProcessing from './views/ImagingStaffBoard/ImageProcessing';
import BiochemicalForm from './views/LaboratoryStaffBoard/medicalTests/BiochemicalForm';
import FungusForm from './views/LaboratoryStaffBoard/medicalTests/FungusForm';
import HematologyForm from './views/LaboratoryStaffBoard/medicalTests/HematologyForm';
import ResultForm from './views/LaboratoryStaffBoard/medicalTests/ResultForm';
import PatientProfile from './views/PatientProfile/PatientProfile';
import PatientInfo from './views/PatientProfile/PatientInfo';

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
            <Route exact path="/imagingStaffBoard/:id" component={Auth(ImagingStaffBoard, true)} />
            <Route exact path="/adminBoard" component={Auth(AdminBoard, true)} />
            <Route exact path="/doctorBoard/:id" component={Auth(DoctorBoard, true)} />
            <Route exact path="/laboratoryStaffBoard/biochemical/:patientId" component={Auth(Biochemical, true)} />
            <Route exact path="/laboratoryStaffBoard/fungusAndParasite/:patientId" component={Auth(FungusAndParasite, true)} />
            <Route exact path="/laboratoryStaffBoard/hematologyAndImmunology/:patientId" component={Auth(HematologyAndImmunology, true)} />
            <Route exact path="/laboratoryStaffBoard/result/:patientId" component={Auth(Result, true)} />
            <Route exact path="/patientsList" component={Auth(PatientList, true)} />
            <Route exact path="/doctorPatientList" component={Auth(DoctorPatientList, true)} />
            <Route exact path="/imagingPatientList" component={Auth(ImagingPatientList, true)} />
            <Route exact path="/laboratoryPatientList" component={Auth(LaboratoryPatientList, true)} />
            <Route exact path="/imageProcessing/:id" component={Auth(ImageProcessing, true)} />
            <Route exact path="/biochemicalForm/:id" component={Auth(BiochemicalForm, true)} />
            <Route exact path="/fungusForm/:id" component={Auth(FungusForm, true)} />
            <Route exact path="/hematologyForm/:id" component={Auth(HematologyForm, true)} />
            <Route exact path="/resultForm/:id" component={Auth(ResultForm, true)} />
            <Route exact path="/patientProfile" component={Auth(PatientProfile, true)} />
            <Route exact path="/patientProfile/:id" component={Auth(PatientInfo, true)} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
