import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import "./Dashboard.css";
import { ViewPosts } from "./dashboard-components/ViewPost";
import { ThemeProvider } from "@material-ui/styles";
import { auth, db, logout, fetchUserName } from "./firebase";
import LiftPosting from "./dashboard-components/LiftPosting";
import Feed from "./dashboard-components/Feed";
import GridBase from "@material-ui/core/Grid";
import { styled } from "@material-ui/styles";
import {
  createTheme,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";

function Dashview() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState({ name: "", email: "" });
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => Object.assign({ id: doc.id }, doc.data()))
      )
    );
  }, []);
  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserName(setName, user);
  }, [loading, user]);
  const [fontColor, setFontColor] = useState("#B0B3B8");
  const [colorMode, setColorMode] = useState("dark");
  const theme = createTheme({
    palette: {
      type: colorMode,
    },
  });

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

            <Grid itema xs={12}>
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
                  />
                  <Feed user={user} loading={loading} posts={posts} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    );
  } else {
    return (
      <div className="container">
        <div className="loader"></div>
      </div>
    );
  }
}
export default Dashview;
