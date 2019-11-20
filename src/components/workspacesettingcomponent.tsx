import React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core";
interface IWorkspaceSettingState {
  currency: string;
  wname: string;
  options: string[];
}
class WorkspaceSettingComponent extends React.Component<
  RouteComponentProps,
  IWorkspaceSettingState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      currency:
        sessionStorage.getItem("currency") !== null
          ? sessionStorage.getItem("currency") + ""
          : "USD",
      wname:
        sessionStorage.getItem("wname") !== null
          ? sessionStorage.getItem("wname") + ""
          : "",
      options: ["USD", "RS"]
    };
  }

  saveSettings = () => {
    sessionStorage.setItem("currency", this.state.currency);
    sessionStorage.setItem("wname", this.state.wname);
  };

  render() {
    return (
      <Box px={3} py={3}>
        <Grid container direction="row" spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Grid container direction="row" justify="flex-start">
              <h3>Workspace Settings</h3>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container direction="row" justify="flex-end">
              <Button
                variant="contained"
                size="large"
                color="primary"
                onClick={this.saveSettings}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Box mt={2}>
          <Paper>
            <Box p={1}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={3}>
                  <Box m={2} textAlign="left">
                    Currency
                    <br />
                    <span style={{ fontSize: "12px" }}>
                      Set up the currency symbol for reports and data exports in
                      your billable projects.
                    </span>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <FormControl>
                    <InputLabel htmlFor="age-native-simple">
                      Currency
                    </InputLabel>
                    <Select
                      native
                      value={this.state.currency}
                      onChange={(event: any) =>
                        this.setState({ currency: event.target.value })
                      }
                    >
                      {this.state.options.map((prop, key) => {
                        return <option value={prop}>{prop}</option>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Divider />
              <Grid container direction="row" alignItems="center">
                <Grid item xs={3}>
                  <Box m={2} textAlign="left">
                    Name
                    <br />
                    <span style={{ fontSize: "12px" }}>
                      Choose the name that will be displayed for this workspace.
                    </span>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    id="standard-basic"
                    label="Workspace name"
                    margin="normal"
                    value={this.state.wname}
                    onChange={event =>
                      this.setState({ wname: event.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>
    );
  }
}

export default withRouter(WorkspaceSettingComponent);
