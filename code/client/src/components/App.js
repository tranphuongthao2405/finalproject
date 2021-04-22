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
            <Route exact path="/imagingStaffBoard" component={Auth(ImagingStaffBoard, true)} />
            <Route exact path="/laboratoryStaffBoard/biochemical" component={Auth(Biochemical, true)} />
            <Route exact path="/laboratoryStaffBoard/fungusAndParasite" component={Auth(FungusAndParasite, true)} />
            <Route exact path="/laboratoryStaffBoard/hematologyAndImmunology" component={Auth(HematologyAndImmunology, true)} />
            <Route exact path="/laboratoryStaffBoard/result" component={Auth(Result, true)} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
