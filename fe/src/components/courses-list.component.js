import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar_s.component'
import Button from '@mui/material/Button';
// import {useAlert} from 'react-router-dom';
const Course = props => (
  <tr>
    <td>{props.course.code}</td>
    <td>{props.course.course}</td>
    <td>{props.course.LTPSC}</td>
    <td>
      <Link to={"/edit/" + props.course._id}>edit</Link>|<a href="#" onClick={() => { CoursesList.addrequest(props.course._id) }}>delete</a>
    </td>
  </tr>
)

export default class CoursesList extends Component {
  constructor(props) {
    super(props);
    this.handleSucess = this.handleSucess.bind(this)
    this.addrequest = this.addrequest.bind(this)
    this.state = {courses: []};
    this.email='';
    this.suc="";
  }
  componentDidMount() {
    axios.get('http://localhost:5000/courses/')
      .then(response => {
        this.setState({ courses: response.data})
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
    axios.get('http://localhost:5000/courses/' + id)
      .then(response => {
        const exercise={
          code: response.data.code,
          course: response.data.course,
          LTPSC: response.data.LTPSC,
          status: "pending instructor approval",
          from:this.email,
          to_in: response.data.to_in,
          to_ad:"adv"
        }
        axios.post('http://localhost:5000/exercises/add', exercise)
          .then(this.handleSucess("Request sent successfully"))
          // .then(useAlert().show('Enrolled successfully'));
      })
  }

  handleSucess(mes){
    this.show=true;
    this.suc=mes;
    setTimeout(()=>{
      this.show=false
    },3000);
  };

  exerciseList() {
    return this.state.courses.map(course => {
      return(
        <>
          <tr key={course.code} >
            <td>{course.code}</td>
            <td>{course.course}</td>
            <td>{course.LTPSC}</td>
            <td>
            <Button variant="contained" className='ctp' onClick={() => { this.addrequest(course._id)}}>Enroll</Button></td>
           
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
          {this.show && <div className='success'>{this.suc}</div>}
        </div>
        <h3>Courses Offered</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
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