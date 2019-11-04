import React from "react";
import {Link} from "react-router-dom";
import HeaderPage from "./header";
import FooterPage from "./footer";
import SidebarPage from "./sidebar";
import firebase from '../config';
import swal from 'sweetalert';
import $ from 'jquery';
$.DataTable = require('datatables.net');

class EmployeeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            designation: '',
            mobile_number: '',
            department: '',
            city: '',
            uploadImage: '',
            address: '',
            phone_emergency: '',
            reporting_manager: '',
            EmployeesList: [],

            isUploading: false,
            error_message: '',
            date: new Date().toLocaleString(),
            validError: true,
            loading: false,
            count: 1,
            activePage: "1",
            countPage: "",
            EmployeesList: []
        };

    }

    componentDidMount() {
        var ref = firebase
            .database()
            .ref('Employees/');
        ref.once("value", snapshot => {
            const data = [];
            console.log(snapshot.val());
            snapshot.forEach(element => {
                const usersData = {
                    employeeKey: element
                        .key
                        .toString(),
                        employeeID: element
                        .val()
                        .employeeId,

                    first_name: element
                        .val()
                        .first_name,
                    last_name: element
                        .val()
                        .last_name,
                    email: element
                        .val()
                        .email,
                        country: element
                        .val()
                        .country,
                        state: element
                        .val()
                        .state,
                        city: element
                        .val()
                        .city,
                    zip: element
                        .val()
                        .zip,
                    mobile_number: element
                        .val()
                        .mobile_number,
                    status: element
                        .val()
                        .status,
                    city: element
                        .val()
                        .city,
                    address: element
                        .val()
                        .address,
                   
                    date: element
                        .val()
                        .date,
                        updatedDate: element
                        .val()
                        .updated_date,
                }
                data.unshift(usersData);
            });
            data.sort(function(a, b){
                if(a.first_name < b.first_name) { return -1; }
                // if(a.first_name > b.first_name) { return 1; }
                return 0;
            })

            this.setState({
                Employees: data
            }, () => {
                console.log(this.state.Employees, 'Employees');
                
            });
            this.interval = setTimeout(() => $('.paginationTable').DataTable(), 1000);
        })
    }
    componentWillUnmount() {
        //this.dataTable.destroy(true);
        clearTimeout(this.interval);
    }

    deleteItem = id => {

        swal({title: "Are you sure?", text: "Do your really want to remove?", icon: "warning", buttons: true, dangerMode: true}).then(willDelete => {
            if (willDelete) {
                console.log(id);
                var playersRef = firebase
                    .database()
                    .ref(`/Employees/${id}`);
                playersRef.remove();

                this
                    .props
                    .history
                    .push("/UsersList");
            } else {}
            // window.location.reload("/Home");

        });
        this.componentDidMount();

    };


    
    onChange = (event) => {

        var cmsId = event.target.id;
        console.log(cmsId);
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.value);

        let dbCon = firebase
            .database()
            .ref(`/Employees/${cmsId}`);
        console.log(dbCon);
        dbCon.update({status: event.target.value});
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

                    <div className="product-status mg-b-30">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="product-status-wrap">
                                        <h4>Users List</h4>
                                        <div className="add-product">
                                            <Link to='/AddUser'>Add User</Link>
                                        </div>
                                        <table className="table table-bordered paginationTable">
                                            <thead>
                                                <tr>
                                                    <th>S.no</th>
                                                   
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email</th>
                                                    <th>City</th>
                                                    <th>Zip</th>
                                                    <th>Status</th>
                                                    <th>Date Created</th>
                                                    <th>Date Updated</th>
                                                  
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.Employees && this
                                                    .state
                                                    .Employees
                                                    .map((data, index) => {

                                                        return (

                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                               
                                                                <td>{data.first_name} </td>
                                                                <td>{data.last_name}</td>
                                                                <td>{data.email}</td>
                                                               
                                                                <td>{data.city}</td>
                                                                <td>{data.zip}</td>
                                                              
                                                               
                                                                <td>
                                                                    <select
                                                                        name="status"
                                                                        onChange={this.onChange}
                                                                        id={data.employeeKey}
                                                                        className="form-control pro-edt-select form-control-primary active">
                                                                        <option
                                                                            value="Active"
                                                                            selected={data.status == "Active"
                                                                            ? true
                                                                            : false}>Active</option>
                                                                        <option
                                                                            value="InActive"
                                                                            selected={data.status == "InActive"
                                                                            ? true
                                                                            : false}>InActive</option>

                                                                    </select>
                                                                </td>
                                                                <td>{data.date}</td>
                                                                <td>{data.updatedDate}</td>

                                                               
  <td>

  <Link to={`/EditUser/${data.employeeKey}`}>
    <button data-toggle="tooltip" title="Edit" className="pd-setting-ed">
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
    </button>
</Link>

<button
    data-toggle="tooltip"
    title="Trash"
    className="pd-setting-ed"
    data-id={data.employeeKey}
    onClick={this
    .deleteItem
    .bind(this, data.employeeKey)}>
    <i className="fa fa-trash-o" aria-hidden="true"></i>
</button>

</td>



                                                             
                                                            </tr>
                                                        )
                                                    })}

                                            </tbody>

                                        </table>
                                       
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

export default EmployeeList;
