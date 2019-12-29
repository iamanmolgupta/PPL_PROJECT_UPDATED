import React from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios');

class Login1 extends React.Component{

constructor(props){
super(props)
this.state={signup:'',message:'',err:''}


}

componentDidMount(){

  let obj ={"id":""}
  obj.id=this.props.match.params.number;
  
axios.post("http://localhost:8080/verified",obj).then((response)=>{console.log(response.data)});

if(localStorage.getItem("email")){
  this.props.history.props('/Index1')
  
}

}



handleChange=(e)=>{
  const name = e.target.name;
    const value = e.target.value;
    this.setState({[name] : value});
}

handleSubmit=(e)=>{
  e.preventDefault();
  axios.post("http://localhost:8080/login",this.state).then((response)=>{this.setState({message:response.data})})
  if(this.state.message === "login successfully"){
    localStorage.setItem("email",this.state.Email);
    this.props.history.push('/Index1')
  }
  else{
    this.setState({err:this.state.message})
  }

}

render(){


return(

  <div>
 
 
  <div className="navbar navbar-inverse navbar-fixed-top">
    <div className="navbar-inner">
      <div className="container">
        <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
        <a className="brand" href>PPL</a>
        <div className="pro_info pull-right">
          <div className="pro_icn"><img src="/images/pic_small.png" /></div>
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
        <div className="login_sec">
          <h1>Log In</h1>
          <ul>
            <form onSubmit = {this.handleSubmit}>
            <li><span>Email</span><input type="text" onChange={this.handleChange} name="Email" placeholder="Enter your email" required/></li>
            <li><span>Password</span><input type="text" onChange={this.handleChange} name="Password" placeholder="Enter your password" required/></li>
            <li><input type="checkbox" />Remember Me</li>
            <li><input type="submit" defaultValue="Log In" /><Link to= "/forgot">Forgot Password</Link></li>
          </form>
          <p>{this.state.err}</p>
          </ul>
          <div className="addtnal_acnt">I do not have any account yet.<Link to = "/">Create My Account Now !</Link></div>
        </div>
      </div>
      <div className="content_lft">
        <h1>Welcome from PPL!</h1>
        <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
        <img src="/images/img_9.png" alt="" /> </div>
    </div>
  </div>
  <div className="clear" />

</div>






)






}






  
}

export default Login1;