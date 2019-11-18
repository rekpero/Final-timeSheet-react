import React, { ChangeEvent } from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Grid, Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

class Login extends React.Component<RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <div>
        <div>
          <Grid
            container
            spacing={3}
            justify="center"
            style={{ marginTop: "10%" }}
          >
            <Grid item xs={6}>
              <Typography variant="h6">Login</Typography>
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
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
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
              <Link to="/dash/dashboard" className="text-white">
                <Button variant="contained" size="large" color="primary">
                  Login
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
        <span>
          New to here?{" "}
          <Link to="/register" className="text-white">
            Register
          </Link>
        </span>
      </div>
    );
  }
}
const style = {
  margin: 15
};

// onClick={(event) => this.handleClick(event)}
export default withRouter(Login);
