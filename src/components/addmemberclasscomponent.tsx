import React from "react";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CloseIcon from "@material-ui/icons/Close";

import { Grid, Modal, Typography, Button, TextField } from "@material-ui/core";
import SketchExample from "./color";
import { IClientInfo } from "../model/clients";
import projectService from "../services/projectService";

interface addMemberState {
  number: IClientData[];
  clientDataState: IClientData[];
}
interface IClientData {
  clients: IClientInfo;
  existence: boolean;
}

interface addMemberProps {
  open: boolean;
  handleClose: () => void;
  classes: any;
  clientData: IClientData[];
  clientsData: () => void;
}

class AddMember extends React.Component<addMemberProps, addMemberState> {
  constructor(props: addMemberProps) {
    super(props);
    this.state = {
      clientDataState: this.props.clientData,
      number: []
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

  handleChange = (e: number) => {
    this.state.clientDataState[e].existence = !this.state.clientDataState[e]
      .existence;
    return this.setState({ clientDataState: this.state.clientDataState });
  };
  addRow = () => {
    this.state.number.push({
      clients: {
        id: 0,
        name: "",
        color: { r: "102", g: "100", b: "201", a: "10" },
        noOfProjects: 0
      },
      existence: true
    });
    return this.setState({ number: this.state.number });
  };

  deleteRecord = (e: number, recordName: string) => {
    this.state.clientDataState.splice(e, 1);
    let name1 = recordName;
    projectService
      .deleteClient(name1)
      .subscribe(() => this.props.clientsData());
    return this.setState({ clientDataState: this.state.clientDataState });
  };
  handleChange1 = (e: number) => {
    this.state.number[e].existence = !this.state.number[e].existence;
    return this.setState({ number: this.state.number });
  };
  deleteRecord1 = (e: number, recordName1: string) => {
    this.state.number.splice(e, 1);
    let name2 = recordName1;
    projectService
      .deleteClient(name2)
      .subscribe(data => this.props.clientsData());
    return this.setState({ number: this.state.number });
  };
  handleColor = (e: any, key: number) => {
    console.log(e);
    this.state.clientDataState[key].clients.color = e;
    this.setState({ clientDataState: this.state.clientDataState }, () =>
      console.log(this.state.clientDataState)
    );
  };
  handleColor1 = (e: any, key: number) => {
    console.log(e);
    this.state.number[key].clients.color = e;
    this.setState({ number: this.state.number }, () =>
      console.log(this.state.number)
    );
  };

  loadClientName = (e: any, key: number) => {
    this.state.clientDataState[key].clients.name = e.target.value;

    this.setState({ clientDataState: this.state.clientDataState }, () =>
      console.log(this.state.clientDataState)
    );
  };

  loadClientName1 = (e: any, key: number) => {
    this.state.number[key].clients.name = e.target.value;
    this.state.number[key].clients.id = Math.ceil(
      Math.random() * (100 - 10) + 10
    );
    this.setState({ number: this.state.number }, () =>
      console.log(this.state.number)
    );
  };

  pushClientData = () => {
    this.state.number.map((prop, key) => {
      projectService.postClient(prop.clients).subscribe(() => {
        this.props.clientsData();
      });
    });
    this.state.clientDataState.map((prop, key) => {
      projectService.postClient(prop.clients).subscribe(() => {
        this.props.clientsData();
      });
    });
    this.setState({ clientDataState: this.state.clientDataState });
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
              <Typography variant="h6">Manage Clients</Typography>
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
            <Grid item xs={2}>
              Color
            </Grid>
            <Grid item xs={5}>
              Name
            </Grid>
            <Grid item xs={5}>
              Projects
            </Grid>
          </Grid>
          <br></br>

          {this.state.clientDataState.map((prop, key) => {
            console.log(prop);
            console.log(key);
            return (
              <div>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={2}>
                    <SketchExample
                      displayColorPicker={false}
                      color={prop.clients.color}
                      handleColor={e => this.handleColor(e, key)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="standard-uncontrolled"
                      value={prop.clients.name}
                      onChange={e => this.loadClientName(e, key)}
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item xs>
                        {prop.clients.id}
                      </Grid>
                      <Grid item xs>
                        <div>
                          {prop.existence ? (
                            <DeleteOutlineIcon
                              onClick={e => this.handleChange(key)}
                            />
                          ) : (
                            <CloseIcon
                              onClick={e => {
                                this.deleteRecord(key, prop.clients.name);
                              }}
                            />
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <br></br>
              </div>
            );
          })}

          {this.state.number.map((prop, key) => {
            console.log(prop);
            console.log(key);
            return (
              <div>
                <Grid container direction="row" alignItems="center">
                  <Grid item xs={2}>
                    <SketchExample
                      displayColorPicker={false}
                      color={prop.clients.color}
                      handleColor={e => this.handleColor1(e, key)}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="standard-uncontrolled"
                      onChange={e => this.loadClientName1(e, key)}
                    />
                  </Grid>

                  <Grid item xs={5}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item xs>
                        0
                      </Grid>
                      <Grid item xs>
                        <div>
                          {prop.existence ? (
                            <DeleteOutlineIcon
                              onClick={e => this.handleChange1(key)}
                            />
                          ) : (
                            <CloseIcon
                              onClick={e => {
                                this.deleteRecord1(key, prop.clients.name);
                              }}
                            />
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <br></br>
              </div>
            );
          })}

          <Grid container direction="row">
            <Grid item xs={8}></Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={e => this.pushClientData()}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    );
  }
}

export default AddMember;
