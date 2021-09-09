import React from "react";
import { useState, useEffect } from "react";
import { Container, Grid, Typography, Avatar } from "@material-ui/core";
import { Paper, Card, CardContent, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import defaultpic from "../defaultpic.jpeg";
import "./feed.css";

const Feed = ({ user, data, load, loading }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
    },

    card: {
      display: "flex",

      flexDirection: "column",
      padding: "10px",
      width: "100%",
    },
    name: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      marginRight: "5px",
      fontSize: "10px",
    },
    space: {
      marginRight: "8px",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      textAlign: "center",
      justifyContent: "center",
      backgroundColor: "#BC4639",
      height: "50px",
      marginRight: "10px",
      minWidth: "70px",
      width: "auto",
      borderRadius: "25px",
    },
    container: {
      display: "flex",
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
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12} className={classes.gridItem}>
          {data.map((item) => {
            return (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card variant="outlined" className={classes.card}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CardContent className={classes.name}>
                          <Avatar imgProps={defaultpic}></Avatar>
                          <Container>
                            <Typography variant="h6">{item.name}: </Typography>
                            <Typography variant="subtitle1">
                              5h ago:{" "}
                            </Typography>
                          </Container>
                        </CardContent>
                      </Grid>

                      <Grid item xs={12}>
                        <Container className={classes.container}>
                          <Card className={classes.details}>
                            <Typography variant="button">
                              {" "}
                              {item.liftName}
                            </Typography>
                          </Card>

                          <Card content className={classes.details}>
                            <Typography variant="button">
                              {item.weight} lbs
                            </Typography>
                          </Card>

                          <Card content className={classes.details}>
                            <Typography variant="button">
                              {" "}
                              {item.reps} REPS
                            </Typography>
                          </Card>

                          <Card content className={classes.details}>
                            <Typography variant="button">
                              {" "}
                              RPE {item.rpe}
                            </Typography>
                          </Card>
                        </Container>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
};

export default Feed;
