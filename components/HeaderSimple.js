import Link from "next/link";
import {
  AppBar,
  Typography,
  Toolbar,
  Grid,
  Link as MaterialLink,
} from "@material-ui/core";

// this is a header...
const HeaderSimple = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="center">
          <Link href="/">
            <MaterialLink underline="hover" color="initial">
              <Typography variant="h2" align="center" gutterBottom>
                A Game of Chance
              </Typography>
            </MaterialLink>
          </Link>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderSimple;
