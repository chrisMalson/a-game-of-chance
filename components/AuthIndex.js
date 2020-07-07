import Link from "next/link";

import { Box } from "@material-ui/core";
import { useUser } from "../utils/auth/useUser";

const AuthIndex = () => {
  const { user, logout } = useUser();

  if (!user) {
    return (
      <Box>
        <p>Hi there!</p>
        <p>
          You are not signed in.{" "}
          <Link href={"/auth"}>
            <a>Sign in</a>
          </Link>
        </p>
      </Box>
    );
  }

  return (
    <div>
      <Box>
        <p>You're signed in as {user.email}</p>
        <p
          style={{
            display: "inlinelock",
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => logout()}
        >
          Log out
        </p>
      </Box>
    </div>
  );
};

export default AuthIndex;
