import React from "react";
import Comment from "./Comment";
import { useState } from "react";
import { newComment } from "../firebase";
import CloseIcon from "@material-ui/icons/Close";
import { Box, Grid, Button, Divider, TextField } from "@material-ui/core";
const ReplyComment = ({
  classes,
  setCommentToggle,
  liftName,
  weight,
  reps,
  rpe,
  name,
  id,
  user,
}) => {
  const [comment, setComment] = useState("");
  const postComment = (e) => {
    e.stopPropagation();
    e.preventDefault();
    newComment(id, user.uid, comment);
    setComment("");
    setCommentToggle(false);
  };

  return (
    <Box className={classes.commentBox}>
      <Grid>
        <Box>
          <Button onClick={() => setCommentToggle(false)}>
            <CloseIcon color={"inherit"} />
          </Button>
        </Box>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>
        <Grid item xs={12}>
          <Comment
            className={classes.commentInfo}
            liftName={liftName}
            weight={weight}
            reps={reps}
            rpe={rpe}
            name={name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            color="primary"
            required
            fullWidth
            onChange={(e) => {
              setComment(e.target.value);
            }}
            rows={3}
            id="description"
            name="description"
            placeholder={"Reply"}
            multiline
            style={{ padding: 15 }}
            margin="normal"
            InputProps={{
              shrink: true,
              className: classes.input,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={(e) => postComment(e)} color="primary">
              Reply
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReplyComment;
