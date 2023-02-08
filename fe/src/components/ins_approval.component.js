import React, { Component } from 'react';
import axios from 'axios';
import '../pages/login/login.css'
import Navbar from './navbar_i.component'
import Button from '@mui/material/Button';

export default class CoursesList extends Component {
    constructor(props) {
        super(props);
        this.state = { courses: [] };
        this.email="";
    }
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ courses: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
            var getToken={token : localStorage.getItem('token')}
      if(getToken.token!=null){
         axios.post(`${process.env.REACT_APP_API_URL}/tokenData/getData`,getToken,{headers:{
          'Authorization': getToken.token
        }})
        .then(response => {
          // console.log(response.data.data.phone_number)
          this.email=response.data.data.phone_number
                    console.log(this.email)

        });
      }
    }

    addrequest(id) {
        axios.get('http://localhost:5000/exercises/' + id)
            .then(response => {
                const exercise = {
                    code: response.data.code,
                    course: response.data.course,
                    LTPSC: response.data.LTPSC,
                    status: "pending advisor approval",
                    from: response.data.from,
                    to_in: response.data.to_in,
                    to_ad: response.data.to_ad
                }
                axios.delete('http://localhost:5000/exercises/'+id)
                .then(axios.post('http://localhost:5000/exercises/add', exercise)
                    .then(window.location.reload(true))
                    );
            })
    }
    exerciseList() {
        return this.state.courses.filter(course => course.status === "pending instructor approval"&&course.to_in===this.email ).map(course => {
            return (
                <>
                    <tr key={course.code} >
                        <td>{course.from}</td>
                        <td>{course.code}</td>
                        <td>{course.course}</td>
                        <td>{course.LTPSC}</td>
                        <td>
                        <Button variant="contained" className='ctp' onClick={() => { this.addrequest(course._id)}}>Accept</Button></td>
                    </tr>
                </>
            );
        })
    }

    render() {
        return (

            <div>
                <div className='container'>
                    <Navbar />
                </div>
                <h3>Course Approval by Instructor</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Student ID</th>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>LTPSC</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}