import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class UpdateShipmentDialogue extends React.Component {
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
          open={this.props.openUpdateShipmentDialogue}
          onClose={() => this.props.onDialogClosed()}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Shipment </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the deatils to Update the shipment
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="BuyerCRN"
              label="BuyerCRN"
              type="email"
              fullWidth
            />
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
              id="Transporter"
              label="Transporter"
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
              Update Shipment
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
