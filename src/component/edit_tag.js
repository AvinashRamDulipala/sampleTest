import React from "react";
import {Link} from "react-router-dom";
import {Form} from 'reactstrap';
import HeaderPage from "./header";
import FooterPage from "./footer";
import SidebarPage from "./sidebar";
import firebase from '../config';
import SimpleReactValidator from "simple-react-validator";
//import FileUploader from "react-firebase-file-uploader";

class EditTags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            error_message: '',
            date: new Date().toLocaleString(),
            validError: false,
            uploadImage: '',
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: ""
        }

        this.validator = new SimpleReactValidator({
            className: "text-danger",
            validators: {

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
    componentDidMount() {
        const {tagId} = this.props.match.params;
        console.log(tagId);

        var ref = firebase
            .database()
            .ref(`tags/${tagId}`);

        ref.on('value', snapshot => {
            var categories = snapshot.val();

            // console.log(categories)

            this.setState({tag: categories.tag, loading: false});
            console.log(this.state.tag);
        });

    }
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
console.log(this.state.tag);
    };
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validator.allValid() ) {
            const {tagId} = this.props.match.params;
           
            let dbCon = firebase
                .database()
                .ref(`/tags/${tagId}`);
            console.log(dbCon);
            dbCon.update({tag: this.state.tag,  updated_on: this.state.date});

            this
                .props
                .history
                .push("/Tags/Updated");

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
                                                        <h2>Manage Tags</h2>
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

                                            <h4>Edit Tags</h4>

                                            <div className="product-tab-list tab-pane fade active in">
                                                <Form onSubmit={this.handleSubmit} id="Add-category">

                                                    <div className="row m-b-20">
                                                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                            <label>Tag Name<span style={{
                color: 'red'
            }}>*</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Tags Name*"
                                                                id="add_category"
                                                                name="tag"
                                                                onChange={this.onChange}
                                                                value={this.state.tag}/> {this
                                                                .validator
                                                                .message("Tags Name", this.state.tag, "required|whitespace|specialChar|min:3|max:20")}
                                                            <div className="text-danger">
                                                                {" "}
                                                                {this.state.error_message}
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                            <div className="text-left custom-pro-edt-ds">
                                                                <button type="submit" className="btn btn-ctl-bt waves-effect waves-light">Update
                                                                </button>

                                                                <Link to="/Tags">
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
export default EditTags;
