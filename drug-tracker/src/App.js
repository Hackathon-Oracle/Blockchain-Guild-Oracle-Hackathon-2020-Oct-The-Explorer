import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import ManufacturerDashboard from "./manufacturer/ManufacturerDashboard";
import DistributorDashboard from "./distributor/DistributorDashboard";
import RetailerDashboard from "./retailer/RetailerDashboard";
import TransporterDashboard from "./transporter/TransporterDashboard";
import Login from "./login/Login";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/manufacturer" component={ManufacturerDashboard} />
        <Route path="/distributor" component={DistributorDashboard} />
        <Route path="/retailer" component={RetailerDashboard} />
        <Route path="/transporter" component={TransporterDashboard} />
      </Switch>
    </main>
  );
}
export default App;
