import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  Grid,
  TextField,
  Box,
  Paper,
  Divider,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import { IProjectInfo } from "../model/project";
import { IClientInfo } from "../model/clients";

interface IInfoProjectProps {
  project: IProjectInfo;
  client: IClientInfo;
}
interface IInfoProjectState {
  pname: string;
  description: string;
  client: string;
  budget: number;
}
class InfoProjectComponent extends React.Component<
  IInfoProjectProps,
  IInfoProjectState
> {
  constructor(props: IInfoProjectProps) {
    super(props);
    this.state = {
      pname: "",
      description: "",
      client: "",
      budget: 0
    };
  }

  componentDidUpdate() {
    if (
      this.props.project !== undefined &&
      this.props.client !== undefined &&
      this.state.pname === "" &&
      this.state.client === "" &&
      this.state.budget === 0
    ) {
      this.setState({
        pname: this.props.project.name,
        client: this.props.client.name,
        budget: this.props.project.budget
      });
    }
  }

  render() {
    return (
      <Box px={10}>
        <Paper>
          <Box p={1}>
            <Grid container direction="row">
              <Grid item xs={4}>
                <Box m={2} textAlign="left">
                  Basic Info
                  <br />
                  <span style={{ fontSize: "12px" }}>
                    Set a name and a description for your project.
                  </span>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="standard-basic"
                  label="Name"
                  margin="normal"
                  style={{ width: "300px" }}
                  value={this.state.pname}
                  onChange={event =>
                    this.setState({ pname: event.target.value })
                  }
                />{" "}
                <br />
                <TextField
                  id="standard-basic"
                  label="Description"
                  margin="normal"
                  style={{ width: "300px" }}
                  value={this.state.description}
                  onChange={event =>
                    this.setState({ description: event.target.value })
                  }
                />
              </Grid>
            </Grid>
            <br />
            <br />
            <Divider />
            <Grid container direction="row">
              <Grid item xs={4}>
                <Box m={2} textAlign="left">
                  Additional Info
                  <br />
                  <span style={{ fontSize: "12px" }}>
                    Set up a client, a budget and the budget recurrence for the
                    project.
                  </span>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="standard-basic"
                  label="Client"
                  margin="normal"
                  style={{ width: "300px" }}
                  value={this.state.client}
                  onChange={event =>
                    this.setState({ client: event.target.value })
                  }
                />{" "}
                <br />
                <TextField
                  id="standard-basic"
                  label="Budget"
                  margin="normal"
                  style={{ width: "300px" }}
                  value={this.state.budget}
                  onChange={event =>
                    this.setState({
                      budget: Number.parseInt(event.target.value)
                    })
                  }
                />{" "}
                <br /> <br />
              </Grid>
            </Grid>
            <br />
            <br />
          </Box>
        </Paper>
      </Box>
    );
  }
}

export default InfoProjectComponent;
