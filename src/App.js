import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Reset from "./auth/Reset";
import Dashboard from "./Dashboard";
import ViewPost from "./dashboard-components/ViewPost";

function App() {
  const [posts, setPosts] = useState([]);
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route
            exact
            path="/dashboard"
            render={(routerProps) => {
              return (
                <Dashboard
                  posts={posts}
                  setPosts={setPosts}
                  routerProps={routerProps}
                />
              );
            }}
          />
          <Route
            exact
            path="/dashboard/:id"
            render={(routerProps) => {
              return <ViewPost posts={posts} routerProps={routerProps} />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
