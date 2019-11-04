import React from "react";
import { Link } from "react-router-dom";
import firebase from '../config';
import swal from 'sweetalert';



class HeaderPage extends React.Component {
  constructor(props) {
    super(props);
   

  }
  componentDidMount() {
    this.setState({ loading: true });
    var sessionId = sessionStorage.getItem("RoleId");
    if(sessionId){
       
//   console.log(sessionId);
    
//         firebase
//             .database().ref('admin_users/' + sessionId).on('value', snapshot => {
//          var Users = snapshot.val();
//          console.log(Users);
//          sessionStorage.setItem("userName", Users.fullName);
//          sessionStorage.setItem("userRole", Users.Role);
       
//         this.setState({
//           userRole:Users.Role,loading: false
            
            
//           });
         
         
//         });
    }
       
       
        
      
    
  }
  logout = () => {
    swal({
        title: "Are you sure?",
        text: "Do your really want to log out your account?",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
            firebase.auth().signOut().then(function() {
                console.log("Logged out!");
                sessionStorage.clear();	
             }, function(error) {
                console.log(error.code);
             });
          sessionStorage.clear();
          window.location.href = '/login';
        //   this.props.history.push('/');
        } else {
        }
      });

   
  };
  render() {
    

    return (
      <div>
  
  <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="logo-pro">
                    <h1><b>Sample Assignment</b></h1>
                       </div>
                </div>
            </div>
        </div>
        <div className="header-advance-area">
            <div className="header-top-area">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div className="header-top-wraper">
                                <div className="row">
                                    <div className="col-lg-1 col-md-0 col-sm-1 col-xs-12">
                                        <div className="menu-switcher-pro">
                                            <button type="button" id="sidebarCollapse" className="btn bar-button-pro header-drl-controller-btn btn-info navbar-btn">
                                                    <i className="icon nalika-menu-task"></i>
                                                </button>
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-7 col-sm-6 col-xs-12">
                                        <div className="header-top-menu tabl-d-n">
                                            <div className="breadcome-heading">
                                                {/* <form role="search" className="">
                                                    <input type="text" placeholder="Search..." className="form-control" />
                                                    <Link to=""><i className="fa fa-search"></i></Link>
                                                </form> */}
                                            </div>
                                        </div>
                                    </div>
                                 

                                 <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                        <div className="header-right-info">
                                            <ul className="nav navbar-nav mai-top-nav header-right-menu">
                                               
                                               {/* <li className="nav-item dropdown">
                                               <Link to="" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><i className="icon nalika-mail" aria-hidden="true"></i><span className="indicator-ms"></span></Link>
                                                    <div role="menu" className="author-message-top dropdown-menu animated zoomIn">
                                                        <div className="message-single-top">
                                                            <h1>Message</h1>
                                                        </div>
                                                        <ul className="message-menu">
                                                            <li>
                                                            <Link to="">
                                                                    <div className="message-img">
                                                                        <img src="img/contact/1.jpg" alt=""/>
                                                                    </div>
                                                                    <div className="message-content">
                                                                        <span className="message-date">16 Sept</span>
                                                                        <h2>Advanda Cro</h2>
                                                                        <p>Please done this project as soon possible.</p>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                            <Link to="">
                                                                    <div className="message-img">
                                                                        <img src="img/contact/4.jpg" alt=""/>
                                                                    </div>
                                                                    <div className="message-content">
                                                                        <span className="message-date">16 Sept</span>
                                                                        <h2>Sulaiman din</h2>
                                                                        <p>Please done this project as soon possible.</p>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                            <Link to="">
                                                                    <div className="message-img">
                                                                        <img src="img/contact/3.jpg" alt=""/>
                                                                    </div>
                                                                    <div className="message-content">
                                                                        <span className="message-date">16 Sept</span>
                                                                        <h2>Victor Jara</h2>
                                                                        <p>Please done this project as soon possible.</p>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                            <Link to="">
                                                                    <div className="message-img">
                                                                        <img src="img/contact/2.jpg" alt=""/>
                                                                    </div>
                                                                    <div className="message-content">
                                                                        <span className="message-date">16 Sept</span>
                                                                        <h2>Victor Jara</h2>
                                                                        <p>Please done this project as soon possible.</p>
                                                                    </div>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                        <div className="message-view">
                                                        <Link to="">View All Messages</Link>
                                                        </div>
                                                    </div>
                                                </li> */}
                                                
                                                {/* <li className="nav-item"><a href="#" data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle"><i className="icon nalika-alarm" aria-hidden="true"></i><span className="indicator-nt"></span></a>
                                                    <div role="menu" className="notification-author dropdown-menu animated zoomIn">
                                                        <div className="notification-single-top">
                                                            <h1>Notifications</h1>
                                                        </div>
                                                        <ul className="notification-menu">
                                                            <li>
                                                            <Link to="">
                                                                    <div className="notification-icon">
                                                                        <i className="icon nalika-tick" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className="notification-content">
                                                                        <span className="notification-date">16 Sept</span>
                                                                        <h2>Advanda Cro</h2>
                                                                        <p>Please done this project as soon possible.</p>
                                                                    </div>
                                                               </Link>
                                                            </li>
                                                            <li>
                                                            <Link to="">
                                                                    <div className="notification-icon">
                                                                        <i className="icon nalika-cloud" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className="notification-content">
                                                                        <span className="notification-date">16 Sept</span>
                                                                        <h2>Sulaiman din</h2>
                                                                        <p>Please done this project as soon possible.</p>
                                                                    </div>
                                                               </Link>
                                                            </li>
                                                            <li>
                                                            <Link to="">
                                                                    <div className="notification-icon">
                                                                        <i className="icon nalika-folder" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className="notification-content">
                                                                        <span className="notification-date">16 Sept</span>
                                                                        <h2>Victor Jara</h2>
                                                                        <p>Please done this project as soon possible.</p>
                                                                    </div>
                                                               </Link>
                                                            </li>
                                                            <li>
                                                            <Link to="">
                                                                    <div className="notification-icon">
                                                                        <i className="icon nalika-bar-chart" aria-hidden="true"></i>
                                                                    </div>
                                                                    <div className="notification-content">
                                                                        <span className="notification-date">16 Sept</span>
                                                                        <h2>Victor Jara</h2>
                                                                        <p>Please done this project as soon possible.</p>
                                                                    </div>
                                                               </Link>
                                                            </li>
                                                        </ul>
                                                        <div className="notification-view">
                                                        <Link to="">View All Notification</Link>
                                                        </div>
                                                    </div>
                                                </li> */}
                                               
                                               <li className="nav-item">
                                               <Link to=""data-toggle="dropdown" role="button" aria-expanded="false" className="nav-link dropdown-toggle">
                                                          
                                                            <span className="admin-name">{sessionStorage.getItem('email')}      <i className="icon nalika-user" aria-hidden="true"></i></span>
                                                            <i className="icon nalika-down-arrow nalika-angle-dw"></i>
                                                       </Link>
                                                    <ul role="menu" className="dropdown-header-top author-log dropdown-menu animated zoomIn">
                                                    <li> <Link to="/MyProfile"><span className="icon nalika-user author-log-ic"></span>My Profile</Link>
                                                        </li> 
                                                        <li> <Link to="/ChangePassword"><span className="icon nalika-user author-log-ic"></span>Change Password</Link>
                                                        </li>                                              
                                                        <li onClick={this.logout}> <a><span className="icon nalika-unlocked author-log-ic"></span>Log Out</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                               

                                

                                           </ul>
                                        </div>
                                    </div>
                              
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
      </div>
    );
  }
}

export default HeaderPage;
