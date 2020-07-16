import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4f43ae",
      contrastText: "#cec9cc",
    },
    secondary: {
      main: "#908a99",
      contrastText: "#211a21",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#b5b6e4",
      paper: "#cec9cc",
    },
    text: {
      primary: "#211a21",
    },
  },
  typography: {
    fontFamily: "monospace",
    h2: {
      fontFamily: "VT323, monospace",
    },
  },
});

export default theme;
