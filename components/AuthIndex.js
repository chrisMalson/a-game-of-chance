import Link from "next/link";
import { useUser } from "../utils/auth/useUser";

const AuthIndex = () => {
  const { user, logout } = useUser();

  if (!user) {
    return (
      <>
        <p>Hi there!</p>
        <p>
          You are not signed in.{" "}
          <Link href={"/auth"}>
            <a>Sign in</a>
          </Link>
        </p>
      </>
    );
  }

  return (
    <div>
      <div>
        <p>You're signed in. ID: {user.id}</p>
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
      </div>
    </div>
  );
};

export default AuthIndex;
