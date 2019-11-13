import React from "react";
import Modal from "@material-ui/core/Modal";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CloseIcon from "@material-ui/icons/Close";
import { Grid, Typography, Button, TextField } from "@material-ui/core";
import SketchExample from "./color";

interface IAddMemberModalProps {
  open: boolean;
  handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper1: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 6, 6, 8),
      [theme.breakpoints.down("sm")]: {
        width: 200,
        height: 100
      }
    },

    selectEmpty: {
      marginTop: theme.spacing(2)
    },

    button: {
      margin: theme.spacing(3)
    }
  })
);

const AddMemberModal: React.FC<IAddMemberModalProps> = (
  props: IAddMemberModalProps
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
  var [number, setArray] = React.useState([true, true, true]);
  const [modalStyle] = React.useState(getModalStyle);

  const handleChange = (e: number) => {
    number[e] = !number[e];
    setArray(number);
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
          <Grid item xs={2}>
            <PeopleOutlineIcon />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="h6">Manage Clients</Typography>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" size="small">
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

        {number.map((prop, key) => {
          console.log(prop);
          console.log(key);
          return (
            <div>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={2}>
                  <SketchExample
                    displayColorPicker={false}
                    color={{ r: "241", g: "112", b: "19", a: "1" }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField id="standard-uncontrolled" />
                </Grid>

                <Grid item xs={5}>
                  <Grid container direction="row" spacing={2}>
                    <Grid item xs>
                      0
                    </Grid>
                    <Grid item xs>
                      <div onClick={e => handleChange(key)}>
                        {prop ? <DeleteOutlineIcon /> : <CloseIcon />}
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br></br>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default AddMemberModal;
