import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { AuthProvider } from './compornent/base/AuthContext';
import { LocationProvider } from './compornent/base/LocationContext';

import Header from './compornent/base/header';

import TimeLine from './compornent/pages/views/timeline';
import Home from './compornent/pages/views/location';
import SignUp from './compornent/pages/views/SignUp';
import Login from './compornent/pages/views/Login';
import Write from './compornent/pages/views/kutikomiWrite';
import Co2 from './compornent/pages/views/co2';
import Trace from './compornent/pages/views/trace';
import StaffLogin from './compornent/pages/views/StaffLogin';
import StaffDashboard from './compornent/pages/views/staffDashbord';
import Mypage from './compornent/pages/views/mypage';
function App() {
  

  return (
    <div className='home'>
    <AuthProvider>
    <LocationProvider>
    <Router>
    <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/write' element={<Write />}/>
          <Route path='/timeline' element={<TimeLine />}/>
          <Route path='/co2' element={<Co2 />}/>
          <Route path='/trace' element={<Trace />}/>
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path='/staff-dashboard' element={<StaffDashboard />} />
          <Route path='/mypage' element={<Mypage />} />
        </Routes>
      </Router>
    {/*<Footer /> */}
    </LocationProvider>
    </AuthProvider>
  </div>
  );
}

export default App;