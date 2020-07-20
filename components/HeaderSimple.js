import {
  AppBar,
  Grid,
  Link as MaterialLink,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.white,
  },
}));

// this header displays when the user is not logged in, both on the empty index and the auth page
const HeaderSimple = () => {
  const { title } = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="center">
          <Link href="/">
            <MaterialLink underline="hover">
              <Typography
                className={title}
                variant="h2"
                align="center"
                gutterBottom
              >
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
