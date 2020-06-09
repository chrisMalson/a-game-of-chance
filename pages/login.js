import { Button } from "@material-ui/core";
import firebase from "../src/firebase";

const Login = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return <Button>Sign in with Google</Button>;
};

export default Login;
