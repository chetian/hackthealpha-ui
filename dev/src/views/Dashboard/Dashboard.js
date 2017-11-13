import React, {Component} from "react";
import Relater from "./Relater"
import {Row} from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
}

  render() {

    return (
      <div className="animated fadeIn">
        <Row>
          <Relater {...this.props}/>
        </Row>
      </div>
    )
  }
}

export default Dashboard;
