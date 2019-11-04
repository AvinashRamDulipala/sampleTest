import React from "react";
import FadeIn from "react-fade-in";
import {Link, withRouter} from 'react-router-dom';
import {Collapse} from 'react-bootstrap';
import firebase from '../config';

class SidebarPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userRole: '',
            loading: false,
            orderStatusList: [],
            usePermList: []
        };
    }
   

    render() {

        return (

            <div>

                <div className="left-sidebar-pro">
                    <nav id="sidebar" className="">
                        <div className="sidebar-header">
                            <Link to='/Dashboard'>
                                {/* <img className="im_logo" src="/img/logo/logo.png"/> */}
                                <h1 className="im_logo">Sample Test</h1>
                                </Link>
                         
                        </div>

                        <div className="left-custom-menu-adp-wrap comment-scrollbar">
                            <nav className="sidebar-nav left-sidebar-menu-pro">

                                <ul
                                    className="nav metismenu"
                                    style={{
                                    height: "543px",
                                    overflowY: "auto"
                                }}
                                    id="style-2">
                                    <li
                                                className={this.isPathActive('/Dashboard') || this.state.componentMenuOpen
                                                ? 'active'
                                                : null}>
                                                <Link to="/Dashboard">
                                                    <i className="fa fa-tachometer" aria-hidden="true"></i>
                                                    <span className="mini-click-non space">
                                                        Dashboard</span>
                                                </Link>
                                            </li>
                                            <li
                                                className={this.isPathActive('/UsersList') || this.state.componentMenuOpen
                                                ? 'active'
                                                : null}>
                                                <Link to="/UsersList">
                                                    <i className="fa fa-tag" aria-hidden="true"></i>
                                                    <span className="mini-click-non space">
                                                        Manage Users</span>
                                                </Link>
                                            </li>
                                            <li
                                                className={this.isPathActive('/Tags') || this.state.componentMenuOpen
                                                ? 'active'
                                                : null}>
                                                <Link to="/Tags">
                                                    <i className="fa fa-file-text"  aria-hidden="true"></i>
                                                    <span className="mini-click-non space">
                                                    Manage Tags</span>
                                                </Link>
                                            </li>
                                            <li
                                                className={this.isPathActive('/MyProfile') || this.state.componentMenuOpen
                                                ? 'active'
                                                : null}>
                                                <Link to="/MyProfile">
                                                    <i className="fa fa-cog"  aria-hidden="true"></i>
                                                    <span className="mini-click-non space">
                                                       Account Setting</span>
                                                </Link>
                                            </li>
                                            

                                     

                                   
                                       
                                   
                                  
                                       
                                   
                                   
                                </ul>

                            </nav>
                        </div>

                    </nav>
                </div>
            </div>
        );
    }

    isPathActive(path) {
        return this
            .props
            .location
            .pathname
            .startsWith(path);
    }
}

export default withRouter(SidebarPage);
