import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";
import Button from "@material-ui/core/Button";
import CreateDrugDialogue from "../DialogueForms/CreateDrugDialogue";
import ViewPurchaseOrderDialogue from "../DialogueForms/ViewPurchaseOrderDialogue";
import CreateShipmentDialogue from "../DialogueForms/CreateShipmentDialogue";
import ViewShipmentDialogue from "../DialogueForms/ViewShipmentDialogue";
import ViewDrugLifeCycle from "../DialogueForms/ViewDrugLifeCycle";
import styled from "styled-components";

const StyleDiv = styled.div`
  width: 90%;
  length: 100%;
  max-width: 100rem;
  margin: 2rem auto;
  border: 8px solid #ccc;
  padding: 2rem;
  background: lightgreen;
  font-size: 21px;
`;

class ManufacturerDashboard extends React.Component {
  constructor(props) {
    super();
    console.log(JSON.stringify(props, null, 2));
    // Here we initialize our components state
    this.state = {
      showForm: false,
      showPurchaseOrderForm: false,
      showCreateShipmentForm: false,
      showViewShipmentForm: false,
      showDrugLifeCycleForm: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
    this.handlePOHistoryClick = this.handlePOHistoryClick.bind(this);
    this.onPOHistoryDialogClosed = this.onPOHistoryDialogClosed.bind(this);
    this.handleCreateShipmentClick = this.handleCreateShipmentClick.bind(this);
    this.onCreateShipmentDialogClosed = this.onCreateShipmentDialogClosed.bind(
      this
    );
    this.handleViewShipmentClick = this.handleViewShipmentClick.bind(this);
    this.onViewShipmentDialogClosed = this.onViewShipmentDialogClosed.bind(
      this
    );
    this.handleDrugLifecycleClick = this.handleDrugLifecycleClick.bind(this);
    this.drugLifeCycleDialogClosed = this.drugLifeCycleDialogClosed.bind(this);
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
      showPurchaseOrderForm: true,
    });
  }

  onPOHistoryDialogClosed() {
    console.log("On Dialog Closed");
    this.setState({
      showPurchaseOrderForm: false,
    });
  }

  handleCreateShipmentClick() {
    console.log("Setting show form to true");
    this.setState({
      showCreateShipmentForm: true,
    });
  }

  onCreateShipmentDialogClosed() {
    console.log("On Dialog Closed");
    this.setState({
      showCreateShipmentForm: false,
    });
  }

  handleViewShipmentClick() {
    console.log("Setting show form to true");
    this.setState({
      showViewShipmentForm: true,
    });
  }

  onViewShipmentDialogClosed() {
    console.log("On Dialog Closed");
    this.setState({
      showViewShipmentForm: false,
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
        <p>Manufacturer Dashboard</p>
        <StyleDiv>
          <Button variant="outlined" color="primary" onClick={this.handleClick}>
            Create Drug
          </Button>
          <CreateDrugDialogue
            openCreateDrugDialogue={this.state.showForm}
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
            openPurchaseOrderDialogue={this.state.showPurchaseOrderForm}
            onDialogClosed={this.onPOHistoryDialogClosed}
          />
        </StyleDiv>
        <StyleDiv>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleCreateShipmentClick}
          >
            Create Shipment
          </Button>
          <CreateShipmentDialogue
            openCreateShipmentDialogue={this.state.showCreateShipmentForm}
            onDialogClosed={this.onCreateShipmentDialogClosed}
          />
        </StyleDiv>
        <StyleDiv>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleViewShipmentClick}
          >
            View Shipments
          </Button>
          <ViewShipmentDialogue
            openViewShipmentDialogue={this.state.showViewShipmentForm}
            onDialogClosed={this.onViewShipmentDialogClosed}
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
export default ManufacturerDashboard;
