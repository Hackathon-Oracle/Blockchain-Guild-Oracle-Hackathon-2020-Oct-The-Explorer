import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class RetailDrugDialogue extends React.Component {
  constructor(props) {
    super(props);
    console.log(JSON.stringify(props, null, 2));
  }

  componentDidMount() {
    this.props.onDialogClosed();
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.openRetailDrugDialogue}
          onClose={() => this.props.onDialogClosed()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Update the Drug Details sold
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the deatils to Update the Drug details
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="DrugName"
              label="DrugName"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="SerialNo"
              label="SerialNo"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="retailerCRN"
              label="RetailerCRN"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="customerAadhar"
              label="customerAadhar"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="OrganizationRole"
              label="OrganizationRole"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onDialogClosed} color="primary">
              Update Drug Details
            </Button>
            <Button onClick={this.props.onDialogClosed} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
