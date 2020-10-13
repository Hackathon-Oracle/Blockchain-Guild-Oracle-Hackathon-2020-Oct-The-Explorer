import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class CreateDrugDialogue extends React.Component {
  constructor(props) {
    super();
    console.log(JSON.stringify(props, null, 2));
  }

  componentDidMount() {
    this.props.onDialogClosed();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.openCreateDrugDialogue}
          onClose={() => this.props.onDialogClosed()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Drug</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the deatils below to create a Drug
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="drug-name"
              label="Drug Name"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="serial-number"
              label="Serial Number"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="manufacturer-date"
              label="Manufacturer Date"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="expiry-date"
              label="Expiry Date"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="company-crn"
              label="Company CRN"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="organization-role"
              label="Organization Role"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onDialogClosed} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.onDialogClosed} color="primary">
              Create Drug
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
