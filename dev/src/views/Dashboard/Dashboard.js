import React, {Component} from "react";
import Customers from "./Customers"
import {Row} from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
}

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Customers {...this.props}/>
        </Row>
      </div>
    )
  }
}

export default Dashboard;
