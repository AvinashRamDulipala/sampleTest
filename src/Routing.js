import React from "react";
import firebase from './config';

import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from "react-router-dom";
import Login from "./auth/Login";
import MyProfile from "./component/MyProfile";
import ChangePassword from "./component/changepassword";

import Dashboard from "./component/dashboard";
import EmployeeList from "./component/employee-list";
import AddEmployee from "./component/add_employee";
import EditEmployee from "./component/edit_employee";


import Tags from "./component/tag_list";
import AddTags from "./component/add_tag";
import EditTags from "./component/edit_tag";


 

export const PrivateRoute = ({
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        render={props => sessionStorage.getItem("RoleId")
        ? (<Component {...props}/>)
        : (<Redirect
            to={{
            pathname: "/login",
            state: {
                from: props.location
            }
        }}/>)}/>
);

class Routing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

           
        };
    }
    

    render() {
        return (
            <Router>
                <div className="site-wrapper">
                    <Route exact strict path="/" component={Login}/>

                    <Route path="/login" component={Login}/>
                   
                    <PrivateRoute path="/MyProfile" component={MyProfile}/>
                    <PrivateRoute path="/ChangePassword" component={ChangePassword}/>

                    <PrivateRoute path="/Dashboard" component={Dashboard}/>
                    <PrivateRoute path="/UsersList" component={EmployeeList}/>
                    <PrivateRoute path="/AddUser" component={AddEmployee}/>
                    <PrivateRoute path="/EditUser/:employeeID" component={EditEmployee}/>

                    <PrivateRoute path="/Tags" component={Tags}/>
                    <PrivateRoute path="/AddTags" component={AddTags}/>
                    <PrivateRoute path="/EditTags/:tagId" component={EditTags}/>

                   
                </div>
            </Router>
        );
    }
}

export default Routing;
