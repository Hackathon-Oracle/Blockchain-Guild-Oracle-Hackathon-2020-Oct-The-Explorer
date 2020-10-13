import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";
import Button from "@material-ui/core/Button";
import ViewPurchaseOrderDialogue from "../DialogueForms/ViewPurchaseOrderDialogue";
import ViewDrugLifeCycle from "../DialogueForms/ViewDrugLifeCycle";
import CreatePurchaseOrderDialogue from "../DialogueForms/CreatePurchaseOrderDialogue";
import RetailDrugDialogue from "../DialogueForms/RetailDrugDialogue";
import styled from "styled-components";

const StyleDiv = styled.div`
  width: 90%;
  length: 100%;
  max-width: 100rem;
  margin: 2rem auto;
  border: 8px solid #ccc;
  padding: 2rem;
  background: lightblue;
  font-size: 21px;
`;

class RetailerDashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log(JSON.stringify(props, null, 2));
    // Here we initialize our components state
    this.state = {
      showForm: false,
      showDrugDetailsForm: false,
      showViewPurchaseOrderForm: false,
      showDrugLifeCycleForm: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
    this.handlePOHistoryClick = this.handlePOHistoryClick.bind(this);
    this.onPOHistoryDialogClosed = this.onPOHistoryDialogClosed.bind(this);
    this.handleDrugLifecycleClick = this.handleDrugLifecycleClick.bind(this);
    this.drugLifeCycleDialogClosed = this.drugLifeCycleDialogClosed.bind(this);
    this.handleRetailDrug = this.handleRetailDrug.bind(this);
    this.onRetailDrugClosed = this.onRetailDrugClosed.bind(this);
  }

  handleClick() {
    console.log("Setting show form to true");
    this.setState({
      showForm: true,
    });
  }

  onDialogClosed() {
    console.log("On Dialog Closed");
    this.setState({
      showForm: false,
    });
  }

  handlePOHistoryClick() {
    console.log("Setting show form to true");
    this.setState({
      showViewPurchaseOrderForm: true,
    });
  }

  onPOHistoryDialogClosed() {
    console.log("On Dialog Closed");
    this.setState({
      showViewPurchaseOrderForm: false,
    });
  }

  handleRetailDrug() {
    console.log("Setting show form to true");
    this.setState({
      showDrugDetailsForm: true,
    });
  }

  onRetailDrugClosed() {
    console.log("On Dialog Closed");
    this.setState({
      showDrugDetailsForm: false,
    });
  }

  handleDrugLifecycleClick() {
    console.log("Setting show form to true");
    this.setState({
      showDrugLifeCycleForm: true,
    });
  }

  drugLifeCycleDialogClosed() {
    console.log("On Dialog Closed");
    this.setState({
      showDrugLifeCycleForm: false,
    });
  }

  render() {
    const { showForm } = this.state;
    return (
      <StyleDiv>
        <p> Retailer Dashboard</p>
        <StyleDiv>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleRetailDrug}
          >
            Update Customer and Drug Details
          </Button>
          <RetailDrugDialogue
            openRetailDrugDialogue={this.state.showDrugDetailsForm}
            onDialogClosed={this.onRetailDrugClosed}
          />
        </StyleDiv>
        <StyleDiv>
          <Button variant="outlined" color="primary" onClick={this.handleClick}>
            Create Purchase Order
          </Button>
          <CreatePurchaseOrderDialogue
            openCreatePurchaseOrderDialogue={this.state.showForm}
            onDialogClosed={this.onDialogClosed}
          />
        </StyleDiv>
        <StyleDiv>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handlePOHistoryClick}
          >
            View Purchase orders
          </Button>
          <ViewPurchaseOrderDialogue
            openPurchaseOrderDialogue={this.state.showViewPurchaseOrderForm}
            onDialogClosed={this.onPOHistoryDialogClosed}
          />
        </StyleDiv>
        <StyleDiv>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleDrugLifecycleClick}
          >
            View Drug History
          </Button>
          <ViewDrugLifeCycle
            openDrugLifecycleDialogue={this.state.showDrugLifeCycleForm}
            onDialogClosed={this.drugLifeCycleDialogClosed}
          />
        </StyleDiv>
      </StyleDiv>
    );
  }
}
export default RetailerDashboard;
