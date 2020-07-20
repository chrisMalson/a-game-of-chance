import {
  Box,
  Button,
  Link as MaterialLink, // this may not be necessary, will revisit. TODO
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

import { useUser } from "../utils/auth/useUser";

const useStyles = makeStyles((theme) => ({
  authWrapper: {
    height: "100%",
    padding: "5px",
    width: "auto",
    wordBreak: "break-all",
  },
  buttonText: {
    color: theme.palette.primary.contrastText,
  },
}));

// most of this code was pulled from Next.js' firebase auth example

const AuthIndex = () => {
  const { user, logout } = useUser();
  const { authWrapper, buttonText } = useStyles();

  if (!user) {
    return (
      <Box className={authWrapper}>
        <p>Hi there!</p>
        <p>
          You are not signed in.{" "}
          <Button variant="contained" color="primary">
            <Link href={"/auth"}>
              <MaterialLink underline="none">
                <Typography className={buttonText}>Log in</Typography>
              </MaterialLink>
            </Link>
          </Button>
        </p>
      </Box>
    );
  }

  return (
    <Box className={authWrapper}>
      <p>You're signed in as {user.email}</p>
      <Button variant="contained" color="primary" onClick={() => logout()}>
        <Typography className={buttonText}>Log out</Typography>
      </Button>
    </Box>
  );
};

export default AuthIndex;
