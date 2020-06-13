import Link from "next/link";
import Router from "next/router";

import logout from "../utils/auth/logout";

const UserBar = ({ AuthUser }) => {
  return (
    <div>
      <p>Hi there!</p>
      {!AuthUser ? (
        <p>
          You are not signed in.{" "}
          <Link href={"/auth"}>
            <a>Sign in</a>
          </Link>
        </p>
      ) : (
        <div>
          <p>You're signed in. ID: {AuthUser.id}</p>
          <p
            style={{
              display: "inlinelock",
              color: "blue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={async () => {
              try {
                await logout();
                Router.push("/auth");
              } catch (e) {
                console.error(e);
              }
            }}
          >
            Log out
          </p>
        </div>
      )}
    </div>
  );
};

export default UserBar;
