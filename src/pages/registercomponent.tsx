import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React from "react";

import { withRouter, RouteComponentProps, Link } from "react-router-dom";
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
        <MuiThemeProvider>
          <div>
            <h1>Register </h1>

            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) =>
                this.setState({ username: newValue })
              }
            />

            <RaisedButton label="Register" primary={true} style={style} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};
// onClick={(event) => this.handleClick(event)}
export default withRouter(Register);
