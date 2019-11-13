import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Grid, Button, TextField } from "@material-ui/core";

class WorkspaceSettingComponent extends React.Component<RouteComponentProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      currency: "",
      wname: ""
    };
  }

  render() {
    return (
      <div>
        <h3 style={{ textAlign: "center" }}> Workspace Settings </h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={2} style={{ float: "left" }}></Grid>
            <Grid item xs={4}>
              <div>
                <h4>Currency</h4>
                <span style={{ fontSize: "11px" }}>
                  Set up the currency symbol for reports and data exports in
                  <br /> your billable projects.
                </span>
              </div>
              <div style={{}}>
                <TextField
                  id="standard-basic"
                  label="Currency"
                  margin="normal"
                  onChange={event =>
                    this.setState({ currency: event.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <h4>Name</h4>
                <span style={{ fontSize: "11px" }}>
                  Choose the name that will be displayed for this workspace.
                </span>
              </div>
              <br></br>
              <TextField
                id="standard-basic"
                label="Workspace name"
                margin="normal"
                onChange={event => this.setState({ wname: event.target.value })}
              />
            </Grid>
            <Grid item xs={2} style={{ float: "right" }}></Grid>
            <Grid item xs={12}>
              <br />
              <br />
              <Link to="/dash" className="text-white">
                <Button variant="contained" size="large" color="primary">
                  Save
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15
};

export default withRouter(WorkspaceSettingComponent);
