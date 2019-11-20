import React from "react";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";

import { Grid, Modal, Typography, Button, TextField } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import projectService from "../services/projectService";
interface INewMemberState {
  number: [{ Email: string; name: string; message: string }];
}
interface INewMemberProps {
  open: boolean;
  handleClose: () => void;
  classes: any;
}

class InviteMember extends React.Component<INewMemberProps, INewMemberState> {
  constructor(props: INewMemberProps) {
    super(props);
    this.state = {
      number: [{ Email: "", name: "", message: "" }]
    };
  }

  getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  //   const [modalStyle] = React.useState(this.getModalStyle);

  addRow = () => {
    this.state.number.push({
      Email: "",
      name: "",
      message: ""
    });
    return this.setState({ number: this.state.number });
  };

  deleteRecord = (key: number) => {
    this.state.number.splice(key, 1);
    this.setState({ number: this.state.number });
  };
  loadEmailName = (e: any, key: number) => {
    this.state.number[key].message = "Would You join me ?";
    this.state.number[key].Email = e.target.value;
    this.setState({ number: this.state.number });
  };
  loadName = (e: any, key: number) => {
    this.state.number[key].name = e.target.value;
    this.setState({ number: this.state.number });
  };

  invite = (e: any) => {
    this.state.number.map((prop, key) => {
      projectService.inviteClients(prop).subscribe(() => console.log("done"));
    });
  };
  render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <div style={this.getModalStyle()} className={this.props.classes.paper1}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={2}>
              <PeopleOutlineIcon />
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h6">Invite Members</Typography>
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={this.addRow}
              >
                Add new
              </Button>
            </Grid>
          </Grid>
          <hr></hr>
          <Grid container direction="row">
            <Grid item xs={5}>
              Email
            </Grid>
            <Grid item xs={5}>
              Name
            </Grid>
          </Grid>
          <br></br>

          {this.state.number.map((prop, key) => {
            console.log(prop);
            console.log(key);
            return (
              <div>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={5}>
                    <TextField
                      id="standard-uncontrolled"
                      value={prop.Email}
                      type="email"
                      onChange={e => this.loadEmailName(e, key)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="standard-uncontrolled"
                      value={prop.name}
                      onChange={e => this.loadName(e, key)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <DeleteOutlineIcon
                      onClick={e => this.deleteRecord(key)}
                    ></DeleteOutlineIcon>
                  </Grid>
                </Grid>
              </div>
            );
          })}
          <hr></hr>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={e => this.invite(e)}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  }
}

export default InviteMember;
