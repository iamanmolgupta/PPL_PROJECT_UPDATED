import React from 'react';
import Axios from 'axios';

class Forgot extends React.Component{
constructor(props){
  super(props)
  this.state={Email:'',err:''}
  console.log(this.props);
}


handleSubmit=(e)=>{
  e.preventDefault();
  Axios.post("http://localhost:8080/forgot",this.state).then((response)=>{console.log(response.data)
  if(response.data[0] === "valid"){
  let id = response.data[1]
  this.props.history.push('/reset',id[0]._id);}
  else{
    this.setState({err:response.data})
  }
})


}
handleChange=(e)=>{
  this.setState({Email:e.target.value})
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
            <h1>Forgot Password</h1>
            <ul>
              <form onSubmit = {this.handleSubmit}>
              <li><span>Enter E-mail ID</span><input type="text" placeholder="User@gmail.com" name="Email" onChange={this.handleChange} required/></li>
              <li><input type="submit" defaultValue="Submit" /></li>
              </form>
            </ul>
          {this.state.err}
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






)




}




}

export default Forgot;