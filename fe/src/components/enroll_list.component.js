import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar_i.component'

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

    exerciseList() {
        return this.state.courses.filter(course => course.status === "enrolled").map(course => {
            return (
                <>
                    <tr key={course.code} >
                        <td>{course.code}</td>
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