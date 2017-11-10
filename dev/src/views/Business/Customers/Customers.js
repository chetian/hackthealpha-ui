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

class Customers extends Component {

  constructor(props) {
      super(props)

      this.state = {
          initialRender: false,
          pageData: {
              primary: {},
              secondary: {}
          }
      }
      this.updateData = this.updateData.bind(this);
      this.doCategoryCall = this.doCategoryCall.bind(this);
  }

  fetchData(url){
      console.log("FETCH URL", url);
      fetch(url).then((resp) => resp.json()).then(resp => {
          console.log("resp", resp);
          this.setState({
              initialRender: true,
              pageData: resp
          });
          this.forceUpdate();
          return resp;
      });
  }

  componentDidMount(){
      // ALL ITEMS FROM A LIST: /swim/~Email
      // ALL LISTS: /swim/~~
      // SPECIFIC ITEM: /swim/Email---te@awesome.com
    this.fetchData('/swim/Team---Web');
  }

  componentWillReceiveProps(nextProps){
      console.log("NEXTPROPS", nextProps);
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
                    <Col xs="3"><Link to={key}>{key}</Link></Col>
                    <Col xs="7"><Link to={`/${key}/${link}`}>{value}</Link></Col>
                </Row>
            </div>
            );
      })}
     </div>
   );
  }

    updateData(event) {
        const category = event.currentTarget.parentElement.parentElement.firstChild.textContent;
        const val = event.currentTarget.textContent;
        this.fetchData(`/swim/${category}---${val}`);
    }

  doCategoryCall(event) {
      const category = event.currentTarget.textContent;
        console.log("`/swim/~${category}`", `/swim/~${category}`);
        this.fetchData(`/swim/~${category}`);
  }

  renderUI(obj){

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
                          <div>
                              <ul>
                                  <span className="renderKey" onClick={this.doCategoryCall}>{key}</span>
                                  <div>
                                      {value.map((arrItem)=> {
                                          return(
                                              <li className="renderValue" key={arrItem} onClick={this.updateData}>{arrItem}</li>
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

  render() {
    const primaryDataExists = Object.keys(this.state.pageData.primary).length > 0;
    const secondaryDataExists = Object.keys(this.state.pageData.secondary).length > 0;

      // check for the length of the primary obj
    let renderPrimary = "loading", renderSecondary = "loading";
    if (this.state.initialRender === true && this.state.pageData.primary && primaryDataExists) {
        renderPrimary = this.renderUI(this.state.pageData.primary);
    }
    if (this.state.initialRender === true && this.state.pageData.secondary && secondaryDataExists) {
        renderSecondary = this.renderUI(this.state.pageData.secondary);
    }

    return (
      <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardBlock className="card-body">
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
}

export default Customers;
