import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './navbar_i.component'

export default class CreateExercises extends Component{
  constructor(props){
    super(props);

    this.onChangecode = this.onChangecode.bind(this);
    this.onChangecourse = this.onChangecourse.bind(this);
    this.onChangeLTPSC = this.onChangeLTPSC.bind(this);
    // this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state={
      code:'',
      course:'',
      LTPSC:'',
      to_in:'sir'
      // date : new Date(),
      // users:[]
    }
    this.email=''
  }

  onChangecode(e) {
    this.setState({
    code: e.target.value
    })
  }

  onChangecourse(e) {
    this.setState({
      course: e.target.value
    })
  }

  onChangeLTPSC(e) {
    this.setState({
      LTPSC: e.target.value
    })
  }

  componentDidMount() {
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

    onSubmit(e) {
      e.preventDefault();
  
      const course_user = {
        code: this.state.code,
        course: this.state.course,
        LTPSC: this.state.LTPSC,
        to_in:this.email// date: this.state.date
      }
  
      console.log(course_user);
  
      axios.post('http://localhost:5000/courses/add', course_user)
        .then(res => console.log(res.data));
      // alert.show('show mee',"dfgdfe")
      this.setState({
        code: '',
        course:'',
        LTPSC:''
      })
  }

  render() {
        return (
        <div>
            <div className='container'>
              <Navbar />
            </div>
          <h3>Add new course</h3>
          <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
              <label>Course Code: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.code}
                  onChange={this.onChangecode}
                  />
            </div>
            <div className="form-group"> 
              <label>Course Name: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.course}
                  onChange={this.onChangecourse}
                  />
            </div>
            <div className="form-group"> 
              <label>LTPSC: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.LTPSC}
                  onChange={this.onChangeLTPSC}
                  />
            </div>
    
            <div className="form-group">
              <input type="submit" value="Add" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
}