import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Registerorganization from "../DialogueForms/Registerorganization";

export default class TransporterList extends React.Component {
  constructor(props) {
    super();
    this.state = {
      row: this.initiStateWithDummyData(),
      openCreateOrganizationDialogue: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onDialogClosed = this.onDialogClosed.bind(this);
  }

  useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  onDialogClosed(data) {
    if (data && data.companyCRN != "") {
      console.log(data);
      var transporterData = this.state.row;
      transporterData.push(data);
      this.setState({
        row: transporterData,
      });
    }
    this.setState({
      openCreateOrganizationDialogue: false,
    });
  }

  handleClick() {
    this.setState({
      openCreateOrganizationDialogue: true,
    });
  }

  render() {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Company CRN</TableCell>
                <TableCell align="right">Company Name</TableCell>
                <TableCell align="right">Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.row.map((row) => (
                <TableRow key={row.companyCRN}>
                  <TableCell align="right">{row.companyCRN}</TableCell>
                  <TableCell align="right">{row.companyName}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <button
          onClick={() => {
            this.handleClick();
          }}
        >
          Create Organization
        </button>
        <Registerorganization
          openCreateOrganizationDialogue={
            this.state.openCreateOrganizationDialogue
          }
          onDialogClosed={this.onDialogClosed}
        />
      </div>
    );
  }

  initiStateWithDummyData() {
    let dummyData = [];
    dummyData.push({
      companyCRN: "transporter1",
      companyName: "transporter",
      location: "Ludhiana",
    });
    dummyData.push({
      companyCRN: "transporter",
      companyName: "transporter2",
      location: "Bangalore",
    });
    dummyData.push({
      companyCRN: "transporter",
      companyName: "transporter3",
      location: "MP",
    });
    return dummyData;
  }
}
