import React from "react";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CloseIcon from "@material-ui/icons/Close";

import {
  Grid,
  Theme,
  Modal,
  Typography,
  Button,
  TextField
} from "@material-ui/core";
import SketchExample from "./color";

interface addMemberState {
  number: boolean[];
}
interface addMemberProps {
  open: boolean;
  handleClose: () => void;
  classes: any;
}

class AddMember extends React.Component<addMemberProps, addMemberState> {
  constructor(props: addMemberProps) {
    super(props);
    this.state = { number: [true, true, true] };
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
    this.state.number[e] = !this.state.number[e];
    return this.setState({ number: this.state.number });
  };
  addRow = () => {
    this.state.number.push(true);
    return this.setState({ number: this.state.number });
  };
  deleteRecord = (e: number) => {
    this.state.number.splice(e, 1);
    return this.setState({ number: this.state.number });
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

          {this.state.number.map((prop, key) => {
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
                        <div>
                          {prop ? (
                            <DeleteOutlineIcon
                              onClick={e => this.handleChange(key)}
                            />
                          ) : (
                            <CloseIcon onClick={e => this.deleteRecord(key)} />
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
        </div>
      </Modal>
    );
  }
}

// onClick={(event) => this.handleClick(event)}
export default AddMember;
