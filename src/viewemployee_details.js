
import React from "react";
import HeaderPage from "./header";
import FooterPage from "./footer";
import SidebarPage from "./sidebar";
import firebase from '../config';
import {Form} from 'reactstrap';
import FileUploader from "react-firebase-file-uploader";
import SimpleReactValidator from "simple-react-validator";
import {Link} from "react-router-dom";

class ViewEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            designation: '',
            mobile_number: '',
            department: '',
            location: '',
            uploadImage: '',
            avatar: "",
            progress: 0,
            avatarURL: "",
            address: '',
            phone_emergency:'',
            reporting_manager:'',
            EmployeesList: [],
           
            isUploading: false,
            error_message: '',
            date: new Date().toLocaleString(),
            validError: true
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
                designation:data.designation,
                mobile_number: data.mobile_number,
                department:data.department,
                location:data.location,
                avatarURL:data.uploadImage,
                address:data.address,
                phone_emergency:data.phone_emergency,
                reporting_manager:data.reporting_manager,
                date:data.date,
               
  
            });
           
            console.log(this.state.Employees);
        });
      }
    handleSubmit = (event) => {

        event.preventDefault();
        if (this.validator.allValid() && this.state.validError == true) {

            const {employeeID} = this.props.match.params;
             var sessionId = sessionStorage.getItem("RoleId");
           

            let dbCon = firebase
                .database()
                .ref(`Employees/${employeeID}`);
            dbCon.update({
                employeeId: Math.round((new Date().getTime() / 1000)),
                role:"employee",
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                designation: this.state.designation,
                mobile_number: this.state.mobile_number,
                department: this.state.department,
                location: this.state.location,
                uploadImage: this.state.avatarURL,
                address: this.state.address,
                phone_emergency:this.state.phone_emergency,
                reporting_manager:this.state.reporting_manager,
                password:this.state.password,
                status:'Active',
                sessionId:sessionId,
                date: this.state.date,
            });

            this
                .props
                .history
                .push("/EmployeeList");
        } else {
            this
                .validator
                .showMessages();
            this.forceUpdate();
        }
    };


