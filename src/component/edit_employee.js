import React from "react";
import HeaderPage from "./header";
import FooterPage from "./footer";
import SidebarPage from "./sidebar";
import firebase from '../config';
import {Form} from 'reactstrap';
import FileUploader from "react-firebase-file-uploader";
import SimpleReactValidator from "simple-react-validator";
import {Link} from "react-router-dom";
const getCountriesList = require('countrycitystatejson');

class EditEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: 'a@123456',
            status:'Active',
            designation: '',
            mobile_number: '',
            countryName: getCountriesList.getCountries(),
            stateName: [],
            cityName: [],
            selectedCountry: '',
            selectedCountryName: '',

            city: '',
            state: '',
            country: '',
            address: '',
            zip: '',
            user: 'user',

            error_message: '',
            date: new Date().toLocaleString()
        }

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
                AlertquantityStock: {
                    message: "alert quantity should be less than quantity Instock.",
                    rule: function (val, params, validator) {
                        var qty = document
                            .getElementById('quantity_stock')
                            .value;

                        if (Number(qty) > Number(val)) {

                            return true;
                        } else {
                            return false;
                        }

                    }
                },
                productPriceMismatch: {
                    message: "Selling price should be less than original price.",
                    rule: function (val, params, validator) {
                        var qty = document
                            .getElementById('product_price')
                            .value;

                        if (Number(qty) > Number(val)) {

                            return true;
                        } else {
                            return false;
                        }

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
                },

                zip: {
                    message: "Invalid Pin Code",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /^(\d{5}(\d{4})?)?$/i) && params.indexOf(val) === -1);
                    }
                },
                website: {
                    message: "The Url should be example.com ",
                    rule: function (val, params, validator) {
                        // return validator.helpers.testRegex(val,/^[a-zA-Z0-9]{6,30}$/i) &&
                        // params.indexOf(val) === -1
                        return (validator.helpers.testRegex(val, /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) && params.indexOf(val) === -1);
                    }
                },
                Fax: {
                    message: "Invalid fax number ",
                    rule: function (val, params, validator) {
                        return (validator.helpers.testRegex(val, /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i) && params.indexOf(val) === -1);
                    }
                }
            }
        });
    }

    
    componentDidMount() {
        const {employeeID} = this.props.match.params;
      
      console.log(employeeID);
      var ref=firebase.database().ref(`Employees/${employeeID}`);
        ref.on('value', snapshot => {
            var data = snapshot.val();
            console.log(data)
            this.setState({
               
                
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
               
                mobile_number: data.mobile_number,

              

                city: data.city,
                state: data.state,
                country: data.country,

                address: data.address,

              
                zip: data.zip,
 
               
            });
           
           
        });
      
}



setCountryName = (e) => {
    let index = e.target.selectedIndex;
    let el = e.target.childNodes[index]
    let option = el.getAttribute('id');
    let selectedCountryName = e.target.value;

    const statesList = getCountriesList.getStatesByShort(option);
    // console.log(statesList);

    this.setState({
        stateName: statesList,
        selectedCountry: option,
        country: selectedCountryName
    }, () => {
        console.log(this.state.stateName, 'stateName');
    });

    //console.log(this.state.stateName);

};
setStateName = (e) => {
    let stateValue = e.target.value;
    let option = this.state.selectedCountry;
    // console.log(option);
    const cityList = getCountriesList.getCities(option, stateValue);
    // console.log(cityList);
    this.setState({
        cityName: cityList,
        state: stateValue
    }, () => {
        console.log(this.state.cityName, 'stateName');
    });

    console.log(this.state.state);

};

setCityName = (e) => {
    let cityValue = e.target.value;

    this.setState({
        city: cityValue
    }, () => {
        console.log(this.state.city, 'city');
    });

    //console.log(this.state.stateName);

};

handleChange = (event) => {
    // console.log(event.target.value);
    this.setState({
        [event.target.name]: event.target.value
    });
};

