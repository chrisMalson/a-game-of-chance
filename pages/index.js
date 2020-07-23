import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AuthIndex from "../components/AuthIndex";
import GameList from "../components/GameList";
import Header from "../components/Header";
import HeaderSimple from "../components/HeaderSimple";
import PickRandomGameButton from "../components/PickRandomGameButton";
import { useUser } from "../utils/auth/useUser";

const useStyles = makeStyles({
  pageWrapper: {
    minHeight: "100vh",
  },
});

// if user is not signed in, only a simplified header and login message/button will show
const Index = () => {
  const { user } = useUser();
  const { pageWrapper } = useStyles();

  return (
    <Box className={pageWrapper}>
      {user ? (
        <>
          <Header />
          <PickRandomGameButton />
          <GameList />
        </>
      ) : (
        <>
          <HeaderSimple />
          <AuthIndex />
        </>
      )}
    </Box>
  );
};

export default Index;
