import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { Grid, Button, TextField, Typography, Box, Paper, Divider } from "@material-ui/core";


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

      <Box px={3}>
          
          <Grid container direction = "row" spacing = {2} alignItems="center">
            <Grid item xs={8} >
            <Grid container direction="row" justify="flex-start" >
              <h3>Workspace Settings</h3>
              </Grid>
            </Grid>
            <Grid item xs={4} >
            <Grid container direction="row" justify="flex-end" >
            <Link to="/dash" className="text-white" style={{textDecoration: 'none'}}>
                <Button variant="contained" size="large" color="primary">
                  Save
                </Button>
              </Link>
              </Grid>
            </Grid>
          </Grid>
          <Paper>
          <Box p={1}>
          <Grid container direction="row">            
            <Grid item xs={3} >
            
              <Box m={2} textAlign="left">
                Currency
                <br/>
                <span style={{ fontSize: "12px" }}>
                  Set up the currency symbol for reports and data exports in your billable projects.
                </span>
              </Box>
                
            </Grid>
            <Grid item xs = {5}>
                <TextField
                  id="standard-basic"
                  label="Currency"
                  margin="normal"
                  onChange={event =>
                    this.setState({ currency: event.target.value })
                  }
                />
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row">
            <Grid item xs={3}>
              
            <Box m={2} textAlign="left">
                Name
                <br/>
                <span style={{ fontSize: "12px" }}>
                  Choose the name that will be displayed for this workspace.
                </span>
                </Box>
                
            </Grid>
            <Grid item xs = {5}>
              <TextField
                id="standard-basic"
                label="Workspace name"
                margin="normal"
                onChange={event => this.setState({ wname: event.target.value })}
              />
            </Grid>
          </Grid>    
          </Box>
          </Paper>
        </Box>
    );
  }
}


export default withRouter(WorkspaceSettingComponent);