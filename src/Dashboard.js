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
import { Grid, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles, IconButton, Typography, Button } from "@material-ui/core";

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

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "flex-end",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    apiCalls();
  }, [loading, user, feedUpdate]);

  if (!loading) {
    return (
      <ThemeProvider theme={theme}>
        <AppBar position="static" className={classes.root}>
          <Toolbar>
            <Button onClick={() => logout} color="inherit">
              Logout
            </Button>
            <Button
              onClick={() =>
                colorMode === "dark"
                  ? setColorMode("light")
                  : setColorMode("dark")
              }
              color="inherit"
            >
              {" "}
              Dark Mode
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <CssBaseline />
          <Grid item>
            <h2>Home</h2>
          </Grid>
          <Grid item xs={8}>
            <LiftPosting
              user={user}
              name={name.name}
              fontColor={fontColor}
              colorMode={colorMode}
              feedUpdate={feedUpdate}
              setFeedUpdate={setFeedUpdate}
            />
          </Grid>
          <Grid item xs={4}>
            <h2>News Feed</h2>
          </Grid>
          <Grid item xs={12}>
            <Feed user={user} data={data} load={load} />
          </Grid>
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
        </Grid>
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
