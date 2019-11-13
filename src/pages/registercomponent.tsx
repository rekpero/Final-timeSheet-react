import React, { ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Typography, Grid, Button } from "@material-ui/core";

class Register extends React.Component<RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: ""
    };
    console.log("Register");
  }
  render() {
    return (
      <div>
        <Grid
          container
          direction="row"
          alignItems="center"
          style={{ marginTop: "20%" }}
        >
          <Grid container spacing={3} direction="row" justify="center">
            <Grid item xs={6}>
              <Typography variant="h6">Register </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} direction="row" justify="center">
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  this.setState({ username: event.target.value })
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} direction="row" justify="center">
            <Grid item xs={6}>
              <Button variant="contained" size="large" color="primary">
                Signup
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const style = {
  margin: 15
};
// onClick={(event) => this.handleClick(event)}
export default withRouter(Register);
