import React from "react";
import Modal from "@material-ui/core/Modal";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { Grid, Typography } from "@material-ui/core";

interface IEnteriesModalProps {
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

const EnteriesModal: React.FC<IEnteriesModalProps> = (
  props: IEnteriesModalProps
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
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.open}
      onClose={props.handleClose}
    >
      <div style={modalStyle} className={classes.paper1}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <CheckCircleOutlineIcon />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h6">Manage Clients</Typography>
          </Grid>
        </Grid>
        <hr></hr>
      </div>
    </Modal>
  );
};

export default EnteriesModal;
