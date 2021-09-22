import React from "react";
import UserPosts from "./UserPosts";
import { makeStyles, Box } from "@material-ui/core";
import "./feed.css";

const Feed = ({ user, posts }) => {
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
  }));
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      className={classes.root}
    >
      {posts.map(
        ({ description, liftName, likes, name, reps, rpe, weight, id }) => (
          <UserPosts
            key={id}
            description={description}
            weight={weight}
            liftName={liftName}
            name={name}
            reps={reps}
            rpe={rpe}
            likes={likes}
            user={user}
            id={id}
          />
        )
      )}
    </Box>
  );
};

export default Feed;
