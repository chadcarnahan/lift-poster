import React from "react";
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Chip,
  makeStyles,
} from "@material-ui/core";
import defaultpic from "../defaultpic.jpeg";

const Comment = ({ liftName, weight, reps, rpe, name }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    name: {
      fontSize: "1rem",
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
    commentBox: {
      zIndex: "1",
      position: "absolute",
      top: "100px",
      margin: "auto",
      backgroundColor: "black",
      borderRadius: "12px",
      width: "100%",
      padding: "1rem",
      maxWidth: "500px",
    },
    divider: {
      marginBottom: "1.5rem",
      width: "100%",
    },
    commentInfo: {},
  }));

  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.container}>
        <Avatar style={{ paddingTop: "5px" }} imgProps={defaultpic} />
        <Box className={classes.details}>
          <Typography variant="h6">{name}: </Typography>
          <Typography variant="subtitle1">5h ago: </Typography>
        </Box>
      </Box>
      <Grid container spacing={1}>
        <Grid item>
          <Chip
            color="primary"
            label={`Lift: ${liftName}`}
            className={classes.name}
          >
            {" "}
          </Chip>
        </Grid>
        <Grid item>
          <Chip label={`Weight: ${weight}Lbs`} className={classes.name}>
            {" "}
          </Chip>
        </Grid>
        <Grid item>
          <Chip label={`Reps: ${reps}`} className={classes.name}>
            {" "}
          </Chip>
        </Grid>
        <Grid item>
          <Chip label={`@ RPE ${rpe}`} className={classes.name}>
            {" "}
            {`@ RPE ${rpe}`}
          </Chip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Comment;
