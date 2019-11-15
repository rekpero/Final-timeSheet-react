import React from "react";
import moment, { Moment } from "moment";
import Timesheet from "./timesheetcomponents/jsx/timesheet";
import "./timesheetcomponents/styles/normalize.css";
import "./timesheetcomponents/styles/rc-tooltip.css";
import "./timesheetcomponents/styles/react-select.css";
import "./timesheetcomponents/styles/style.css";
import "./timesheetcomponents/styles/vendor.css";
import { Grid, Box, Typography, ButtonGroup, Button } from "@material-ui/core";
import ProjectService from "../services/projectService";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export default class DashboardComponent extends React.Component {
  state = {
    schedules: {
      ["Mon " + (moment().date() - moment().day() + 1)]: [
        // {
        //   start: moment("10:00 am", "hh:mm a"),
        //   end: moment("11:30 am", "hh:mm a"),
        //   data: {
        //     professor: {
        //       name: "Accounting"
        //     },
        //     section: {
        //       name: "Project AT&T"
        //     }
        //   }
        // }
      ],
      ["Tue " + (moment().date() - moment().day() + 2)]: [],
      ["Wed " + (moment().date() - moment().day() + 3)]: [],
      ["Thur " + (moment().date() - moment().day() + 4)]: [
        // {
        //   start: moment("10:00 am", "hh:mm a"),
        //   end: moment("1:00 pm", "hh:mm a"),
        //   data: {
        //     professor: {
        //       name: "Accounting"
        //     },
        //     section: {
        //       name: "Project AT&T"
        //     }
        //   }
        // }
      ],
      ["Fri " + (moment().date() - moment().day() + 5)]: [
        // {
        //   start: moment("10:00 am", "hh:mm a"),
        //   end: moment("1:00 pm", "hh:mm a"),
        //   data: {
        //     professor: {
        //       name: "Accounting"
        //     },
        //     section: {
        //       name: "Project AT&T"
        //     }
        //   }
        // }
      ]
    }
  };

  componentDidMount() {
    ProjectService.getTimeSheetData().subscribe(timesheets => {
      // console.log(
      //   moment()
      //     .subtract(moment().day() - 7, "days")
      //     .toString()
      // );
      const monday = timesheets.filter(time => {
        return moment(time.date, "YYYY-MM-DD").isSame(
          moment().subtract(moment().day() - 1, "days"),
          "day"
        );
      });
      const tuesday = timesheets.filter(time => {
        return moment(time.date, "YYYY-MM-DD").isSame(
          moment().subtract(moment().day() - 2, "days"),
          "day"
        );
      });
      const wednesday = timesheets.filter(time => {
        return moment(time.date, "YYYY-MM-DD").isSame(
          moment().subtract(moment().day() - 3, "days"),
          "day"
        );
      });
      const thursday = timesheets.filter(time => {
        return moment(time.date, "YYYY-MM-DD").isSame(
          moment().subtract(moment().day() - 4, "days"),
          "day"
        );
      });
      const friday = timesheets.filter(time => {
        return moment(time.date, "YYYY-MM-DD").isSame(
          moment().subtract(moment().day() - 5, "days"),
          "day"
        );
      });
      const saturday = timesheets.filter(time => {
        return moment(time.date, "YYYY-MM-DD").isSame(
          moment().subtract(moment().day() - 6, "days"),
          "day"
        );
      });
      const sunday = timesheets.filter(time => {
        return moment(time.date, "YYYY-MM-DD").isSame(
          moment().subtract(moment().day() - 7, "days"),
          "day"
        );
      });
      this.setState(
        {
          schedules: {
            ["Mon " + (moment().date() - moment().day() + 1)]:
              monday.length === 0
                ? []
                : monday.map((time, index) => {
                    return {
                      start: moment("10:00 am", "hh:mm a").add(
                        monday.filter((val, i) => i < index).length === 0
                          ? 0
                          : monday
                              .filter((val, i) => i < index)
                              .map(time => time.timeWorked)
                              .reduce(
                                (prev, curr) =>
                                  prev.timeWorked + curr.timeWorked
                              ),
                        "m"
                      ),
                      end: moment("10:00 am", "hh:mm a")
                        .add(
                          monday.filter((val, i) => i < index).length === 0
                            ? 0
                            : monday
                                .filter((val, i) => i < index)
                                .map(time => time.timeWorked)
                                .reduce(
                                  (prev, curr) =>
                                    prev.timeWorked + curr.timeWorked
                                ),
                          "m"
                        )
                        .add(time.timeWorked, "m"),
                      data: {
                        phase: { name: time.phases },
                        project: { name: time.project.name },
                        note: { name: time.note },
                        timesheetId: time.id
                      }
                    };
                  }),
            ["Tue " + (moment().date() - moment().day() + 2)]:
              tuesday.length === 0
                ? []
                : tuesday.map((time, index) => {
                    return {
                      start: moment("10:00 am", "hh:mm a").add(
                        monday.filter((val, i) => i < index).length === 0
                          ? 0
                          : monday
                              .filter((val, i) => i < index)
                              .map(time => time.timeWorked)
                              .reduce(
                                (prev, curr) =>
                                  prev.timeWorked + curr.timeWorked
                              ),
                        "m"
                      ),
                      end: moment("10:00 am", "hh:mm a")
                        .add(
                          monday.filter((val, i) => i < index).length === 0
                            ? 0
                            : monday
                                .filter((val, i) => i < index)
                                .map(time => time.timeWorked)
                                .reduce(
                                  (prev, curr) =>
                                    prev.timeWorked + curr.timeWorked
                                ),
                          "m"
                        )
                        .add(time.timeWorked, "m"),
                      data: {
                        phase: { name: time.phases },
                        project: { name: time.project.name },
                        note: { name: time.note },
                        timesheetId: time.id
                      }
                    };
                  }),
            ["Wed " + (moment().date() - moment().day() + 3)]:
              wednesday.length === 0
                ? []
                : wednesday.map((time, index) => {
                    return {
                      start: moment("10:00 am", "hh:mm a").add(
                        monday.filter((val, i) => i < index).length === 0
                          ? 0
                          : monday
                              .filter((val, i) => i < index)
                              .map(time => time.timeWorked)
                              .reduce(
                                (prev, curr) =>
                                  prev.timeWorked + curr.timeWorked
                              ),
                        "m"
                      ),
                      end: moment("10:00 am", "hh:mm a")
                        .add(
                          monday.filter((val, i) => i < index).length === 0
                            ? 0
                            : monday
                                .filter((val, i) => i < index)
                                .map(time => time.timeWorked)
                                .reduce(
                                  (prev, curr) =>
                                    prev.timeWorked + curr.timeWorked
                                ),
                          "m"
                        )
                        .add(time.timeWorked, "m"),
                      data: {
                        phase: { name: time.phases },
                        project: { name: time.project.name },
                        note: { name: time.note },
                        timesheetId: time.id
                      }
                    };
                  }),
            ["Thurs " + (moment().date() - moment().day() + 2)]:
              thursday.length === 0
                ? []
                : thursday.map((time, index) => {
                    return {
                      start: moment("10:00 am", "hh:mm a").add(
                        monday.filter((val, i) => i < index).length === 0
                          ? 0
                          : monday
                              .filter((val, i) => i < index)
                              .map(time => time.timeWorked)
                              .reduce(
                                (prev, curr) =>
                                  prev.timeWorked + curr.timeWorked
                              ),
                        "m"
                      ),
                      end: moment("10:00 am", "hh:mm a")
                        .add(
                          monday.filter((val, i) => i < index).length === 0
                            ? 0
                            : monday
                                .filter((val, i) => i < index)
                                .map(time => time.timeWorked)
                                .reduce(
                                  (prev, curr) =>
                                    prev.timeWorked + curr.timeWorked
                                ),
                          "m"
                        )
                        .add(time.timeWorked, "m"),
                      data: {
                        phase: { name: time.phases },
                        project: { name: time.project.name },
                        note: { name: time.note },
                        timesheetId: time.id
                      }
                    };
                  }),
            ["Fri " + (moment().date() - moment().day() + 2)]:
              friday.length === 0
                ? []
                : friday.map((time, index) => {
                    return {
                      start: moment("10:00 am", "hh:mm a").add(
                        monday.filter((val, i) => i < index).length === 0
                          ? 0
                          : monday
                              .filter((val, i) => i < index)
                              .map(time => time.timeWorked)
                              .reduce(
                                (prev, curr) =>
                                  prev.timeWorked + curr.timeWorked
                              ),
                        "m"
                      ),
                      end: moment("10:00 am", "hh:mm a")
                        .add(
                          monday.filter((val, i) => i < index).length === 0
                            ? 0
                            : monday
                                .filter((val, i) => i < index)
                                .map(time => time.timeWorked)
                                .reduce(
                                  (prev, curr) =>
                                    prev.timeWorked + curr.timeWorked
                                ),
                          "m"
                        )
                        .add(time.timeWorked, "m"),
                      data: {
                        phase: { name: time.phases },
                        project: { name: time.project.name },
                        note: { name: time.note },
                        timesheetId: time.id
                      }
                    };
                  })
          }
        },
        () => console.log(this.state.schedules)
      );
    });
  }

  render() {
    return (
      <Grid container direction="row" justify="center">
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <Grid container direction="row" justify="flex-start">
              <Box my={3} mx={5}>
                <Typography variant="h5">
                  {moment().format("MMMM")} {moment().format("YYYY")}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
            >
              <Box my={3} mx={5}>
                <ButtonGroup
                  variant="contained"
                  size="small"
                  aria-label="small contained button group"
                >
                  <Button>
                    <ArrowBackIosIcon fontSize="medium"></ArrowBackIosIcon>
                  </Button>
                  <Button>Today</Button>
                  <Button>
                    <ArrowForwardIosIcon fontSize="medium"></ArrowForwardIosIcon>
                  </Button>
                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Timesheet
            request={false}
            requester={{
              id: 1,
              department: {
                name: "CSIT"
              },
              user: {
                name: "Winner Gatchalian"
              }
            }}
            time={{
              start: "10:00 AM",
              end: "10:00 PM",
              increment: { hours: 1, minutes: 0 }
            }}
            schedules={this.state.schedules}
            onStore={this.handleStore}
            onUpdate={this.handleUpdate}
            onDelete={this.handleDelete}
            setTimer={this.setTimer}
            onRequestAction={this.handleRequestAction}
          />
        </Grid>
      </Grid>
    );
  }

  setTimer = (day, index) => {
    const hours = Number.parseInt(
      moment
        .utc(
          this.state.schedules[day][index].end.diff(
            this.state.schedules[day][index].start
          )
        )
        .format("HH")
    );
    const minutes = Number.parseInt(
      moment
        .utc(
          this.state.schedules[day][index].end.diff(
            this.state.schedules[day][index].start
          )
        )
        .format("mm")
    );
    const timesheet = {
      id: this.state.schedules[day][index].data.timesheetId,
      project: this.state.schedules[day][index].data.project.name,
      phase: this.state.schedules[day][index].data.phase.name
    };
    console.log(hours, minutes, timesheet, true);
    this.props.setTimer(hours, minutes, timesheet, true);
  };

  handleStore = (day, schedule) => {
    const { schedules } = this.state;

    this.setState({
      schedules: {
        ...schedules,
        [day]: [...schedules[day], schedule]
      }
    });
  };

  handleUpdate = (day, index, schedule, dest = day) => {
    const { schedules } = this.state;

    if (dest === day) {
      this.setState({
        schedules: {
          ...schedules,
          [day]: schedules[day].map((_, i) => {
            return i === index ? schedule : _;
          })
        }
      });
    } else {
      this.setState({
        schedules: {
          ...schedules,
          [day]: schedules[day].filter((_, i) => i !== index),
          [dest]: [...schedules[dest], schedule]
        }
      });
    }
  };

  handleRequestAction = (day, index, action) => {
    const { schedules } = this.state;

    if (action) {
      this.setState({
        schedules: {
          ...schedules,
          [day]: schedules[day].map((schedule, i) => {
            return i === index
              ? {
                  ...schedule,
                  request: false,
                  requester: null
                }
              : schedule;
          })
        }
      });
    } else {
      this.setState({
        schedules: {
          ...schedules,
          [day]: schedules[day].filter((schedule, i) => {
            return i !== index;
          })
        }
      });
    }
  };

  handleDelete = (day, index) => {
    const { schedules } = this.state;

    this.setState({
      schedules: {
        ...schedules,
        [day]: schedules[day].filter((schedule, i) => {
          return i !== index;
        })
      }
    });
  };
}
