import Link from "next/link";

import {
  Box,
  Button,
  Link as MaterialLink,
  Typography,
} from "@material-ui/core";
import { useUser } from "../utils/auth/useUser";

const AuthIndex = () => {
  const { user, logout } = useUser();

  if (!user) {
    return (
      <Box>
        <p>Hi there!</p>
        <p>
          You are not signed in.{" "}
          <Button variant="contained">
            <Link href={"/auth"}>
              <MaterialLink underline="none">
                <Typography color="primary">Log in</Typography>
              </MaterialLink>
            </Link>
          </Button>
        </p>
      </Box>
    );
  }

  return (
    <div>
      <Box>
        <p>You're signed in as {user.email}</p>
        <Button
          variant="contained"
          color="textPrimary"
          onClick={() => logout()}
        >
          <Typography color="primary">Log out</Typography>
        </Button>
      </Box>
    </div>
  );
};

export default AuthIndex;
