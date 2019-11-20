import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "../App";
import ProjectComponent from "../components/projectcomponent";
import Login from "../pages/logincomponent";
import Register from "../pages/registercomponent";
import Dashboard from "../layout/dashboardcomponent";
import EditProjectComponent from "../components/editprojectcomponent";
import TimesheetComponent from "../components/timesheetcomponent";
import StatusComponent from "../components/statuscomponent";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <App>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/dash" component={Dashboard} />
      </App>
    </Router>
  );
};
export default AppRouter;
