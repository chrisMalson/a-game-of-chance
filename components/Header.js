import {
  AppBar,
  Grid,
  Link as MaterialLink,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "next/link";

import AuthIndex from "./AuthIndex";
import SearchForm from "./SearchForm";
import { useUser } from "../utils/auth/useUser";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
    fontSize: "2.5rem",
  },
  formWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
  },
}));

// this is a header...
const Header = () => {
  const { user } = useUser();
  const { title, formWrapper } = useStyles();
  const theme = useTheme();

  const gridDirection = useMediaQuery(theme.breakpoints.down("sm"))
    ? "column"
    : "row";

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          justify="space-between"
          direction={gridDirection}
          wrap="nowrap"
        >
          <Grid item>
            <Link href="/">
              <MaterialLink underline="none" color="initial">
                <Typography
                  className={title}
                  variant="h2"
                  align="left"
                  gutterBottom
                >
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
          <Grid item>
            <AuthIndex />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
