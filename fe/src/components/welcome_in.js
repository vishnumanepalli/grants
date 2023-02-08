import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {useEffect} from 'react';
import axios from 'axios';

import '../pages/login/login.css'
import Navbar from './navbar_i.component'

export function WelcomeInstructor(user){
    let navigate = useNavigate();
    const[email,setemail]=useState('')
    const logoutHandler = async () => {
        localStorage.removeItem("token")
        navigate('/')
        window.location.reload(false);
      }
      async function fetchData(){
        var getToken={token : localStorage.getItem('token')}
        if(getToken.token!=null){
        //   console.log(getToken)
          var fetchUserData = await axios.post(`${process.env.REACT_APP_API_URL}/tokenData/getData`,getToken,{headers:{
            'Authorization': getToken.token
          }});
        //   setIsLoginChecked(true)
        //   console.log(isLoginChecked)
        //   setUser(fetchUserData.data.data);
        console.log(fetchUserData.data.data.phone_number)
        setemail(fetchUserData.data.data.phone_number)
        console.log(email)
        }
        
        }
        useEffect(() => {
          fetchData();
        },[])

    return(
        <>
        <div className='container'>
                <Navbar />
            </div>
        <div className='btnContainer10'>
            <h1 style={{"textAlign":'center'}}>Hi {email}</h1>
        <Button variant="contained" className='otp' onClick={logoutHandler}>LogOut</Button>
        </div>
        
        </>
        
    )
}