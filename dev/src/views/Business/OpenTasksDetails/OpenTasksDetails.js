import React, {Component} from "react";
import {Link} from "react-router-dom"
import * as axios from 'axios';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

class OpenTasksDetails extends Component {

  constructor(props) {
      super(props)

      this.templateData = {
          pageTitle: "Ask for Clarity - 3/11",
          pageType: "tasks",
          pageData: {
              customer: [{
                  name: "Bob Smith",
                  id: 1,
                  link: "1001"
              }],
              description: "Ask him to pay! - HOPEFULLY BY CHECK!",
              date: "March 12th, 2017",
              notes: "Steve: can we offer a 1% discount get get a check?"
          }
      };
  }

  renderGrid(obj){
    return(
     <div>
      {Object.keys(obj).map(function(key){
          let link = key;
          let value = obj[key];
          if (Array.isArray(value)) {
              link = value[0].link;
              value = value[0].name;
          }
        return (
            <div key={key} className="full-width">
                <Row>
                    <Col xs="3" className="customClass"><Link to={key}>{key}</Link></Col>
                    <Col xs="7"><Link to={`/${key}/${link}`}>{value}</Link></Col>
                    <Col xs="2">more...</Col>
                </Row>
            </div>
            );
      })}
     </div>
   );
  }

  render() {
    return (
      <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardBlock className="card-body">
                  <h2>{this.templateData.pageTitle}</h2>
                  {this.renderGrid(this.templateData.pageData)}
                </CardBlock>
              </Card>
            </Col>
          </Row>
      </div>
    )
  }
}

export default OpenTasksDetails;
