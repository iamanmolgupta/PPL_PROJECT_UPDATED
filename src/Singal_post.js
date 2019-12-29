import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import callApi from './utility/util';

class Singal_post extends React.Component{
constructor(props){
  super(props)
  this.state={data:[],
    comment:{comm:"",id:""},
    enterComment:"",
    commentData:[],
    Comments:[],
    query:{
      filter:{},
      field:{},
      option:{
       skip:0,  
       limit:0,
       sort:{date:-1}
    }
  }}
  
}
componentDidMount(){
  if(localStorage.getItem("token")!= null){
    let Token = (localStorage.getItem("token"));
    let headers = {
        accept: "application/json",
        authorization: `Bearer ${Token}`
    };
  let obj ={"id":""}
  obj.id=this.props.match.params.number;
  let filter = {_id : obj.id}
  this.state.query={...this.state.query,filter: filter}
  let options= {
    method:"get",
    url:`timeline/getImage?params=${JSON.stringify(this.state.query)}`,
    data:{},
    headers
  }
  
  callApi(options).then((response)=>{let data = response.data
   this.setState({data:data});
   this.setState({Comments:data[0].enterComment});
//  this.setState({commentData:data.enterComment});
}).catch(err=>{
  if(err){
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    this.props.history.push('/login')
  }
});
}
else{
  this.props.history.push('/login')
}
}

handleSubmit=(e)=>{
  e.preventDefault();
  if(localStorage.getItem("token")!= null){
    let Token = (localStorage.getItem("token"));
    let headers = {
        accept: "application/json",
        authorization: `Bearer ${Token}`
    };
  var comment = {...this.state.comment}
  comment.comm = this.state.enterComment;
  comment.id=this.props.match.params.number;
  this.setState({enterComment:""})
  let options= {
    method:"post",
    url:"timeline/comment",
    data:comment,
    headers
  }
  callApi(options).then((response)=>{let data = response.data
  this.setState({Comments:data[0].enterComment});
  console.log(this.state.Comments)
}).catch(err=>{
  if(err){
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    this.props.history.push('/login')
  }
});
  }
  else{
    this.props.history.push('/login')
  }
}
handleChange=(e)=>{
  let value = e.target.value;
  let name = e.target.name;
  this.setState({[name]:value});
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
        <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="/images/btn_sep.png" alt="sep" /></span> <a href="#" onClick = {this.handleClick}>Upload Post</a> </div>
          {/* <div className="rght_btn"> <span className="rght_btn_icon"></span> <span className="btn_sep"></span> <a href="#">Invite Friends</a> </div> */}
          <div className="rght_cate">
            <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
            <div>
                  {this.state.data.length>0 ? this.state.data.map((cat)=>{
                  return(
                <div className="rght_list">
                  <ul>
                  <li><a href="#"><span className="list_icon"><img src={`http://localhost:8080/${cat.Image}`} alt="up" height="40" width = "40"/></span> {cat.Category}</a></li>
                  </ul>
                </div>
                  )
                }):""}
                </div>
          </div>
          <div className="rght_cate">
            <div className="rght_cate_hd" id="opn_cat_bg">Featured</div>
            <div className="sub_dwn">
              <div className="feat_sec">
                <div className="feat_sec_img"><img src="/images/feat_img1.png" alt="image" /></div>
                <div className="feat_txt">Lorem Ipusum Text</div>
              </div>
              <div className="feat_sec">
                <div className="feat_sec_img"><img src="/images/feat_img2.png" alt="image" /></div>
                <div className="feat_txt">Lorem Ipusum Text</div>
                <div className="btm_rgt">
                  <div className="btm_arc">Dogs</div>
                </div>
              </div>
              <div className="feat_sec">
                <div className="feat_sec_img"><img src="/images/feat_img3.png" alt="image" /></div>
                <div className="feat_txt">Lorem Ipusum Text</div>
                <div className="btm_rgt">
                  <div className="btm_arc">Rabbits</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content_lft">
          <div>
          {this.state.data.length>0 ? this.state.data.map((pic)=>{
             return(
          <div className="contnt_2">
            <div className="div_a">
              <div className="div_title">User Interface PSD Source files Web Designing for web</div>
              <div className="btm_rgt">
                <div className="btm_arc">Cats</div>
              </div>
              <div className="div_top">
                <div className="div_top_lft"><img src="/images/img_6.png" />{pic.Email}</div>
                <div className="div_top_rgt"><span className="span_date">{moment(pic.date).format("MMMM Do YYYY")}</span><span className="span_time">{moment(pic.date).format("h:mm:ss a")}</span></div>
              </div>
              <div className="div_image"> <Link to = {`/mypost/${pic._id}`}> <img src={`http://localhost:8080/${pic.Image}`} height="100" width="100" /></Link></div>
              <div className="div_btm">
                <div className="btm_list">
                  <ul>
                    <li><a href="#"><span className="btn_icon"><img src="/images/icon_001.png" alt="share" /></span>Share</a></li>
                    <li><a href="#"><span className="btn_icon"><img src="/images/icon_002.png" alt="share" /></span>Flag</a></li>
                    <li><a href="#"><span className="btn_icon"><img src="/images/icon_003.png" alt="share" /></span>{pic.likes.length} Likes</a></li>
                    <li><a href="#"><span className="btn_icon"><img src="/images/icon_004.png" alt="share" /></span>{this.state.Comments.length} Comments</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
           )
           }):""}
          </div>
          <div className="contnt_3">
            <ul>
              <li>
                <div className="list_image">
                  <div className="image_sec"><img src="/images/post_img.png" /></div>
                  <div className="image_name">Bharat</div>
                </div>
                <div className="list_info">
                {this.state.Comments.length>0 ? this.state.Comments.map((commen)=>{
                 return(
                    <div className="rght_list">
                    <ul>
                    <li>{commen}</li>
                    </ul>
                  </div>
                  )
                }):""}
                
                </div>
                <input type="button" defaultValue="Reply" className="orng_btn" />
              </li>
              
              <li>
                <div className="cmnt_div1">
                  <form onSubmit = {this.handleSubmit}>
                  <input type="text" defaultValue="Enter your Comment" className="cmnt_bx1" name="enterComment" onChange={this.handleChange} value ={this.state.enterComment}/>
                  <input type="submit" className="sub_bttn1" defaultValue="Submit Comment" />
                  </form>
                </div>
              </li>
            </ul>
            <div className="view_div"><a href="#">View more</a></div>
          </div>
        </div>
      </div>
      <div className="clear" />
    </div>
 
  </div>






)





}






}

export default Singal_post;
