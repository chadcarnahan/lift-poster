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
import { Grid, Container, Box, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles, IconButton, Typography, Button } from "@material-ui/core";
import GridBase from "@material-ui/core/Grid";
import { styled } from "@material-ui/styles";

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
      marginRight: "0",
    },
    menuButton: {
      paddingRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const Grid = styled(GridBase)`
    .MuiGrid-root {
      flex-grow: 1;
    }
  `;

  const classes = useStyles();
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    apiCalls();
  }, [loading, user, feedUpdate]);

  if (!loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container width={1} margin="none" justifyContent="center">
            <Grid item xs={12}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                    Home
                  </Typography>
                  <Button onClick={() => logout()} color="inherit">
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
            </Grid>

            <Grid item xs={12}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  width={1}
                  style={{
                    maxWidth: "500px",
                    border: "1px RGB(149, 152, 157, 0.25)solid",
                  }}
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <LiftPosting
                    user={user}
                    name={name.name}
                    fontColor={fontColor}
                    colorMode={colorMode}
                    feedUpdate={feedUpdate}
                    setFeedUpdate={setFeedUpdate}
                  />

                  <Box
                    display="flex"
                    textAlign="center"
                    justifyContent="center"
                  >
                    <Typography variant="h2">News Feed</Typography>
                  </Box>

                  <Feed user={user} data={data} load={load} />
                </Box>
              </Box>
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
