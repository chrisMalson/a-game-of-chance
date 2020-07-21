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
    backgroundColor: theme.palette.common.white,
    height: "100%",
    padding: "20px",
    width: "auto",
    wordBreak: "break-all",
    textAlign: "center",
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
        <Typography variant="body2" gutterBottom>
          Hi there!
        </Typography>
        <Typography variant="body1" gutterBottom>
          You are not signed in.{" "}
          <Button variant="outlined" color="primary">
            <Link href={"/auth"}>
              <MaterialLink underline="none">Log in</MaterialLink>
            </Link>
          </Button>
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={authWrapper}>
      <Typography variant="body2" gutterBottom>
        You're signed in as
      </Typography>
      <Typography variant="body1" gutterBottom>
        {user.email}
      </Typography>
      <Button variant="outlined" onClick={() => logout()}>
        Log out
      </Button>
    </Box>
  );
};

export default AuthIndex;
