import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Reset from "./auth/Reset";
import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";
import { fetchPosts } from "./firebase";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
