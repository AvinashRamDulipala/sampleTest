import React from "react";
import {Link} from "react-router-dom";
import HeaderPage from "./header";
import FooterPage from "./footer";
import SidebarPage from "./sidebar";
import firebase from '../config';
import swal from 'sweetalert';
import $ from 'jquery';
$.DataTable = require('datatables.net');

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.datatable = null;
        this.state = {
            cityList: [],
            loading: false,
            count: 1,
            activePage: "1",
            countPage: "",
            usePermList: ""
        };

    }
   
    componentDidMount() {
        this.setState({loading: true});
        var ref = firebase
            .database()
            .ref("tags/");

        ref.on('value', snapshot => {
            const data = [];
            // console.log(snapshot); console.log(snapshot.val);

            snapshot.forEach(childSnapShot => {

                const Categories = {
                    tagId: childSnapShot
                        .key
                        .toString(),
                        tag: childSnapShot
                        .val()
                        .tag,
                   
                    created_on: childSnapShot
                        .val()
                        .created_on,
                        updated_on: childSnapShot
                        .val()
                        .updated_on,
                };

                data.unshift(Categories);
            });
            data.sort(function(a, b){
                if(a.first_name < b.first_name) { return -1; }
                // if(a.first_name > b.first_name) { return 1; }
                return 0;
            })

            this.setState({cityList: data, countPage: data.length, loading: false});
            console.log(this.state.locationList);
            // this.$el = $(this.el);

            this.interval = setTimeout(() => $('.paginationTable').DataTable(), 1000);
        });

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
                    .ref(`/tags/${id}`);
                playersRef.remove();

                this
                    .props
                    .history
                    .push("/Tags/Deleted");
            } else {}
            // window.location.reload("/Home");

        });

    };

    render() {

        var pathname = this
            .props
            .location
            .pathname
            .split("/");
        var alertName = pathname[2];
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
                                                        <h2>Mangae Tags</h2>

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
                                        <h4>Tags List</h4>

                                        <div className="add-product">
                                                    <Link to='/AddTags'>Add Tag</Link>
                                                </div>
                                          
                                        {alertName
                                            ? <div
                                                    className="alert alert-success display-none"
                                                    style={{
                                                    display: "block"
                                                }}>
                                                    <a data-dismiss="alert" href="#" aria-hidden="true" className="close">×</a>
                                                    Tags {alertName} &nbsp;
                                                    Successfully
                                                </div>
                                            : ''}
                                        <table className="table table-bordered paginationTable">
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Tag Name</th>
                                                   
                                                    <th>Created On</th>
                                                    <th>Updated On</th>
                                                    <th>Action</th>
                                                       

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {this
                                                    .state
                                                    .cityList
                                                    .map((data, index) => {
                                                        console.log(data);

                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{data.tag}</td>
                                                              
                                                                <td>{data.created_on}
                                                                </td>
                                                                <td>{data.updated_on}</td>
                                                                <td>

                                                                            <Link to={`/EditTags/${data.tagId}`}>
                                                                                <button data-toggle="tooltip" title="Edit" className="pd-setting-ed">
                                                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                                </button>
                                                                            </Link>

                                                                            <button
                                                                                data-toggle="tooltip"
                                                                                title="Trash"
                                                                                className="pd-setting-ed"
                                                                                data-id={data.tagId}
                                                                                onClick={this
                                                                                .deleteItem
                                                                                .bind(this, data.tagId)}>
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

export default Tags;
