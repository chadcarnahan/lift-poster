import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { auth, db, logout, fetchUserName } from "./firebase";
import { CssBaseline } from "@material-ui/core";
import LiftPosting from "./dashboard-components/LiftPosting";
import Feed from "./dashboard-components/Feed";
import { fetchPosts } from "./firebase";

function Dashboard() {
  const [fontColor, setFontColor] = useState("#B0B3B8");
  const [user, loading, error] = useAuthState(auth);
  const [colorMode, setColorMode] = useState("dark");
  const [name, setName] = useState({ name: "", email: "" });
  const [feedUpdate, setFeedUpdate] = useState(false);
  const history = useHistory();
  const theme = createTheme({
    palette: {
      type: colorMode,
    },
  });
  const [load, setLoad] = useState(true);
  const [data, setData] = useState("");
  const apiCalls = async () => {
    await fetchUserName(setName, user);
    await fetchPosts(setData, setLoad);
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    apiCalls();
  }, [loading, user, feedUpdate]);

  if (!loading) {
    return (
      <ThemeProvider theme={theme}>
        <div className="container">
          <div class="center">
            <CssBaseline />
            <h2>Home</h2>
            <LiftPosting
              user={user}
              name={name.name}
              fontColor={fontColor}
              colorMode={colorMode}
              feedUpdate={feedUpdate}
              setFeedUpdate={setFeedUpdate}
            />
            <Feed user={user} data={data} load={load} />
            {/* <button className="dashboard__btn" onClick={logout}>
          Logout
        </button> */}
            {/* <button
              className="btn"
              onClick={() =>
                colorMode === "dark"
                  ? setColorMode("light")
                  : setColorMode("dark")
              }
            >
              change theme
            </button> */}
          </div>
        </div>
      </ThemeProvider>
    );
  } else {
    return (
      <div className="container">
        <div class="loader"></div>
      </div>
    );
  }
}
export default Dashboard;
