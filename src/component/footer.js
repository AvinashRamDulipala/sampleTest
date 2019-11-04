import React from "react";


class FooterPage extends React.Component {
  constructor(props) {
    super(props);
   

  }


  render() {
    

    return (
  
        <div className="footer-copyright-area">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <div className="footer-copy-right">
                        <p><a>Copyright © 2019 Gootes</a> All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default FooterPage;
