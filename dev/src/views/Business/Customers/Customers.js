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
              primary: "",
              secondary: ""
          }
      }

      this.templateData = {
          pageTitle: "Bob Smith",
          pageType: "customer",
          pageData: {
              tasks: [{
                  link: "1002",
                  id: 2,
                  name: "Ask for Clarity - 3/11 -test",
              }],
              description: "Ask him to pay! - HOPEFULLY BY CHECK!",
              date: "March 12th, 2017",
              notes: "Steve: can we offer a 1% discount to get a check?"
          }
      };
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
        // console.log("`/swim/~${category}`", `/swim/~${category}`);
        this.fetchData(`/swim/~${category}`);
  }

  renderPrimary(obj){
    return(
        <div>
            {Object.keys(obj).map((key) => {
                    // console.log("obj", obj);
                    // console.log("key", key);
                    // console.log("obj[key]", obj[key]);
                let link = key;
                let value = obj[key];
                //   if (Array.isArray(value)) {
                //       link = value[0].link;
                //       value = value[0].name;
                //   }
                // value.map((arrItem)=> {
                //     console.log("arrItem", arrItem);
                // });
                return (
                    <ul>
                        <li key={key} className="full-width">
                            <span className="renderKey" onClick={this.doCategoryCall}>{key}</span>
                                <div>
                                    {value.map((arrItem)=> {
                                        return(
                                            <li className="renderValue" key={arrItem} onClick={this.updateData}>{arrItem}</li>
                                        )
                                    })}
                                </div>
                        </li>
                    </ul>
                    );
                })}
        </div>
    );
  }

  render() {
    let renderPrim1 = "loading", renderPrim2 = "";
    if (this.state.initialRender === true && this.state.pageData && this.state.pageData.primary) {
        // renderPrim1 = this.renderPrimary(this.pageData.primary.customers);
        // console.log("this.state.pageData.secondary.keys()", this.state.pageData.secondary.keys());
        renderPrim2 = this.renderPrimary(this.state.pageData.secondary.customers);
    }

    return (
      <div className="animated fadeIn">
          <Row>
            <Col xs="12" lg="12">
              <Card>
                <CardBlock className="card-body">
                    <div className="">
                        {renderPrim1}
                        <br/>
                    </div>
                    <div className="">
                        <h6>Also related:</h6>
                        {renderPrim2}
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
