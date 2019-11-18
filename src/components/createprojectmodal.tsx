import React from "react";
import Modal from "@material-ui/core/Modal";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme
} from "@material-ui/core/styles";

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
  Chip,
  Divider
} from "@material-ui/core";
import AddMember from "./addmemberclasscomponent";
import SketchExample from "./color";
import AddIcon from "@material-ui/icons/Add";

interface ICreateProjectModalProps {
  open: boolean;
  handleClose: () => void;
  project: IProjectInfo[];
  phases: IPhasesInfo[];
  clients: IClientInfo[];
  timeSheet: IProjectTimeSheet[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    paper1: {
      position: "absolute",
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 6, 6, 8),
      [theme.breakpoints.down("sm")]: {
        width: 300,
        height: 650
      }
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    formControl: {
      width: "100%"
    },
    formControl1: {
      marginLeft: 12,
      marginTop: 5,
      width: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },

    button1: {
      fontSize: "small",
      width: 150
    },
    title: {
      fontSize: 20,
      fontWeight: 600
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  })
);
function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
const CreateProjectModal: React.FC<ICreateProjectModalProps> = (
  props: ICreateProjectModalProps
) => {
  const theme = useTheme();
  const classes = useStyles();
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }
  const handleOpen4 = () => {
    console.log("Paras");
    setOpen4(true);
  };

  const handleClose = () => {
    setOpen4(false);
  };
  const [open4, setOpen4] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [openRate, setOpen5] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [phase, setPhase] = React.useState<string[]>([]);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  const handleClick5 = () => {
    setOpen5(!openRate);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPhase(event.target.value as string[]);
  };
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div style={modalStyle} className={classes.paper1}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={1}>
            <FolderIcon />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="h6" className={classes.title}>
              Create a new project
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        <Grid
          container
          direction="row"
          alignItems="center"
          onClick={e => {
            handleClick();
          }}
        >
          <Grid item xs={10}>
            <Typography variant="h6">Project Details</Typography>
          </Grid>
          <Grid item xs={2}>
            <Grid container direction="row" justify="flex-end">
              {open ? <ExpandLess /> : <ExpandMore />}
            </Grid>
          </Grid>
        </Grid>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid container direction="row" alignItems="flex-end">
            <Grid item xs={10}>
              <TextField
                id="standard-full-width"
                label="Name"
                placeholder="Placeholder"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end">
                <SketchExample
                  displayColorPicker={false}
                  color={{ r: "241", g: "112", b: "19", a: "1" }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Client</InputLabel>
                <Select
                  native
                  onChange={e => {
                    if (e.target.value === "create") {
                      handleOpen4();
                    }
                  }}
                >
                  {" "}
                  <optgroup label="">
                    {/* <option value="" /> */}
                    <option>No Selection</option>
                    <option value="create">Add Client</option>
                  </optgroup>
                  <optgroup label="">
                    {props.clients.map((prop, key) => {
                      console.log(prop);
                      return <option>{prop.name}</option>;
                    })}
                  </optgroup>
                  <AddMember
                    open={open4}
                    handleClose={handleClose}
                    classes={classes}
                  ></AddMember>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Collapse>

        <Divider className={classes.divider} />
        <Grid
          container
          direction="row"
          alignItems="center"
          onClick={e => {
            handleClick1();
          }}
        >
          <Grid item xs={10}>
            <Typography variant="h6">Members</Typography>
          </Grid>
          <Grid item xs={2}>
            <Grid container direction="row" justify="flex-end">
              {open1 ? <ExpandLess /> : <ExpandMore />}
            </Grid>
          </Grid>
        </Grid>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <Grid
            container
            direction="row"
            alignItems="flex-end"
            style={{ marginTop: 18 }}
          >
            <Grid item xs={6}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Members</InputLabel>
                <Select native>
                  {" "}
                  <optgroup label="">
                    {props.project.map((prop, key) => {
                      console.log(prop);
                      return <option>{prop.members.name}</option>;
                    })}
                  </optgroup>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="row" justify="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button1}
                  startIcon={<AddIcon />}
                  onClick={handleClick5}
                >
                  hourly rate
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <Collapse in={openRate} timeout="auto" unmountOnExit>
            <TextField></TextField>
          </Collapse>
        </Collapse>

        <Divider className={classes.divider} />

        <Grid
          container
          direction="row"
          alignItems="center"
          onClick={e => {
            handleClick2();
          }}
        >
          <Grid item xs={10}>
            <Typography variant="h6">Phases </Typography>
          </Grid>
          <Grid item xs={2}>
            <Grid container direction="row" justify="flex-end">
              {open2 ? <ExpandLess /> : <ExpandMore />}
            </Grid>
          </Grid>
        </Grid>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <Grid container direction="row">
            <Grid item xs>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={phase}
                  onChange={handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {(selected as string[]).map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {props.phases.map((prop, key) => (
                    <MenuItem
                      key={prop.name}
                      value={prop.name}
                      style={getStyles(prop.name, phase, theme)}
                    >
                      {prop.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Collapse>

        <Divider className={classes.divider} />
        <Grid
          container
          direction="row"
          alignItems="center"
          onClick={e => {
            handleClick3();
          }}
        >
          <Grid item xs={10}>
            <Typography variant="h6">Budget</Typography>
          </Grid>
          <Grid item xs={2}>
            <Grid container direction="row" justify="flex-end">
              {open3 ? <ExpandLess /> : <ExpandMore />}
            </Grid>
          </Grid>
        </Grid>
        <Collapse in={open3} timeout="auto" unmountOnExit>
          <Grid container direction="row" alignItems="center">
            <Grid item xs>
              <TextField
                id="standard-full-width"
                label="hrs"
                placeholder="Placeholder"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs>
              <FormControl className={classes.formControl1}>
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
            <Grid item xs></Grid>
          </Grid>
        </Collapse>

        <Divider className={classes.divider} />
        <Grid container direction="row" justify="flex-end">
          <Button variant="contained" className={classes.button1}>
            Create
          </Button>
        </Grid>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;
