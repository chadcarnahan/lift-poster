import React from "react";
import { useState, useEffect } from "react";
import { Container, Grid, Typography, Avatar, Box } from "@material-ui/core";
import { Paper, Card, CardContent, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import defaultpic from "../defaultpic.jpeg";
import "./feed.css";

const Feed = ({ user, data, load, loading }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    name: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignContent: "center",
      paddingRight: "10px",
      fontSize: "20px",
    },

    details: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "8px",
      paddingRight: "10px",
    },
    container: {
      display: "flex",
      paddingLeft: "10px",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    box: {
      width: "100%",
      padding: "12px",
      justifyContent: "center",

      border: "1px RGB(149, 152, 157, 0.25)solid",
    },
  }));
  const classes = useStyles();

  if (!loading) {
    console.log(data);
  }
  if (load) {
    return <h1>loading</h1>;
  } else {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        className={classes.root}
      >
        {data.map((item) => {
          return (
            <Box className={classes.box}>
              <Box className={classes.container}>
                <Avatar style={{ paddingTop: "5px" }} imgProps={defaultpic} />
                <Box className={classes.details}>
                  <Typography variant="h6">{item.name}: </Typography>
                  <Typography variant="subtitle1">5h ago: </Typography>
                </Box>
              </Box>

              <Box className={classes.container}>
                <Typography className={classes.name}>
                  {" "}
                  {`${item.weight}Lb`}
                </Typography>
                <Typography className={classes.name}>
                  {" "}
                  {`${item.liftName}`}
                </Typography>
                <Typography className={classes.name}>
                  {" "}
                  {`X ${item.reps} Reps`}
                </Typography>
                <Typography className={classes.name}>
                  {" "}
                  {`@ RPE ${item.rpe}`}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    );
  }
};

export default Feed;
