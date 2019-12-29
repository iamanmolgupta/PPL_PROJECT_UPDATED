import React from 'react';
import { filter, uniqBy } from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import callApi from './utility/util'
// import { includes, uniqBy, filter } from "lodash";

class Timeline extends React.Component{
constructor(props){
  super(props)
  this.state={show:false,
    Email:'',
    Image:'',
    Category:'',
    User:'',
    data:[], 
    CAT:[],
    filterData:[],
    comments:[],
    query:{
      filter:{},
      field:{},
      option:{
        skip: 0, limit: 0, sort:{date:-1}
      }
    }};
}

showform = () => {
return(
<div>
<form onSubmit = {this.handleSubmit}>
Email:
<input type = "text" name = "Email" onChange = {this.handleChange}/><br></br><br></br>
Image:
<input type = "file" name = "Image" onChange = {this.handleFile}/><br></br><br></br>
Categoy:
<input type = "text" name = "Category" onChange = {this.handleChange}/><br></br><br></br>
<input type = "submit" value = "submit" />
</form>
</div>
)
}
handleFile = (e)=>{

  this.setState({Image: e.target.files[0] },()=>{

  });

}

handleSubmit=(e)=>{
e.preventDefault();
if(localStorage.getItem("token")!= null){
  let Token = (localStorage.getItem("token"));
  let headers = {
      accept: "application/json",
      authorization: `Bearer ${Token}`
  };
let id = localStorage.getItem("id");
let formData = new FormData;
formData.append("Email",this.state.Email);
formData.append("Image",this.state.Image);
formData.append("Category",this.state.Category);
formData.append("User",id);

let options= {
  method:"post",
  url:"timeline/addImage",
  data:formData,
  headers
}
callApi(options).then((response)=>{let data =(response.data)

this.setState({data:data, CAT:data, filterData: data},()=>{
  this.setState({CAT:uniqBy(this.state.CAT, "Category")})
});

}).catch(err=>{
  if(err){
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    this.props.history.push('/login')
  }
});
this.setState({show:!this.state.show})
}
else {
  this.props.history.push('/login');
}
}
componentDidMount(){
  if(localStorage.getItem("token")!= null){
    let Token = (localStorage.getItem("token"));
    let headers = {
        accept: "application/json",
        authorization: `Bearer ${Token}`
    };
    let id = localStorage.getItem("id");
    let userId = {User:id}
    this.state.query = {...this.state.query,filter : userId}
    let options= {
      method:"get",
      url:`timeline/allImage?params=${JSON.stringify(this.state.query)}`,
      data:{},
      headers
    }
    callApi(options).then(response=>{let data = response.data
this.setState({data:data, CAT:data, filterData: data},()=>{
  this.setState({CAT: uniqBy(this.state.CAT, "Category")})
});
console.log(response)
}).catch(err =>{
  if(err){
    console.log({err})
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    this.props.history.push('/login')
  }
});
}
else{
  this.props.history.push('/login');
}
}

handleChange=(e)=>{
  let value = e.target.value;
  let name = e.target.name;
  this.setState({[name]:value});
}

handleClick=(e)=>{
  this.setState({show:!this.state.show});
  // console.log(this.state.show);
}
handleCategory=(e)=>{
  let singleCategory = e.target.getAttribute("name");
  let categoryPost = filter(this.state.data, (category)=>{
    return category.Category === singleCategory
  })
  this.setState({filterData: categoryPost})
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
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#" onClick = {this.handleClick}>Upload Post</a> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="/images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div>
                  {this.state.CAT.length>0 ? this.state.CAT.map((cat)=>{

                  return(
                <div className="rght_list">
                  <ul>
                  <li><a href="#" name = {cat.Category} onClick = {this.handleCategory}><span className="list_icon"><img src={`http://localhost:8080/${cat.Image}`} alt="up" height="40" width = "40"/></span> {cat.Category}</a></li>
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
                    <div className="feat_sec_img"><img src="images/feat_img1.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img2.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Dogs</div>
                    </div>
                  </div>
                  <div className="feat_sec">
                    <div className="feat_sec_img"><img src="images/feat_img3.png" alt="image" /></div>
                    <div className="feat_txt">Lorem Ipusum Text</div>
                    <div className="btm_rgt">
                      <div className="btm_arc">Rabbits</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content_lft">
              <div className="contnt_1">
                <div className="list_1">
                  <ul>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Friends</li>
                    <li>
                      <input type="checkbox" className="chk_bx" />
                      Flaged</li>
                  </ul>
                </div>
                <div className="timeline_div">
                  <div className="timeline_div1">
                    <div className="profile_pic">
                      <img src="images/timeline_img1.png" />
                      <div className="profile_text"><a href="#">Change Profile Pic</a></div>
                    </div>
                    <div className="profile_info">
                      <div className="edit_div"><a href="#">Edit <img src="images/timeline_img.png" /></a></div>
                      <div className="profile_form">
                        <ul>
                          <li>
                            <div className="div_name1">Name :</div>
                            <div className="div_name2">Stefiney Gibbs</div>
                          </li>
                          <li>
                            <div className="div_name1">Sex :</div>
                            <div className="div_name2">Female</div>
                          </li>
                          <li>
                            <div className="div_name1">Description :</div>
                            <div className="div_name3">This is an example of a comment. You can create as many comments like this one
                              or sub comments as you like and manage all of your content inside Account.</div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="timeline_div2">
                    <ul>
                      <li><a href="#" className="active">Timeline    </a></li>
                      <li><a href="#">About  </a></li>
                      <li><a href="#">Album</a></li>
                      <li><a href="#"> Pets</a></li>
                      <li><a href="#">My Uploads </a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                {this.state.show ? this.showform() : null}
              
        
             <div>
              {this.state.filterData.length>0 ? this.state.filterData.map((pic)=>{
                console.log(pic.date)
             return(
              <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                <div className="btm_rgt">
                  <div className="btm_arc">Cats</div>
                </div>
                <div className="div_top">
             <div className="div_top_lft"><img src="images/img_6.png" />{pic.Email}</div>
             <div className="div_top_rgt"><span className="span_date">{moment(pic.date).format("MMMM Do YYYY")}</span><span className="span_time">{moment(pic.date).format("h:mm:ss a")}</span></div>
                </div>
                <div className="div_image"> 
               <Link to = {`/mypost/${pic._id}`}> <img src={`http://localhost:8080/${pic.Image}`} height="100" width="100" /></Link></div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                      <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                      <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>{pic.likes.length} Likes</a></li>
                      <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{pic.enterComment.length} Comments</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
             )
              }):""}
              </div>
              </div>
            </div>
          </div>
          <div className="clear" />
        </div>
 
      </div>






)





}





}
export default Timeline;