import React, {Component} from "react";
import Widget02 from '../../Widgets/Widget02';
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

class OpenTasks extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Open Tasks
              </CardHeader>
              <CardBlock className="card-body">
                <Col xs="12" sm="12" lg="12">
                  <Widget02 header="Ask for payment" mainText="Bob Smith" icon="fa fa-cogs" iconText="9/12" nodeUrl="/tasks/1" color="primary"/>
                </Col>
              </CardBlock>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default OpenTasks;
