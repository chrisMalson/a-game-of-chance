import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// current theme is reminiscent of SNES
// TODO: selectable themes based on other retro consoles

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
    info: {
      main: "#b5b6e4",
    },
    background: {
      default: "#f9faf8",
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
