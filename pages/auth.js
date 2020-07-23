import { makeStyles } from "@material-ui/core/styles";

import FirebaseAuth from "../components/FirebaseAuth";
import HeaderSimple from "../components/HeaderSimple";

const useStyles = makeStyles({
  authWrapper: {
    marginTop: "3rem",
  },
  pageWrapper: {
    minHeight: "100vh",
  },
});

// not much to see here

const Auth = () => {
  const { authWrapper, pageWrapper } = useStyles();

  return (
    <div className={pageWrapper}>
      <HeaderSimple />
      <div className={authWrapper}>
        <FirebaseAuth />
      </div>
    </div>
  );
};

export default Auth;
