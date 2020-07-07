import Link from "next/link";
import {
  AppBar,
  Typography,
  Toolbar,
  Grid,
  Link as MaterialLink,
} from "@material-ui/core";

import AuthIndex from "./AuthIndex";
import SearchForm from "./SearchForm";

// this is a header...
const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between" direction="row">
          <Link href="/">
            <MaterialLink underline="hover" color="initial">
              <Typography variant="h2" align="left" gutterBottom>
                A Game of Chance
              </Typography>
            </MaterialLink>
          </Link>
          <SearchForm />
          <AuthIndex />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
