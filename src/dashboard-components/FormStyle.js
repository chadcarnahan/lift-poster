import react from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme, colorMode) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    border: "1px RGB(149, 152, 157, 0.25)solid",
    padding: "20px",
    color: theme.palette.text.secondary,
    justifyContent: "center",
    "& .MuiInputBase-root": {
      height: 50,
      width: "95%",
      fontSize: "1em",
    },
    "& .MuiFormLabel-root": {
      width: "90%",
      fontSize: "1em",
    },
    "& .MuiTypography-root": {
      width: "50%",
      fontSize: "1em",
    },
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "20%",
  },
  textBox: {
    width: "30%",
    marginBottom: theme.spacing(1),
  },

  textEnd: {
    width: "20%",
  },
  button: {
    marginTop: "10px",
    alignItems: "right",
  },
}));

export default useStyles;
