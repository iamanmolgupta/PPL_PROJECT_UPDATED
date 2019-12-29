import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { orderBy, uniqBy, filter } from 'lodash';
import callApi from './utility/util';

class Index1 extends React.Component{
    constructor(props){
    super(props)
    this.state={data:[],CATS:[], CategoryClick:'', filterData:[], likesCount:''};
}
componentDidMount(){
   if (localStorage.getItem("token") != null) {
     let Token = (localStorage.getItem("token"));
    let headers = {
        accept: "application/json",
        authorization: `Bearer ${Token}`
    };
    let options= {
      method:"get",
      url:"timeline/allData",
      data:{},
      headers
    }
    callApi(options).then((response)=>{
      let data = response.data
      this.setState({data:data, CATS:data, filterData: data},()=>{
        this.setState({
          CATS : uniqBy(this.state.CATS, "Category")
        })
      });
    }).catch(err=>{
      if(err){
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        this.props.history.push('/login')
      }
    })

    }
    else{
      this.props.history.push('/login')
    }
  }
  handleCategory=(e)=>{
    let category = e.target.getAttribute("name");
    let categoryPost = filter(this.state.data,(Category)=>{
      return Category.Category===category
    })
    this.setState({filterData: categoryPost})

  }
  handleOldest=(e)=>{
     let oldest = orderBy(this.state.data, "date", "asc")
     this.setState({filterData:oldest})
  }
  handleLatest =(e)=>{
    let latest = orderBy(this.state.data, "date", "desc");
    this.setState({filterData: latest})
  }
  handleCommented=(e)=>{
    const commented = orderBy(this.state.data, "enterComment.length", "desc");
    console.log({commented})
    this.setState({filterData: commented})
  }
  handleLikes=(e)=>{
    let imageId=e.target.getAttribute("id");
    let Token = localStorage.getItem("token");
    let userId = localStorage.getItem("id");
    let headers = {
      accept : "application/json",
      authorization : `Bearer ${Token}`
    }
    let likeData = {user:userId, id:e.target.getAttribute("id")}
    
    console.log({likeData})
    let options= {
      method:"post",
      url:"timeline/likes",
      data:{likeData},
      headers
    }
    callApi(options).then((response)=>{
    let data = response.data;
    this.setState({filterData: data})
    
    }).catch(err=>{
      if(err){
        localStorage.removeItem("token")
        localStorage.removeItem("id")
        this.props.history.push('/login')
      }
    })
  }
render(){
return(
<div>
     
        {/* <div className="navbar navbar-inverse navbar-fixed-top">
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
                  <li className="active"></li>
                  <li className> <a href>E-Coupons</a> </li>
                  <li className> <a href>E-Brands</a> </li>
                  <li className> <a href>Resuse Market</a> </li>
                  <li className> <a href>Lost and Found</a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
       
        <div className="container">
          <div className="content">
            <div className="content_rgt">
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_iconb.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Upload Post</a> </div>
              <div className="rght_btn"> <span className="rght_btn_icon"><img src="images/btn_icona.png" alt="up" /></span> <span className="btn_sep"><img src="images/btn_sep.png" alt="sep" /></span> <a href="#">Invite Friends</a> </div>
              <div className="rght_cate">
                <div className="rght_cate_hd" id="rght_cat_bg">Categories</div>
                <div>
                  {this.state.CATS.length>0 ? this.state.CATS.map((cat)=>{
                    
                  return(
                <div className="rght_list">
                  <ul>
                  <li ><a href="#" name = {cat.Category} onClick = {this.handleCategory}><span className="list_icon"><img src={`http://localhost:8080/${cat.Image}`}  alt="up" height="40" width = "40"/></span>{(cat.Category)}</a></li>
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
                    <div className="btm_rgt">
                      <div className="btm_arc">Cats</div>
                    </div>
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
                <div className="post_div">
                  <div className="post_list">
                    <ul>
                      <li onClick = {this.handleLatest}><a href="#"><span className="list_img"><img src="images/img_1.png" /></span>Latest First</a></li>
                      <li onClick = {this.handleOldest}><a href="#"><span className="list_img" ><img src="images/img_2.png" /></span>Oldest First</a></li>
                      <li><a href="#"><span className="list_img"><img src="images/img_3.png" /></span>Most Pet</a></li>
                      <li><a href="#"><span className="list_img"><img src="images/img_4.png" /></span>Most Clicks</a></li>
                      <li onClick = {this.handleCommented}><a href="#"><span className="list_img"><img src="images/img_5.png" /></span>Most Commented</a></li>
                    </ul>
                  </div>
                  <div className="post_txt">{this.state.filterData.length} New Post Updates</div>
                </div>
              </div>
             <div>
                 {this.state.filterData.length>0 ? this.state.filterData.map((data)=>{
                   console.log(data.likes.length)
                     return(
              <div className="contnt_2">
                <div className="div_a">
                  <div className="div_title">User Interface PSD Source files Web Designing for web</div>
                  <div className="btm_rgt">
                    <div className="btm_arc">Dogs</div>
                  </div>
                  <div className="div_top">
                    <div className="div_top_lft"><img src="images/img_6.png" />{data.Email}</div>
                    <div className="div_top_rgt"><span className="span_date">{moment(data.date).format("MMMM Do YYYY")}</span><span className="span_time">{moment(data.date).format("h:mm:ss a")}</span></div>
                  </div>
                  <div className="div_image"><Link to = {`/mypost/${data._id}`}><img src={`http://localhost:8080/${data.Image}`} height="100" width="100" /></Link></div>
                  <div className="div_btm">
                    <div className="btm_list">
                      <ul>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_001.png" alt="share" /></span>Share</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_002.png" alt="share" /></span>Flag</a></li>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_004.png" alt="share" /></span>{data.enterComment.length} Comments</a></li>
                        <li ><a href="#" id = {data._id} onClick = {this.handleLikes}><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Likes</a></li>
                     <div className="like_count" style={{marginRight: '10px'}}><span className="lft_cnt" /><span className="mid_cnt">{data.likes.length}</span><span className="rit_cnt" /></div>
                        <li><a href="#"><span className="btn_icon"><img src="images/icon_003.png" alt="share" /></span>Unlike</a></li>
                        <div className="like_count"><span className="lft_cnt" /><span className="mid_cnt">4</span><span className="rit_cnt" /></div>
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
          <div className="clear" />
        </div>
       
      </div>
 
)
}
}
export default Index1;