handleSubmit = (event) => {

    event.preventDefault();
    if (this.validator.allValid()) {

        const {employeeID} = this.props.match.params;
         var sessionId = sessionStorage.getItem("RoleId");
      

        let dbCon = firebase
            .database()
            .ref(`Employees/${employeeID}`);
        dbCon.update({
            role: this.state.user,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,

            mobile_number: this.state.mobile_number,

            city: this.state.city,
            state: this.state.state,
            country: this.state.country,

            address: this.state.address,

            password: this.state.password,
            zip: this.state.zip,
            status: this.state.status,
            sessionId: sessionId,

            updated_date: this.state.date
        });

        this
            .props
            .history
            .push("/EmployeeList/Updated");
    } else {
        this
            .validator
            .showMessages();
        this.forceUpdate();
    }
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
                                                    <h2>Users</h2>
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

                                        <h4>Edit Users</h4>
                                        <div className="product-tab-list tab-pane fade active in">
                                            <Form onSubmit={this.handleSubmit} id="Add-products">

                                                <div className="row m-b-20">
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">

                                                        <label>First Name<span style={{
            color: 'red'
        }}>*</span>
                                                        </label>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="First Name"
                                                            name="first_name"
                                                            onChange={this.handleChange}
                                                            value={this.state.first_name}/> {this
                                                            .validator
                                                            .message("First Name", this.state.first_name, "required|specialCharText|whitespace|min:2|max:70")}
                                                        <div className="text-danger">
                                                            {" "}
                                                            {this.state.error_message}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row m-b-20 class-row">
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">

                                                        <label>Last Name<span style={{
            color: 'red'
        }}>*</span>
                                                        </label>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Last Name"
                                                            name="last_name"
                                                            onChange={this.handleChange}
                                                            value={this.state.last_name}/> {this
                                                            .validator
                                                            .message("First Name", this.state.last_name, "required|specialCharText|whitespace|min:2|max:70")}
                                                        <div className="text-danger">
                                                            {" "}
                                                            {this.state.error_message}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row m-b-20 class-row">
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                        <label>E-mail Address<span style={{
            color: 'red'
        }}>*</span>
                                                        </label>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="E-mail Address"
                                                            name="email"
                                                            id="price_cost"
                                                            onChange={this.handleChange}
                                                            value={this.state.email} readOnly/> {this
                                                            .validator
                                                            .message("E-mail Address", this.state.email, "required|email")}

                                                    </div>
                                                </div>
                                                <div className="row m-b-20 class-row">
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                        <label>Country<span style={{
            color: 'red'
        }}>*</span>
                                                        </label>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <select
                                                            className="form-control mb-30"
                                                            name="country"
                                                            value={this.state.country}
                                                            onChange={this.setCountryName}>

                                                          
                                                            {this
                                                                .state
                                                                .countryName
                                                                .map((data, index) => {

                                                                    return (
                                                                        <option value={data.name} id={data.shortName} selected={data.name == this.state.country} key={index}>{data.name}</option>
                                                                    )

                                                                })}

                                                        </select>
                                                        {this
                                                            .validator
                                                            .message("Country", this.state.country, "required")}
                                                    </div>
                                                </div>

                                                <div className="row m-b-20 class-row">
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                        <label>State<span style={{
            color: 'red'
        }}>*</span>
                                                        </label>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <select
                                                            className="form-control mb-30"
                                                            name="state"
                                                            value={this.state.state}
                                                            onChange={this.setStateName}>

                                                            <option >{this.state.state}</option>
                                                            {this.state.stateName && this
                                                                .state
                                                                .stateName
                                                                .map((data, index) => {

                                                                    return (
                                                                        <option value={data} id={data} selected={data == this.state.state} key={index}>{data}</option>
                                                                    )

                                                                })}

                                                        </select>
                                                        {this
                                                            .validator
                                                            .message("Country", this.state.state, "required")}
                                                    </div>
                                                </div>
                                                <div className="row m-b-20 class-row">
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                        <label>City<span style={{
            color: 'red'
        }}>*</span>
                                                        </label>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <select
                                                            className="form-control mb-30"
                                                            name="city"
                                                            value={this.state.city}
                                                            onChange={this.setCityName}>

                                                            <option >{this.state.city}</option>
                                                            {this.state.cityName && this
                                                                .state
                                                                .cityName
                                                                .map((data, index) => {

                                                                    return (
                                                                        <option value={data} id={data} selected={data == this.state.city} key={index}>{data}</option>
                                                                    )

                                                                })}

                                                        </select>
                                                        {this
                                                            .validator
                                                            .message("City", this.state.city, "required")}
                                                    </div>
                                                </div>
                                                <div className="row m-b-20 class-row">
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                        <label>Zip<span style={{
            color: 'red'
        }}>*</span>
                                                        </label>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="ZIP"
                                                            name="zip"
                                                            onChange={this.handleChange}
                                                            value={this.state.zip}/> {this
                                                            .validator
                                                            .message("ZIP", this.state.zip, "required|numeric|min:5|max:10")}
                                                    </div>
                                                </div>

                                                <div className="row m-b-20 class-row">
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                        <label>Mobile Number<span style={{
            color: 'red'
        }}>*</span>
                                                        </label>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Mobile Number"
                                                            name="mobile_number"
                                                            onChange={this.handleChange}
                                                            value={this.state.mobile_number}/> {this
                                                            .validator
                                                            .message(" Mobile Number", this.state.mobile_number, "required||numeric|max:10")}
                                                    </div>
                                                </div>

                                                <div className="row m-b-20 class-row">
                                                    <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                        <label>Address<span style={{
            color: 'red'
        }}>*</span>
                                                        </label>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <textarea
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Address"
                                                            name="address"
                                                            onChange={this.handleChange}
                                                            value={this.state.address}/> {this
                                                            .validator
                                                            .message("Address", this.state.address, "required|min:5|max:150")}

                                                    </div>
                                                    {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        <label>Password<span style={{ color: 'red'}}>*</span>
                                                        </label>
                                                        <input
                                                         type="Password"
                                                         name="password"
                                                         value=""
                                                         className="form-control"


                                                           />
                                                    </div> */}

                                                </div>

                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                        {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"> */}
                                                        <div className="text-center custom-pro-edt-ds">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-ctl-bt waves-effect waves-light m-r-10">Save
                                                            </button>
                                                            <Link to="/EmployeeList">
                                                                <button type="button" className="btn btn-ctl-bt waves-effect waves-light">Cancel
                                                                </button>
                                                            </Link>
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

export default EditEmployee;
