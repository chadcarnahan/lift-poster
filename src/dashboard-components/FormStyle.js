import react from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme, colorMode) => ({
  root: {
    display: "flex",
    borderBottom: "1px RGB(149, 152, 157, 0.25)solid",
    padding: "20px",
    maxWidth: "500px",
    color: theme.palette.text.primary,
    justifyContent: "center",
    "& .MuiInputBase-root": {
      height: 50,
      width: "100%",
      fontSize: "1rem",
    },
    "& .MuiFormLabel-root": {
      width: "90%",
      fontSize: "1rem",
    },
    "& .MuiTypography-root": {
      width: "50%",
      fontSize: "1rem",
    },
  },

  textField: {
    width: "47.5%",
  },
  textBox: {
    width: "47.5%",
    marginBottom: theme.spacing(1),
  },

  textEnd: {
    width: "47.5%",
  },
  button: {
    marginTop: "10px",
    alignItems: "right",
  },
}));

export default useStyles;
