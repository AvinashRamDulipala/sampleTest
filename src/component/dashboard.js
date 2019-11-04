import React from "react";
import { Link } from "react-router-dom";
import HeaderPage from "./header";
import FooterPage from "./footer";
import firebase from '../config';
import SidebarPage from "./sidebar";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        date: new Date().toLocaleString(),
        userCount:'',
        orsersCount:'',
        merchantCount:'',
        productsCount:'',
    }
   

  }
  componentDidMount(){

   
    this.merchantView();
    this.productsView();
}

merchantView(){
  
   
        var ref = firebase
            .database()
            .ref("tags/");
    

   
    ref.on('value', snapshot => {
    console.log(snapshot.numChildren());

   this.setState({merchantCount:snapshot.numChildren()})
});
}
productsView(){
   
        var ref = firebase
            .database()
            .ref("Employees/")
                ref.on('value', snapshot => {
    console.log(snapshot.numChildren());
   this.setState({productsCount:snapshot.numChildren()})
});
}
 
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
                                                <h2>Dashboard</h2>
                                                </div>
                                        </div>
                                    </div>
                          
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      
     
            <div className="income-order-visit-user-area">
            <div className="container-fluid">
                <div className="row">
               
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <Link to='/UsersList'>
                        <div className="income-dashone-total reso-mg-b-30 user_bg">
                            <div className="income-dashone-pro">
                                <div className="income-rate-total">
                                    <div className="price-nalika-rate">
                                        <h3><span className="counter">{this.state.productsCount}</span></h3>
                                    </div>
                                    <div className="price-graph">
                                        <span id="sparkline1"></span>
                                    </div>
                                </div>
                                <div className="income-range">
                                    <p>Manage Users</p>
                                    <span className="income-percentange bg-green"><i className="fa fa-user"></i>
                                    </span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <Link to='/Tags'>
                        <div className="income-dashone-total reso-mg-b-30 order_bg">
                            <div className="income-dashone-pro">
                                <div className="income-rate-total">
                                    <div className="price-nalika-rate">
                                        <h3><span className="counter">{this.state.merchantCount}</span></h3>
                                    </div>
                                    <div className="price-graph">
                                        <span id="sparkline6"></span>
                                    </div>
                                </div>
                                <div className="income-range order-cl">
                                   <p> Manage Tags</p>
                                    <span className="income-percentange bg-red"><i className="fa fa-file-text"></i>
                                    </span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                        </Link>
                    </div>
                    {/* {sessionStorage.getItem("userRole") == "Admin"||sessionStorage.getItem("userRole") == "Super Admin"?
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <Link to='/MerchantAccount'>
                        <div className="income-dashone-total reso-mg-b-30 res-mg-t-30 merchant_bg">
                            <div className="income-dashone-pro">
                                <div className="income-rate-total">
                                    <div className="price-nalika-rate">
                                        <h3><span className="counter">{this.state.merchantCount}</span></h3>
                                    </div>
                                    <div className="price-graph">
                                        <span id="sparkline2"></span>
                                    </div>
                                </div>
                                <div className="income-range visitor-cl">
                                    <p>Merchants</p>
                                    <span className="income-percentange bg-blue"><i className="fa fa-cart-arrow-down"></i>
                                    </span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                        </Link>
                    </div>:''}
                    {sessionStorage.getItem("userRole") == "Admin"||sessionStorage.getItem("userRole") == "Super Admin"||sessionStorage.getItem("userRole") == "Merchant"?
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <Link to='/ProductListPage'>
                        <div className="income-dashone-total res-mg-t-30 products_bg">
                            <div className="income-dashone-pro">
                                <div className="income-rate-total">
                                    <div className="price-nalika-rate">
                                        <h3><span className="counter">{this.state.productsCount}</span></h3>
                                    </div>
                                    <div className="price-graph">
                                        <span id="sparkline5"></span>
                                    </div>
                                </div>
                                <div className="income-range low-value-cl">
                                    <p>Products</p>
                                    <span className="income-percentange bg-purple"><i className="fa fa-shopping-basket"></i>
                                    </span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                        </Link>
                    </div>:''} */}
                </div>
            </div>
        </div>

         </div>
         <FooterPage/>
    
      </div>
    );
  }
}

export default Dashboard;
