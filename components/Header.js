import {
  AppBar,
  Button,
  Grid,
  Link as MaterialLink,
  Popover,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Link from "next/link";
import { useState } from "react";

import AuthIndex from "./AuthIndex";
import SearchForm from "./SearchForm";
import { useUser } from "../utils/auth/useUser";

const useStyles = makeStyles((theme) => ({
  accountIcon: {
    color: theme.palette.common.white,
  },
  accountWrapper: {
    order: 2,
    alignSelf: "center",

    ["@media(min-width:793px)"]: {
      order: 3,
    },
  },
  headerBar: {
    padding: theme.spacing(0.5),
    paddingBottom: theme.spacing(1.5),
  },
  formWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    order: 3,

    ["@media(min-width:793px)"]: {
      order: 2,
    },
  },
  title: {
    color: theme.palette.common.white,
    fontSize: "1.5rem",
    paddingTop: "0.5ex",
    alignSelf: "center",
    "&:hover": {
      cursor: "pointer",
    },
    ["@media(min-width:400px)"]: {
      fontSize: "2rem",
    },
  },
  titleWrapper: {
    order: 1,
  },
}));

// TODO: move popover logic into AuthIndex component

// this is a header...
const Header = () => {
  const { user } = useUser();
  const {
    accountIcon,
    accountWrapper,
    formWrapper,
    headerBar,
    title,
    titleWrapper,
  } = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  // toggles wrapping of header components for mobile responsiveness
  const gridWrap = useMediaQuery(theme.breakpoints.down("sm"))
    ? "wrap"
    : "nowrap";

  return (
    <AppBar position="static" className={headerBar}>
      <Toolbar>
        <Grid
          container
          justify="space-between"
          direction="row"
          spacing={3}
          wrap={gridWrap}
        >
          <Grid item className={titleWrapper}>
            <Link href="/">
              <MaterialLink underline="none" color="initial">
                <Typography className={title} variant="h2" align="left">
                  A Game of Chance
                </Typography>
              </MaterialLink>
            </Link>
          </Grid>
          {user && (
            <Grid item className={formWrapper}>
              <SearchForm />
            </Grid>
          )}
          <Grid item className={accountWrapper}>
            <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
              <AccountCircleIcon fontSize="large" className={accountIcon} />
            </Button>
            <Popover
              open={!!anchorEl}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={() => setAnchorEl(null)}
            >
              <AuthIndex />
            </Popover>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
