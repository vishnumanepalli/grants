import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Navbar from './navbar_s.component'

export default class CoursesList extends Component {
    constructor(props) {
        super(props);
        this.state = { courses: [] };
        this.email='';
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

    exerciseList() {
        return this.state.courses.filter(course => course.from === this.email).map(course => {
            return (
                <>
                    <tr key={course.code} >
                        <td>{course.from}</td>
                        <td>{course.course}</td>
                        <td>{course.LTPSC}</td>
                        <td>{course.status}</td>
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
                <h3>Courses Registered</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>LTPSC</th>
                            <th>Status</th>
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