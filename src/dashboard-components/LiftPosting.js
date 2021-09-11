import React from "react";
import { newPost } from "../firebase";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import useStyles from "./FormStyle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Grid } from "@material-ui/core";
import { useState } from "react";
const LiftPosting = ({ user, name, colorMode, feedUpdate, setFeedUpdate }) => {
  const schema = yup.object().shape({
    description: yup.string(),
    liftName: yup.string().required("Field Required"),
    weight: yup.number().typeError("Must be Digits").required(),
    reps: yup.number().typeError("Must be digits").required().max(99),
    rpe: yup.number().typeError("Must be Digits").required(),
  });
  const [displayPost, setDisplayPost] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data.rpe, null, 2));
    const { description, liftName, weight, reps, rpe } = data;
    newPost(user, name, description, liftName, weight, reps, rpe);
    reset();
    setFeedUpdate(!feedUpdate);
  };

  const classes = useStyles(colorMode);
  return (
    <Box display="flex" direction="column" justifyContent="center" width={1}>
      <Grid container justifyContent="center" className={classes.root}>
        <form>
          <Grid item xs={12}>
            <TextField
              color="primary"
              onClick={() => setDisplayPost(true)}
              required
              fullWidth
              rows={6}
              id="description"
              name="description"
              placeholder={`Lift Description ${
                displayPost ? "(Optional)" : ""
              }`}
              {...register("description")}
              multiline
              style={{ padding: 15 }}
              margin="normal"
              InputProps={{
                shrink: true,
                className: classes.input,
              }}
            />
          </Grid>

          {displayPost === true ? (
            <Box>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  {...register("liftName")}
                  label="Lift name"
                  error={errors.liftName ? true : false}
                  className={classes.textBox}
                  helperText={errors.liftName?.message}
                  InputProps={{
                    className: classes.input,
                  }}
                  InputLabelProps={{
                    className: classes.input,
                  }}
                />

                <TextField
                  {...register("weight")}
                  error={errors.weight ? true : false}
                  className={classes.textField}
                  variant="outlined"
                  helperText={errors.weight?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Lb</InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    className: classes.input,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("reps")}
                  className={classes.textField}
                  error={errors.reps ? true : false}
                  variant="outlined"
                  helperText={errors.reps?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Reps</InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    className: classes.input,
                  }}
                />
                <TextField
                  variant="outlined"
                  {...register("rpe")}
                  inputText
                  className={classes.textEnd}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">RPE</InputAdornment>
                    ),
                  }}
                  error={errors.rpe ? true : false}
                  helperText={errors.rpe?.message}
                />
              </Grid>
              <Box className="right-align">
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<Icon>send</Icon>}
                  onClick={handleSubmit(onSubmit)}
                >
                  Post
                </Button>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </form>
      </Grid>
    </Box>
  );
};

export default LiftPosting;
