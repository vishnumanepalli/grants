import React, { useEffect, useState } from 'react';
import TextInput from '../../components/TextInput';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import teacher from '../../images/teacher.png';
import advisor from '../../images/advisor.png';
import student from '../../images/student.png';
import './login.css';
import axios from 'axios';
export function Login({ user, isLoginChecked }) {
    let navigate = useNavigate();
    const [state, setState] = useState({Email: '' });
    const [role, setRole] = useState('user');
    const [alert, setMessage] = useState({ message: "", severity: "" });
    const [openAlert, setOpenAlert] = useState(false);
    const [openLoader, setOpenLoader] = useState(true);
    const [next, setNext] = useState(true);
    const [otp, setOtp] = useState({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "" ,otp6:""})
    const changeHandler = (name, value) => {
        setState({ ...state, [name]: value })
    }
    const handleChange = (value1, event) => {
        if (event.target.value.length <= 1) {
            setOtp({ ...otp, [value1]: event.target.value });
        }
    }
    const inputfocus = (elmnt, key) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = key * 2 - 4;
            if (next >= 0) elmnt.target.form.elements[next].focus()
        }
        else {
            const next = key * 2;
            if (next < 11) elmnt.target.form.elements[next].focus()
            else document.getElementById('btn').focus()
        }
    }

    const roleHandler_s = () => {
        console.log(openLoader)
        setState({Email: '' });
        setOtp({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "" ,otp6:""})
        if (!next) {
            setNext(true)
        }
        setRole('user')
        navigate('/login')
    };

    const roleHandler_i = () => {
        console.log(openLoader)
        setOtp({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "" ,otp6:""})
            if (!next) {
                setNext(true)

            }
            setRole('instructor')
            navigate('/instructor-login')
    };
    const roleHandler_a = () => {
        console.log(openLoader)
        setOtp({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "" ,otp6:""})
            if (!next) {
                setNext(true)

            }
            setRole('advisor')
            navigate('/advisor-login')
    };

    useEffect(() => {
            if (user) {
                navigate('/welcomeUser')
            }
            setOpenLoader(false)
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    
    const verifyHandler = async () => {
        const newOtp = otp.otp1 +otp.otp2 +otp.otp3 +otp.otp4 +otp.otp5 +otp.otp6;
        const reqBody = {otp:newOtp, role:role, Email: state.Email};
        console.log(state.Email)
        console.log(reqBody)
        await axios.post(`${process.env.REACT_APP_API_URL}/signin/verify`, reqBody)
        .then(async(response) => {
            console.log(response.data)
            setOtp({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "" ,otp6:""})
            if(response.data.isCorrect){
                if(response.data.token!=null){
                    console.log('this is token',response.data.token)
                    const message = alert;
                    message.message = response.data.status.message
                    message.severity = 'success'
                    setMessage(message);
                    setOpenAlert(true);
                    var token = response.data.token;
                    localStorage.setItem('token',token)
                    var fetchUserData = await axios.post(`${process.env.REACT_APP_API_URL}/tokenData/getData`,token,{headers:{
                        'Authorization': token
                      }});
                      console.log(fetchUserData.role)
                    if(role==='user'){
                        navigate("/welcomeUser")
                    }
                    else if(role==='instructor'){
                        navigate("/welcomeInstructor")
                    }
                    else{
                        navigate("/welcomeAdvisor")
                    }
                    window.location.reload(false);
                }
                else{
                    const message = alert;
                    message.message = response.data.status.message
                    message.severity = 'error'
                    setMessage(message);
                    setOpenAlert(true);
                }
            }
            else{
                const message = alert;
                message.message = `Wrong OTP. Please Try Again`
                message.severity = 'error'
                setMessage(message);
                setOpenAlert(true);
            }
        })
        .catch((err) => {
            console.log(err)
            setOtp({ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "" ,otp6:""})
            const message = alert;
            message.message = `Failed to Verify OTP. Please try again`
            message.severity = 'error'
            setMessage(message);
            setOpenAlert(true);
        })
    }

    const resendHandler = async () => {       
        otpHandler();
    }

    const enterHandler = () => {
        setNext(true)
    }

    const otpHandler = async () => {
        const Body = {Email: state.Email};
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
        console.log(state.Email)
        console.log("kj")
        if (state.Email.match(validRegex)&&state.Email!=null) {
            await axios.post(`${process.env.REACT_APP_API_URL}/signin/`,Body)
            .then((response)=>{
                console.log("hi");
                console.log(response)
                setNext(false)
            })
            .catch((error) => {
                console.log("failed",error,state.Email)})
            }
        else {
            console.log("hi")
            const message = alert;
            message.message = 'Please Enter a valid Email'
            message.severity = 'error'
            setMessage(message);
            setOpenAlert(true);

        }
    }
    return (<div className='page' >
        <div className='formContainer'>
            <div className='form'>
                {role === 'user' ?
                    <>
                        <img src={student} className='icon1' alt='doctor' />
                        <h2 className='h2'>Student Login</h2>
                    </> :
                    role === 'instructor' ?
                    <>
                        <img src={teacher} className='icon1' alt='doctor' />
                        <h2 className='h2'>Instructor Login</h2>
                    </> :
                    <>
                        <img src={advisor} className='icon2' alt='doctor' />
                        <h2 className='h2'>Advisor Login</h2>
                    </>}
                {next ? <div>
                    <div className='container'>
                        <TextInput label='Email_ID' name='Email' type='text' value={state.Email}
                            onChange={changeHandler} InputProps={{
                                startAdornment: <InputAdornment position="start"></InputAdornment>,
                            }} />
                    </div>
    
                    <div className='btnContainer'>
                        <Button variant="contained" className='otp' onClick={otpHandler}>Send OTP</Button>
                    </div>
                </div> : <div>
                    <div className='container2'>
                        <Box component='form'>
                            <TextField className='textwidth inputwidth' type='number' required id="outlined-basic" autoFocus
                                onChange={e => handleChange("otp1", e)} tabIndex="1" value={otp.otp1}
                                maxLength={1} onKeyUp={e => inputfocus(e, 1)} />

                            <TextField className='textwidth inputwidth' type='number' required id="outlined-basic" value={otp.otp2}
                                onChange={e => handleChange("otp2", e)} tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e, 2)} />

                            <TextField className='textwidth inputwidth' type='number' required id="outlined-basic" value={otp.otp3}
                                onChange={e => handleChange("otp3", e)} tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e, 3)} />

                            <TextField className='textwidth inputwidth' type='number' required id="outlined-basic" value={otp.otp4}
                                onChange={e => handleChange("otp4", e)} tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e, 4)} />

                            <TextField className='textwidth inputwidth' type='number' required id="outlined-basic" value={otp.otp5}
                                onChange={e => handleChange("otp5", e)} tabIndex="5" maxLength="1" onKeyUp={e => inputfocus(e, 5)} />

                            <TextField className='textwidth inputwidth' type='number' required id="outlined-basic" value={otp.otp6}
                                onChange={e => handleChange("otp6", e)} tabIndex="6" maxLength="1" onKeyUp={e => inputfocus(e, 6)}
                                onK />
                        </Box>
                    </div>
                    <div className='btnContainer'>
                        <Button id='btn' variant="contained" className='verify' onClick={verifyHandler}>Verify</Button>
                    </div>
                </div>
                }{next === false &&
                    <div>
                        <div className='resendContainer'>
                            <p className='p'>Wrong Email? Click on</p>
                            <Button variant="text" className='resend' onClick={enterHandler}>enter again</Button>
                        </div>
                        <div className='resendContainer'>
                            <p className='p'>Didn't get an OTP? Click on </p>
                            <Button variant="text" className='resend' onClick={resendHandler}>resend OTP</Button>
                        </div>
                    </div>
                }
                <div className='btnContainer3'>
                    {role === 'user' ?
                        <div><Button variant="text" className='login' onClick={roleHandler_i}>Login as Instructor</Button><br/>
                        <Button variant="text" className='login' onClick={roleHandler_a}>Login as Advisor</Button></div> :
                        role === 'advisor' ?
                        <div><Button variant="text" className='login' onClick={roleHandler_s}>Login as Student</Button><br/>
                        <Button variant="text" className='login' onClick={roleHandler_i}>Login as Instructor</Button></div> :
                        <div><Button variant="text" className='login' onClick={roleHandler_s}>Login as Student</Button><br/>
                        <Button variant="text" className='login' onClick={roleHandler_a}>Login as Advisor</Button></div>}
                </div>
                <Snackbar open={openAlert} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alert.severity}>
                        {alert.message}
                    </Alert>
                </Snackbar>
                <div id='recaptcha-container'></div>
            </div>
            <br />
            <div className='name'>
            <div className='name2'>
                <p>Team 16<br></br>
                Sreya    - 2020CSB1087<br></br>
                Vishnu    - 2020CSB1097<br></br>
                Shruthi   - 2020CSB1121<br></br>
                Lashyanth - 2020CSB1083</p>
            </div>
            </div>
        </div>
    </div>
    );
}