handleChange = (event) => {
            // console.log(event.target.value);
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
                                                        <h2>Employees</h2>
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

                                            <h4>Edit Employees</h4>

                                            <div className="product-tab-list tab-pane fade active in">
                                            <Form onSubmit={this.handleSubmit} id="Add-products">

<div className="row m-b-20">
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <label>First Name<span style={{color: 'red'}}>*</span>
        </label>
        <input
            type="text"
            className="form-control"
            placeholder=""
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
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <label>Last Name<span style={{color: 'red'}}>*</span>
        </label>
        <input
            type="text"
            className="form-control"
            placeholder=""
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
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <label>E-mail Address<span style={{color: 'red'}}>*</span>
        </label>
        <input
            type="text"
            className="form-control"
            placeholder=""
            name="email"
            id="price_cost"
            onChange={this.handleChange}
            value={this.state.email}/> {this
            .validator
            .message("E-mail Address", this.state.email, "required|email")}

    </div>
   
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <label>Department<span style={{color: 'red' }}>*</span></label>

        <select
            name="select"
            className="form-control pro-edt-select form-control-primary"
            name="department"
            onChange={this.handleChange}>
            <option>Select Department</option>
            {this.state.departments && this
                .state
                .departments
                .map((data, index) => {

                    return(
                        <option value={data.department} key={index}>{data.department}</option>
                      )
             } )}
            </select>
            
             {this.validator.message("Department", this.state.department, "required")}

      

    </div>

  

    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <label>Designation<span style={{color: 'red' }}>*</span></label>

        <select
            name="select"
            className="form-control pro-edt-select form-control-primary"
            name="designation"
            onChange={this.handleChange}>
            <option>Select Designation</option>
            {this.state.designations && this
                .state
                .designations
                .map((data, index) => {

                    return(
                        <option value={data.designation} key={index}>{data.designation}</option>
                      )
             } )}
            </select>
            
             {this.validator.message("Select Designation", this.state.designation, "required")}

    </div>



        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <label>Location<span style={{color: 'red' }}>*</span></label>

        <select
            name="select"
            className="form-control pro-edt-select form-control-primary"
            name="location"
            onChange={this.handleChange}>
            <option>Select Location</option>
            {this.state.locations && this
                .state
                .locations
                .map((data, index) => {

                    return(
                        <option value={data.location} key={index}>{data.location}</option>
                      )
             } )}
            </select>
            
             {this.validator.message("Location", this.state.location, "required")}

      

    </div>
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <label>Mobile Number<span style={{
color: 'red'
}}>*</span>
        </label>
        <input
            type="text"
            className="form-control"
            placeholder=""
            name="mobile_number"
            onChange={this.handleChange}
            value={this.state.mobile_number}/> {this
            .validator
            .message(" Mobile Number", this.state.mobile_number, "required||numeric|max:10")}

    </div>

 
     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <label>Phone Number (For emergency conatact)<span style={{
color: 'red'
}}>*</span>
        </label>
        <input
            type="text"
            className="form-control"
            placeholder=""
            name="phone_emergency"
            onChange={this.handleChange}
            id="phone_emergency"
            value={this.state.phone_emergency}/> {this
            .validator
            .message(" Phone Number", this.state.phone_emergency, "required|numeric|min:1|max:10")}

    </div>

    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <label>Reporting Manager<span style={{
color: 'red'
}}>*</span>
        </label>
           <select
            className="form-control"
            placeholder=""
            name="reporting_manager"
            value={this.state.reporting_manager}
            onChange={this.handleChange}>
            <option value="" label="Select" selected="selected">Select</option>
            

            <option value="1" label="1">1</option>
            <option value="2" label="2">2</option>
            <option value="3" label="3">3</option>
           
        </select>
          {this
            .validator
            .message(" Reporting Manager", this.state.reporting_manager, "required")}

    </div>
    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <label>Address<span style={{
color: 'red'
}}>*</span>
        </label>
        <textarea
            type="text"
            className="form-control"
            placeholder=""
            name="address"
            onChange={this.handleChange}
           
            value={this.state.address}/> {this
            .validator
            .message("Addresss", this.state.address, "required|min:5|max:150")}

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

 {/* <div className="row m-b-20">
 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        <div className="dropzone-pro">
            <div id="dropzone">

                <div className="dz-message needsclick download-custom">
                    <i className="fa fa-cloud-download" aria-hidden="true"></i>
                    <h2>Upload Photo<span style={{color: 'red' }}>*</span></h2>

                </div>

                {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                {this.state.avatarURL && <img
                    src={this.state.avatarURL}
                    style={{
                    height: "200px",
                    width: "250px"
                }}/>}
                <FileUploader
                    accept="image/*"
                    name="avatar"
                    randomizeFilename
                    storageRef={firebase
                    .storage()
                    .ref("images")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}/> {this
                    .validator
                    .message("Upload  Image", this.state.avatarURL, "required")}

            </div>
        </div>

    </div>

  

</div>  */}
  <div className="row m-b-20">
                                                     <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="dropzone-pro">
                                                                <div id="dropzone">

                                                                    <div className="dz-message needsclick download-custom">
                                                                        <i className="fa fa-cloud-download" aria-hidden="true"></i>
                                                                        <h2>Upload Photo<span style={{color: 'red' }}>*</span></h2>

                                                                    </div>

                                                                    {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                                                                    {this.state.avatarURL && <img
                                                                        src={this.state.avatarURL}
                                                                        style={{
                                                                        height: "200px",
                                                                        width: "250px"
                                                                    }}/>}
                                                                    <FileUploader
                                                                        accept="image/*"
                                                                        name="avatar"
                                                                        randomizeFilename
                                                                        storageRef={firebase
                                                                        .storage()
                                                                        .ref("images")}
                                                                        onUploadStart={this.handleUploadStart}
                                                                        onUploadError={this.handleUploadError}
                                                                        onUploadSuccess={this.handleUploadSuccess}
                                                                        onProgress={this.handleProgress}/> {this
                                                                        .validator
                                                                        .message("Upload  Image", this.state.avatarURL, "required")}



                                                                </div>
                                                            </div>

                                                        </div>

                                                      

                                                    </div> 



<div className="row">
    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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

export default ViewEmployee;
