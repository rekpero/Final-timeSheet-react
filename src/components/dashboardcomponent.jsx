import React from "react";
import moment, { Moment } from "moment";
import Timesheet from "./timesheetcomponents/jsx/timesheet";
import "./timesheetcomponents/styles/normalize.css";
import "./timesheetcomponents/styles/rc-tooltip.css";
import "./timesheetcomponents/styles/react-select.css";
import "./timesheetcomponents/styles/style.css";
import "./timesheetcomponents/styles/vendor.css";
import { Grid } from "@material-ui/core";



export default class DashboardComponent extends React.Component {
  state = {
    schedules: {
      'Monday': [{
        start: moment('10:00 am', 'hh:mm a'),
        end: moment('11:30 am', 'hh:mm a'),
        data: {
          subject: {
            id: 1,
            name: moment.utc(moment('11:30 am', 'hh:mm a').diff(moment('10:00 am', 'hh:mm a'))).format("HH:mm")
          },

          professor: {
            id: 2,
            name: 'Accounting'
          },

          section: {
            id: 1,
            name: 'Project AT&T'
          }
        }
      }],
      'Tuesday': [],
      'Wednesday': [],
      'Thursday': [{
        start: moment('10:00 am', 'hh:mm a'),
        end: moment('1:00 pm', 'hh:mm a'),
        data: {
          subject: {
            id: 1,
            name: moment.utc(moment('1:00 pm', 'hh:mm a').diff(moment('10:00 am', 'hh:mm a'))).format("HH:mm")
          },

          professor: {
            id: 2,
            name: 'Accounting'
          },

          section: {
            id: 1,
            name: 'Project AT&T'
          }
        }
      }],
      'Friday': [],
      'Saturday': [{
        start: moment('10:00 am', 'hh:mm a'),
        end: moment('1:00 pm', 'hh:mm a'),
        data: {
          subject: {
            id: 1,
            name: moment.utc(moment('1:00 pm', 'hh:mm a').diff(moment('10:00 am', 'hh:mm a'))).format("HH:mm")
          },

          professor: {
            id: 2,
            name: 'Accounting'
          },

          section: {
            id: 1,
            name: 'Project AT&T'
          }
        }
      }],
      'Sunday': []
    }
  };

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Timesheet
          request={false}
          requester={{
            id: 1,
            department: {
              name: 'CSIT'
            },
            user: {
              name: 'Winner Gatchalian'
            }
          }}
          time={{
            start: '10:00 AM',
            end: '10:00 PM',
            increment: { hours: 1, minutes: 30 }
          }}
          schedules={this.state.schedules}
          sections={[{
            value: 1,
            label: 'Hello'
          }]}
          subjects={[{
            value: 1,
            label: 'Hello'
          }]}
          professors={[{
            value: 1,
            label: 'Hello'
          }]}
          onStore={this.handleStore}
          onUpdate={this.handleUpdate}
          onDelete={this.handleDelete}
          onRequestAction={this.handleRequestAction} />
        </Grid>
    );
  }

  handleStore = (day, schedule) => {
    const {schedules} = this.state;

    this.setState({
      schedules: {
        ...schedules,
        [day]: [...schedules[day], schedule]
      }
    });
  }

  handleUpdate = (day, index, schedule, dest = day) => {
    const {schedules} = this.state;

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
  }

  handleRequestAction = (day, index, action) => {
    const {schedules} = this.state;

    if (action) {
      this.setState({
        schedules: {
          ...schedules,
          [day]: schedules[day].map((schedule, i) => {
            return i === index ? {
              ...schedule,
              request: false,
              requester: null
            } : schedule;
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
  }

  handleDelete = (day, index) => {

      
    const {schedules} = this.state;
    
    this.setState({
      schedules: {
        ...schedules,
        [day]: schedules[day].filter((schedule, i) => {
          return i !== index;
        })
      }
    });
  }
}
