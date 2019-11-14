import React from "react";
import Modal from "@material-ui/core/Modal";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import FolderIcon from "@material-ui/icons/Folder";

import {
  FormControl,
  Select,
  InputLabel,
  Button,
  Grid,
  Typography,
  TextField
} from "@material-ui/core";
import AddMember from "./addmemberclasscomponent";

interface ICreateProjectModalProps {
  open: boolean;
  handleClose: () => void;
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
        width: 200,
        height: 100
      }
    },
    formControl: {
      marginRight: theme.spacing(5),
      width: "100%"
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },

    button1: {
      color: "green",
      marginRight: theme.spacing(0)
    }
  })
);

const CreateProjectModal: React.FC<ICreateProjectModalProps> = (
  props: ICreateProjectModalProps
) => {
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
  const [modalStyle] = React.useState(getModalStyle);

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

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div style={modalStyle} className={classes.paper1}>
        <Typography variant="h4">
          <FolderIcon /> Create a new Project
        </Typography>

        <hr></hr>
        <div
          onClick={e => {
            handleClick();
          }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h6">Project Details</Typography>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end">
                {open ? <ExpandLess /> : <ExpandMore />}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Grid container direction="row">
            <Grid item xs>
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
              />
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item xs={4}></Grid>
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
                <option value="" />
                <option>No Selection</option>
                <option value="create">Add Client</option>
                <AddMember
                  open={open4}
                  handleClose={handleClose}
                  classes={classes}
                ></AddMember>
              </Select>
            </FormControl>
          </Grid>
        </Collapse>
        <hr></hr>
        <div
          onClick={e => {
            handleClick1();
          }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h6">Members</Typography>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end">
                {open1 ? <ExpandLess /> : <ExpandMore />}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <Grid container direction="row">
            <Grid item xs>
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
              />
            </Grid>
          </Grid>
        </Collapse>

        <hr></hr>
        <div
          onClick={e => {
            handleClick2();
          }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h6">Phases </Typography>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end">
                {open2 ? <ExpandLess /> : <ExpandMore />}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <Grid container direction="row">
            <Grid item xs>
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
              />
            </Grid>
          </Grid>
        </Collapse>

        <hr></hr>
        <div
          onClick={e => {
            handleClick3();
          }}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item xs={10}>
              <Typography variant="h6">Budget</Typography>
            </Grid>
            <Grid item xs={2}>
              <Grid container direction="row" justify="flex-end">
                {open3 ? <ExpandLess /> : <ExpandMore />}
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Collapse in={open3} timeout="auto" unmountOnExit>
          <Grid container direction="row">
            <Grid item xs>
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
              />
            </Grid>
          </Grid>
        </Collapse>
        <Grid container direction="row" justify="flex-end"></Grid>
        <Button variant="contained" className={classes.button1}>
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;
