import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import Dashboard from "../layout/dashboardcomponent";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <App>
        <Route path="/" exact render={() => <Redirect to="/dash" />} />
        <Route path="/dash" component={Dashboard} />
      </App>
    </Router>
  );
};
export default AppRouter;
