/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Login} from './pages/login/Login';
import axios from 'axios';
import {WelcomeAdvisor} from './components/welcome_ad'
import {WelcomeUser} from './components/welcome_st'
// import {WelcomeUser} from './pages/welcome/WelcomeUser'
import { WelcomeInstructor } from './components/welcome_in';
import ProtectedRoute from './ProtectedRoute';
import Courses  from './components/courses-list.component'
import Enroll from './components/enroll.compoenent'
// import Edit from './components/edit-exercise.component'
import Approval_I from './components/ins_approval.component'
import Approval_A from './components/adv_approval.component'
import Create_course from './components/create-course.component'
import Show_course from './components/enroll_list.component'
import './App.css';

function App() {
  // var getToken={token : localStorage.getItem('token')}
  // var fetchUserData = await axios.post(`${process.env.REACT_APP_API_URL}/tokenData/getData`,getToken,{headers:{
  //     'Content-Type': 'application/json',
  //     'Authorization': getToken
  //   }});
  var [isLoginChecked,setIsLoginChecked]= useState(false);
  var [user,setUser] = useState();
  async function fetchData(){
  var getToken={token : localStorage.getItem('token')}
  if(getToken.token!=null){
    console.log(getToken)
    var fetchUserData = await axios.post(`${process.env.REACT_APP_API_URL}/tokenData/getData`,getToken,{headers:{
      'Authorization': getToken.token
    }});
    setIsLoginChecked(true)
    console.log(isLoginChecked)
    setUser(fetchUserData.data.data);
  }
  }
  useEffect(() => {
    fetchData();
  },[])
  console.log(user)
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login user={user}/>} exact />
      <Route path="*" element={<Login user={user}/>} exact />
        <Route path="/login" key='user' element={<Login user={user} />} exact />
        <Route path="/admin-login" key='admin' element={<Login user={user} />} exact />
        <Route path="/welcomeUser" key='user' element={<WelcomeUser user={user} />} exact />
        <Route path="/cour_off" key='user' element={<Courses user={user} />} exact />
        <Route path="/enroll" key='user' element={<Enroll user={user} />} exact />
        <Route path="/welcomeInstructor" key='user' element={<WelcomeInstructor user={user} />} exact />
        <Route path="/ins_app" key='user' element={<Approval_I user={user} />} exact />
        <Route path="/create" key='user' element={<Create_course user={user} />} exact />
        <Route path="/list" key='user' element={<Show_course user={user} />} exact />
        <Route path="/welcomeAdvisor" key='user' element={<WelcomeAdvisor user={user} />} exact />
        <Route path="/adv_app" key='user' element={<Approval_A user={user} />} exact />
      </Routes>
    </Router>
  )
}

export default App;