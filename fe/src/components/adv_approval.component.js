import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar_a.component'
import Button from '@mui/material/Button';


export default class CoursesList extends Component {
    constructor(props) {
        super(props);
        this.state = { courses: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ courses: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    addrequest(id) {
        axios.get('http://localhost:5000/exercises/' + id)
            .then(response => {
                const exercise = {
                    code: response.data.code,
                    course: response.data.course,
                    LTPSC: response.data.LTPSC,
                    status: "enrolled",
                    from: response.data.from,
                    to_in: response.data.to_in,
                    to_ad: response.data.to_ad
                }
                axios.delete('http://localhost:5000/exercises/' + id)
                .then(axios.post('http://localhost:5000/exercises/add', exercise)
                    .then(window.location.reload(true)));
            })   
    }

    exerciseList() {
        return this.state.courses.filter(course => course.status === "pending advisor approval").map(course => {
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
                <h3>Course Approval by Advisor</h3>
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