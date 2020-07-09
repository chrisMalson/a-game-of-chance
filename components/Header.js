import Link from "next/link";
import {
  AppBar,
  Typography,
  Toolbar,
  Grid,
  Link as MaterialLink,
} from "@material-ui/core";

import { useUser } from "../utils/auth/useUser";
import AuthIndex from "./AuthIndex";
import SearchForm from "./SearchForm";

// this is a header...
const Header = () => {
  const { user } = useUser();

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between" direction="row">
          <Grid item>
            <Link href="/">
              <MaterialLink underline="hover" color="initial">
                <Typography variant="h2" align="left" gutterBottom>
                  A Game of Chance
                </Typography>
              </MaterialLink>
            </Link>
          </Grid>
          {user && (
            <Grid item>
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
