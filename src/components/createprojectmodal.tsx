import React from "react";
import Modal from "@material-ui/core/Modal";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { IProjectInfo } from "../model/project";
import { IPhasesInfo } from "../model/phases";
import { IClientInfo } from "../model/clients";
import { IProjectTimeSheet } from "../model/timesheet";
import FolderIcon from "@material-ui/icons/Folder";
import {
  FormControl,
  Select,
  InputLabel,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
  Input,
  Chip
} from "@material-ui/core";

import SketchExample from "./color";
import AddIcon from "@material-ui/icons/Add";
import AddMember from "./addmemberclasscomponent";
import MenuItemComponent from "./menuItem";

interface ICreateProjectModalProps {
  openCreateProjectModal: boolean;
  handleClose: () => void;
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
  clientData: () => void;
  projectData: () => void;
  phaseData: () => void;
  timesheetData: () => void;
  classes: any;
}
interface IProjectState {
  open: boolean;
  open1: boolean;
  open2: boolean;
  open3: boolean;
  open4: boolean;
  openRate: boolean;
  phase: string[];
  SelectedValue: any;
  addedProject: any;
}

class CreateProjectModal extends React.Component<
  ICreateProjectModalProps,
  IProjectState
> {
  constructor(props: ICreateProjectModalProps) {
    super(props);
    this.state = {
      open: false,
      open1: false,
      open2: false,
      open3: false,
      open4: false,
      openRate: false,
      phase: [],
      SelectedValue: "",
      addedProject: {}
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
  handleProjectName = (e: any) => {
    this.state.addedProject.name = e.target.value;
    this.setState({ addedProject: this.state.addedProject });
  };

  handleOpen4 = () => {
    this.setState({ open4: true, SelectedValue: "" });
  };

  handleClose = () => {
    this.setState({ open4: false });
  };

  handleClientName = (e: any) => {
    this.props.phases.map((prop, key) => {
      if (prop.name === e.target.value) {
        this.state.addedProject.clientId = prop.id;
      }
    });
    this.setState({ addedProject: this.state.addedProject });
  };
  handleMemberName = (e: any) => {
    this.state.addedProject.members.name = e.target.value;
    this.setState({ addedProject: this.state.addedProject });
  };
  handleMemberRate = (e: any) => {
    this.state.addedProject.members.hourlyRate = e.target.value;
    this.setState({ addedProject: this.state.addedProject });
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClick1 = () => {
    this.setState({ open1: !this.state.open1 });
  };
  handleClick2 = () => {
    this.setState({ open2: !this.state.open2 });
  };
  handleClick3 = () => {
    this.setState({ open3: !this.state.open3 });
  };
  handleClick5 = () => {
    this.setState({ openRate: !this.state.openRate });
  };

  handlePhaseName = (e: any) => {
    console.log(e);
  };

  handleColor = (e: any) => {
    console.log(e);
  };
  handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ phase: event.target.value as string[] });
    // setPhase(event.target.value as string[]);
  };
  render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.openCreateProjectModal}
        onClose={this.props.handleClose}
      >
        <div style={this.getModalStyle()} className={this.props.classes.paper1}>
          <Typography variant="h4">
            <FolderIcon /> Create a new Project
          </Typography>

          <hr></hr>
          <div
            onClick={e => {
              this.handleClick();
            }}
          >
            <Grid container direction="row" alignItems="center">
              <Grid item xs={10}>
                <Typography variant="h6">Project Details</Typography>
              </Grid>
              <Grid item xs={2}>
                <Grid container direction="row" justify="flex-end">
                  {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <Grid container direction="row">
              <Grid item xs={8}>
                <TextField
                  id="standard-full-width"
                  label="Name"
                  style={{ margin: 6 }}
                  placeholder="Placeholder"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={e => this.handleProjectName(e)}
                />
              </Grid>
              <Grid item xs={2}>
                <SketchExample
                  displayColorPicker={false}
                  color={{ r: "241", g: "112", b: "19", a: "1" }}
                  handleColor={e => this.handleColor(e)}
                />
              </Grid>
            </Grid>
            <Grid container direction="row">
              <Grid item xs={4}>
                <FormControl className={this.props.classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">Client</InputLabel>
                  <Select
                    native
                    value={this.state.SelectedValue}
                    onChange={e => {
                      if (e.target.value === "create") {
                        this.handleOpen4();
                      } else if (e.target.value) {
                        this.setState({ SelectedValue: e.target.value });
                        this.handleClientName(e);
                      }
                    }}
                  >
                    {" "}
                    <optgroup label="">
                      <option value="" />
                      <option>No Selection</option>
                      <option value="create">Add Client</option>
                    </optgroup>
                    <optgroup label="">
                      {this.props.clients.map((prop, key) => {
                        console.log(prop);
                        return <option>{prop.name}</option>;
                      })}
                    </optgroup>
                  </Select>
                </FormControl>

                <AddMember
                  clientsData={this.props.clientData}
                  clientData={this.props.clients.map(client => ({
                    clients: client,
                    existence: true
                  }))}
                  open={this.state.open4}
                  handleClose={this.handleClose}
                  classes={this.props.classes}
                />
              </Grid>
            </Grid>
          </Collapse>
          <hr></hr>
          <div
            onClick={e => {
              this.handleClick1();
            }}
          >
            <Grid container direction="row" alignItems="center">
              <Grid item xs={10}>
                <Typography variant="h6">Members</Typography>
              </Grid>
              <Grid item xs={2}>
                <Grid container direction="row" justify="flex-end">
                  {this.state.open1 ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Collapse in={this.state.open1} timeout="auto" unmountOnExit>
            <Grid container direction="row">
              <Grid item xs={4}>
                <FormControl className={this.props.classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">Members</InputLabel>
                  <Select
                    native
                    onChange={e => {
                      this.handleMemberName(e);
                    }}
                  >
                    {" "}
                    <optgroup label="">
                      {this.props.project.map((prop, key) => {
                        console.log(prop);
                        return (
                          <option value={prop.name}>{prop.members.name}</option>
                        );
                      })}
                    </optgroup>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={this.props.classes.button1}
                  startIcon={<AddIcon />}
                  onClick={this.handleClick5}
                >
                  hourly rate
                </Button>
              </Grid>
            </Grid>
            <Collapse in={this.state.openRate} timeout="auto" unmountOnExit>
              <TextField onChange={e => this.handleMemberRate(e)}></TextField>
            </Collapse>
          </Collapse>

          <hr></hr>
          <div
            onClick={e => {
              this.handleClick2();
            }}
          >
            <Grid container direction="row" alignItems="center">
              <Grid item xs={10}>
                <Typography variant="h6">Phases </Typography>
              </Grid>
              <Grid item xs={2}>
                <Grid container direction="row" justify="flex-end">
                  {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
            <Grid container direction="row">
              <Grid item xs>
                <MenuItemComponent
                  phases={this.props.phases}
                  classes={this.props.classes}
                  handleName={e => this.handlePhaseName(e)}
                />
              </Grid>
            </Grid>
          </Collapse>

          <hr></hr>
          <div
            onClick={e => {
              this.handleClick3();
            }}
          >
            <Grid container direction="row" alignItems="center">
              <Grid item xs={10}>
                <Typography variant="h6">Budget</Typography>
              </Grid>
              <Grid item xs={2}>
                <Grid container direction="row" justify="flex-end">
                  {this.state.open3 ? <ExpandLess /> : <ExpandMore />}
                </Grid>
              </Grid>
            </Grid>
          </div>
          <Collapse in={this.state.open3} timeout="auto" unmountOnExit>
            <Grid container direction="row">
              <Grid item xs={4}>
                <TextField
                  id="standard-full-width"
                  label="hrs"
                  style={{ margin: 6 }}
                  placeholder="Placeholder"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={4}>
                <FormControl className={this.props.classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">Members</InputLabel>
                  <Select native>
                    {" "}
                    <optgroup label="">
                      <option value=""></option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </optgroup>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>
          <Grid container direction="row" justify="flex-end"></Grid>
          <Button variant="contained" className={this.props.classes.button1}>
            Create
          </Button>
        </div>
      </Modal>
    );
  }
}

export default CreateProjectModal;
