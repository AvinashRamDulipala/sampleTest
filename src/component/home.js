import React from "react";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";
import axios from "axios";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
   

  }
componentDidMount(){

    console.log(firebase.database.ServerValue.TIMESTAMP) // this will return an [object Object]

//     let dbCon = firebase
//     .database()
//     .ref("users/")
//     .orderByChild("couponCode")
//     .equalTo(this.state.promoCode);
//   dbCon.on('value', snapshot => {
//     console.log(snapshot.numChildren());
//     if (snapshot.numChildren() > 0) {
//     }
// })
}

  render() {
    

    return (
      <div>
  <div className="income-order-visit-user-area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="income-dashone-total reso-mg-b-30">
                            <div className="income-dashone-pro">
                                <div className="income-rate-total">
                                    <div className="price-nalika-rate">
                                        <h3><span>$</span><span className="counter">7500</span></h3>
                                    </div>
                                    <div className="price-graph">
                                        <span id="sparkline1"></span>
                                    </div>
                                </div>
                                <div className="income-range">
                                    <p>Total income</p>
                                    <span className="income-percentange bg-green"><span className="counter">95</span>% <i className="fa fa-bolt"></i>
                                    </span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="income-dashone-total reso-mg-b-30">
                            <div className="income-dashone-pro">
                                <div className="income-rate-total">
                                    <div className="price-nalika-rate">
                                        <h3><span className="counter">6400</span></h3>
                                    </div>
                                    <div className="price-graph">
                                        <span id="sparkline6"></span>
                                    </div>
                                </div>
                                <div className="income-range order-cl">
                                    <p>New Orders</p>
                                    <span className="income-percentange bg-red"><span className="counter">65</span>% <i className="fa fa-level-up"></i>
                                    </span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="income-dashone-total reso-mg-b-30 res-mg-t-30">
                            <div className="income-dashone-pro">
                                <div className="income-rate-total">
                                    <div className="price-nalika-rate">
                                        <h3><span className="counter">4500</span></h3>
                                    </div>
                                    <div className="price-graph">
                                        <span id="sparkline2"></span>
                                    </div>
                                </div>
                                <div className="income-range visitor-cl">
                                    <p>New Visitor</p>
                                    <span className="income-percentange bg-blue"><span className="counter">75</span>% <i className="fa fa-level-up"></i>
                                    </span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="income-dashone-total res-mg-t-30">
                            <div className="income-dashone-pro">
                                <div className="income-rate-total">
                                    <div className="price-nalika-rate">
                                        <h3><span className="counter">235400</span></h3>
                                    </div>
                                    <div className="price-graph">
                                        <span id="sparkline5"></span>
                                    </div>
                                </div>
                                <div className="income-range low-value-cl">
                                    <p>In first month</p>
                                    <span className="income-percentange bg-purple"><span className="counter">35</span>% <i className="fa fa-level-down"></i>
                                    </span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
        <div className="dashtwo-order-area mg-tb-30">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-nalika-wrap ant-res-b-30 reso-mg-b-30">
                            <div className="skill-content-3 analytics-nalika">
                                <div className="skill">
                                    <div className="progress">
                                        <div className="lead-content">
                                            <h3><span className="counter">95</span>%</h3>
                                            <p>Server down 4:32 pm</p>
                                        </div>
                                        <div className="progress-bar wow fadeInLeft" data-progress="95%" style={{width: "95%"}}> <span>95%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-nalika-wrap reso-mg-b-30">
                            <div className="skill-content-3 analytics-nalika analytics-nalika4">
                                <div className="skill">
                                    <div className="progress">
                                        <div className="lead-content">
                                            <h3>85%</h3>
                                            <p>Server down 8:32 pm</p>
                                        </div>
                                        <div className="progress-bar wow fadeInLeft" data-progress="85%" style={{width: "85%"}}><span>85%</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-nalika-wrap reso-mg-b-30 res-mg-t-30">
                            <div className="skill-content-3 analytics-nalika analytics-nalika3">
                                <div className="skill">
                                    <div className="progress progress-bt">
                                        <div className="lead-content">
                                            <h3>80%</h3>
                                            <p>Server down 10:32 pm</p>
                                        </div>
                                        <div className="progress-bar wow fadeInLeft" data-progress="80%" style={{width: "80%"}}><span>80%</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-nalika-wrap res-mg-t-30">
                            <div className="skill-content-3 analytics-nalika analytics-nalika2">
                                <div className="skill">
                                    <div className="progress progress-bt">
                                        <div className="lead-content">
                                            <h3>93%</h3>
                                            <p>Server down 10:32 pm</p>
                                        </div>
                                        <div className="progress-bar wow fadeInLeft" data-progress="93%" style={{width: "93%"}}><span>93%</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="analytics-sparkle-area">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-sparkle-line reso-mg-b-30">
                            <div className="analytics-content">
                                <h5>Visits in last 24h</h5>
                                <h2 className="counter">5600</h2>
                                <div id="sparkline22"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-sparkle-line reso-mg-b-30">
                            <div className="analytics-content">
                                <h5>Visits week</h5>
                                <h2 className="counter">3400</h2>
                                <div id="sparkline23"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-sparkle-line reso-mg-b-30 res-mg-t-30">
                            <div className="analytics-content">
                                <h5>Last month</h5>
                                <h2 className="counter">3300</h2>
                                <div id="sparkline24"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-sparkle-line res-mg-t-30">
                            <div className="analytics-content">
                                <h5>Avarage time</h5>
                                <h2>00:06:40</h2>
                                <div id="sparkline25"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="analysis-rounded-area mg-tb-30">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-rounded reso-mg-b-30">
                            <div className="analytics-rounded-content">
                                <h5>Percentage distribution</h5>
                                <h2><span className="counter">40</span>/20</h2>
                                <div className="text-center">
                                    <div id="sparkline51"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-rounded reso-mg-b-30">
                            <div className="analytics-rounded-content">
                                <h5>Percentage division</h5>
                                <h2><span className="counter">140</span>/<span className="counter">54</span></h2>
                                <div className="text-center">
                                    <div id="sparkline52"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-rounded reso-mg-b-30 res-mg-t-30">
                            <div className="analytics-rounded-content">
                                <h5>Percentage Counting</h5>
                                <h2>2345/311</h2>
                                <div className="text-center">
                                    <div id="sparkline53"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analytics-rounded res-mg-t-30">
                            <div className="analytics-rounded-content">
                                <h5>Percentage Sequence</h5>
                                <h2>780/56</h2>
                                <div className="text-center">
                                    <div id="sparkline54"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="analysis-progrebar-area mg-b-30">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analysis-progrebar reso-mg-b-30">
                            <div className="analysis-progrebar-content">
                                <h5>Usage</h5>
                                <h2><span className="counter">90</span>%</h2>
                                <div className="progress progress-mini">
                                    <div style={{width: "68%"}} className="progress-bar"></div>
                                </div>
                                <div className="m-t-sm small">
                                    <p>Server down since 1:32 pm.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analysis-progrebar reso-mg-b-30">
                            <div className="analysis-progrebar-content">
                                <h5>Memory</h5>
                                <h2><span className="counter">70</span>%</h2>
                                <div className="progress progress-mini">
                                    <div style={{width: "78%"}} className="progress-bar"></div>
                                </div>
                                <div className="m-t-sm small">
                                    <p>Server down since 12:32 pm.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analysis-progrebar reso-mg-b-30 res-mg-t-30">
                            <div className="analysis-progrebar-content">
                                <h5>Data</h5>
                                <h2><span className="counter">50</span>%</h2>
                                <div className="progress progress-mini">
                                    <div style={{width: "38%"}} className="progress-bar progress-bar-danger"></div>
                                </div>
                                <div className="m-t-sm small">
                                    <p>Server down since 8:32 pm.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                        <div className="analysis-progrebar res-mg-t-30">
                            <div className="analysis-progrebar-content">
                                <h5>Space</h5>
                                <h2><span className="counter">40</span>%</h2>
                                <div className="progress progress-mini">
                                    <div style={{width: "28%"}} className="progress-bar progress-bar-danger"></div>
                                </div>
                                <div className="m-t-sm small">
                                    <p>Server down since 5:32 pm.</p>
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

export default HomePage;
