import React from "react";
import {Form} from 'reactstrap';
import {Link} from "react-router-dom";
import FadeIn from "react-fade-in";
import axios from "axios";
import HeaderPage from "./header";
import FooterPage from "./footer";
import SidebarPage from "./sidebar";
import firebase from '../config';
import SimpleReactValidator from "simple-react-validator";

class Changepassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            password: "",
            confirm_password: "",
            old_password: "",
            old_pass: "",
            employer_sevice_message: "",

            showLoading: false
        };
        this.validator = new SimpleReactValidator({
            className: "text-danger",
            validators: {
                passwordvalid: {
                    message: "The :attribute must be at least 6 and at most 30 with 1 numeric,1 special charac" +
                            "ter and 1 alphabet.",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{6,30}$/i) && params.indexOf(val) === -1);
                    }
                },
                passwordMismatch: {
                    message: "confirm password must match with password field.",
                    rule: function (val, params, validator) {
                        return document
                            .getElementById("password_input")
                            .value === val
                            ? true
                            : false;
                    }
                },

                whitespace: {
                    message: "The :attribute not allowed first whitespace   characters.",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /[^\s\\]/) && params.indexOf(val) === -1);
                    }
                },
                specialChar: {
                    message: "The :attribute not allowed special   characters.",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /^[ A-Za-z0-9_@./#&+-]*$/i) && params.indexOf(val) === -1);
                    }
                },
                specialCharText: {
                    message: "The :attribute may only contain letters, dot and spaces.",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /^[ A-Za-z_@./#&+-]*$/i) && params.indexOf(val) === -1);
                    }
                }
            }
        });

    }

    reauthenticate = (currentPassword) => {
        var user = firebase
            .auth()
            .currentUser;
        var cred = firebase
            .auth
            .EmailAuthProvider
            .credential(user.email, currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            this
                .reauthenticate(this.state.old_password)
                .then(() => {

                    let user = firebase
                        .auth()
                        .currentUser;
                    user
                        .updatePassword(this.state.password)
                        .then((result) => {
                            console.log(result);
                            this.setState({employer_sevice_message: "Succesfully Password Changed"});
                        })
                        .catch(error => {
                            this.setState({error});
                            console.log(this.state.error);
                            this.setState({employer_sevice_message: this.state.error.message});
                        });

                })
                .catch((error) => {
                    console.log(error);
                    this.setState({employer_sevice_message: "The  old password is invalid or the user does not have a password"});
                });
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }

    };
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {

        return (
            <div>
                <SidebarPage/>

                <div className="all-content-wrapper">
                    <HeaderPage/>

                    <div className="breadcome-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="breadcome-list">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                                <div className="breadcomb-wp">

                                                    <div className="breadcomb-ctn">
                                                        <h2>Change Password
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="single-product-tab-area mg-b-30">

                        <div className="single-pro-review-area">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="review-tab-pro-inner">

                                            <h4>Changepassword</h4>

                                            <div className="product-tab-list tab-pane fade active in">
                                                <Form onSubmit={this.handleSubmit} id="login-form" className="widget-form">
                                                    {this.state.employer_sevice_message
                                                        ? (
                                                            <div className="alert alert-warning" role="alert">
                                                                {this.state.employer_sevice_message}
                                                            </div>
                                                        )
                                                        : ("")}{" "}

                                                    <div className="row m-b-20">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                                                            <input
                                                                type="password"
                                                                name="old_password"
                                                                value={this.state.old_password}
                                                                onChange={this.onChange}
                                                                className="form-control  mb-20"
                                                                placeholder="Old Password"/> {this
                                                                .validator
                                                                .message("Old Password", this.state.old_password, "required|passwordvalid|min:6|max:30")}

                                                        </div>
                                                    </div>
                                                    <div className="row m-b-20">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                                                            <input
                                                                type="password"
                                                                name="password"
                                                                value={this.state.password}
                                                                onChange={this.onChange}
                                                                className="form-control  mb-20"
                                                                placeholder="New Password"
                                                                id="password_input"/> {this
                                                                .validator
                                                                .message("New Password", this.state.password, "required|passwordvalid|min:6|max:30")}

                                                        </div>

                                                    </div>

                                                    <div className="row m-b-20">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                                                            <input
                                                                type="password"
                                                                name="confirm_password"
                                                                className="form-control mb-20"
                                                                placeholder="Re-Enter Password"
                                                                onChange={this.onChange}
                                                                value={this.state.confirm_password}/> {this
                                                                .validator
                                                                .message("Re-Enter Password", this.state.confirm_password, "required|passwordMismatch")}

                                                        </div>

                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                            <div className="custom-pro-edt-ds no_mrg_right">
                                                                <button
                                                                    style={{
                                                                    float: "right"
                                                                }}
                                                                    type="submit"
                                                                    value="Change Password"
                                                                    className="btn btn-ctl-bt waves-effect waves-light col-lg-4">Change Password
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterPage/>

            </div>
        );
    }
}
export default Changepassword;
