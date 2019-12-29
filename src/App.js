import { Switch, Route } from 'react-router-dom';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import React from 'react';
const axios = require('axios');




class App extends React.Component{
constructor(props){
super(props)
this.state={signup:'',message:'',err:''}
}
handleChange=(e)=>{
  const name = e.target.name;
    const value = e.target.value;
    this.setState({[name] : value});
}

handleSubmit=(e)=>{
e.preventDefault();

axios.post("http://localhost:8080/user",this.state).then((response)=>{if(response.data==="sign up successfully"){
  this.props.history.push('/login')
}
else{
  this.setState({err:response.data})
}})
}
  render(){
    
    return (
      <div>
    <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
            <a className="brand" href>PPL</a>
            <div className="pro_info pull-right">
              <div className="pro_icn"><img src="images/pic_small.png" /></div>
              <div className="pro_txt">Me<b className="caret" /></div>
              <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                <li><a tabIndex={-1} href="#">My Profile</a></li>
                <li><a tabIndex={-1} href="#">Message Box</a></li>
                <li><a tabIndex={-1} href="#">Change Language</a></li>
                <li className="divider" />
                <li><a tabIndex={-1} href="#">
                    <input type="text" placeholder="search" />
                  </a></li>
              </ul>
            </div>
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className="active"> <a href>Home</a> </li>
                <li className> <a href>E-Coupons</a> </li>
                <li className> <a href>E-Brands</a> </li>
                <li className> <a href>Resuse Market</a> </li>
                <li className> <a href>Lost and Found</a> </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="register_sec">
              <h1>Create An Account</h1>
              
              <ul>
              <form onSubmit = {this.handleSubmit}>
                <li><span>Username</span><input onChange={this.handleChange} type="text" placeholder="Enter your username" name='Username' required/></li>
                <li><span>Password</span><input onChange={this.handleChange} type="text" placeholder="Enter your password" name='Password' required/></li>
                <li><span>Email</span><input onChange={this.handleChange} type="text" placeholder="Enter your email" name='Email'required/></li> <p>{this.state.err}</p>
                <li><span>FirstName</span><input onChange={this.handleChange} type="text" placeholder="Enter your first name" name='FirstName'required/></li>
                <li><span>LastName</span><input onChange={this.handleChange} type="text" placeholder="Enter your last name" name='LastName' required/></li>
                <li><input type="checkbox" required/>I agree to Term &amp; Conditions</li>
                <li><input type="submit" defaultValue="Register" /></li>
                </form>
              </ul>
              
              
              <div className="addtnal_acnt">I already have an account.<Link to ="/login">Login My Account !</Link></div>
            </div>
          </div>
          <div className="content_lft">
            <h1>Welcome from PPL!</h1>
            <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
            <img src="images/img_9.png" alt="" /> </div>
        </div>
      </div>
      <div className="clear" />
      
    </div>

    );
  }

}

export default App;
