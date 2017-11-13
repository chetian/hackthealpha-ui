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

export const UI = {
    detail: "DETAIL",
    category: "CATEGORY"
}

class Relater extends Component {

  constructor(props) {
      super(props)

      this.appName = "Game of Thrones";

      this.state = {
          initialRender: false,
          pageData: {
              primary: {},
              secondary: {}
          },
          view: UI.detail,
          category: "",
          appName: "Game of Thrones"
      }
      this.callDetails = this.callDetails.bind(this);
      this.callCategory = this.callCategory.bind(this);
  }

  fetchData(url, ui){
      fetch(url).then((resp) => resp.json()).then(resp => {
          this.setState({
              initialRender: true,
              pageData: resp,
              view: ui
          });
          return resp;
      }).catch(err => {
          console.log("err", err);
      });
  }

  componentDidMount(){
      //TODO: set initial page data
      this.fetchData('/swim/Character---Jorah%20Mormont', UI.detail);
  }

  componentWillReceiveProps(nextProps){
      console.log("NEXTPROPS", nextProps);
  }

  callDetails(event) {
      let category = event.currentTarget.parentElement.parentElement.firstChild.textContent;
      let categoryURL = encodeURIComponent(category);
      const val = event.currentTarget.textContent;
      const valURL = encodeURIComponent(val);
      // we need to get the category a different way in this
      if (this.state.view === UI.category) {
          category = this.state.category;
          categoryURL = encodeURIComponent(category);
      }
      // TODO: this should be called only if the fetchData is successful
      this.fetchData(`/swim/${categoryURL}---${valURL}`, UI.detail);
  }

  callCategory(event) {
      const category = event.currentTarget.textContent;
      this.fetchData(`/swim/~${category}`, UI.category);
      this.setState({category: category});
  }

  renderDetails(obj){
      let childObj = {};
      let childArray = [];

      // pull out the child keys
      Object.keys(obj).map((k) => {
          childObj = k;
          // ie solvents2, solvents3
          childArray.push(obj[childObj]);
      });

      // now we map through childArray's objects
      return childArray.map((each, i) => {
          return(
              <div key={i} className="area">
                  {Object.keys(each).map((key) => {
                      let value = each[key];
                      return (
                          <div key={key}>
                              <ul>
                                  <span className="renderKey" onClick={this.callCategory}>{key}</span>
                                  <div>
                                      {value.map((arrItem)=> {
                                          return(
                                              <li className="renderValue" key={arrItem} onClick={this.callDetails}>{arrItem}</li>
                                          )
                                      })}
                                  </div>
                              </ul>
                          </div>
                          );
                      })}
              </div>
          );
      });
  }

  renderCategories(obj){
      const categoriesExist = Object.keys(this.state.pageData).length > 0;
      const categories = this.state.pageData;
      if (categoriesExist) {
          return(
              <div>
                  <Row>
                    <Col xs="12" lg="12">
                          <Card>
                            <CardBlock className="card-body">
                                <h2>{this.state.appName}</h2>
                                <span className="renderKey">{this.state.category}</span>
                                <ul>
                                  {((categories.map(category => {
                                      return(
                                          <li key={category} className="renderValue" onClick={this.callDetails}>
                                              {category}
                                          </li>
                                      )
                                  })))}
                              </ul>
                              </CardBlock >
                            </Card>
                        </Col>
                    </Row>
              </div>
          )
      } else {
          return(
              <div>
                  No categories found.
              </div>
          )
      }
  }

  renderCategoryView(){
      return(
          <div>
              {this.renderCategories(this.state.pageData)}
          </div>
      );
  }

  renderDetailView() {
    const primaryDataExists = Object.keys(this.state.pageData.primary).length > 0;
    const secondaryDataExists = Object.keys(this.state.pageData.secondary).length > 0;

      // check for the length of the primary obj
    let renderPrimary = "No primary data", renderSecondary = "No secondary data";
    if (this.state.initialRender === true && this.state.pageData.primary && primaryDataExists) {
        renderPrimary = this.renderDetails(this.state.pageData.primary);
    }
    if (this.state.initialRender === true && this.state.pageData.secondary && secondaryDataExists) {
        renderSecondary = this.renderDetails(this.state.pageData.secondary);
    }

    return (
      <div>
          <Row>
            <Col xs="12" lg="12">

              <Card>
                <CardBlock className="card-body">
                    <h2>{this.state.appName}</h2>
                    <span className="renderKey">{this.state.category}</span>
                    <div className="">
                        {renderPrimary}
                        <br/>
                    </div>
                    <div className="">
                        <h6>Also related:</h6>
                        {renderSecondary}
                    </div>
                </CardBlock>
              </Card>
            </Col>
          </Row>
      </div>
    )
  }

  render(){
      if (this.state.view === UI.detail) {
          return this.renderDetailView();
      }
      if (this.state.view === UI.category) {
          return this.renderCategoryView();
      }
  }
}

export default Relater;
