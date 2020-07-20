import { Box, Grid } from "@material-ui/core";

import AuthIndex from "../components/AuthIndex";
import GameList from "../components/GameList";
import Header from "../components/Header";
import HeaderSimple from "../components/HeaderSimple";
import PickRandomGameButton from "../components/PickRandomGameButton";
import ReturnToTopButton from "../components/ReturnToTopButton";
import { useUser } from "../utils/auth/useUser";

// if user is not signed in, only a simplified header and login message/button will show
const Index = () => {
  const { user } = useUser();

  return (
    <Box>
      {user ? (
        <>
          <Header />
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <Box />
            </Grid>
            <Grid item>
              <PickRandomGameButton />
            </Grid>
            <Grid item>
              <GameList />
            </Grid>
          </Grid>
          <ReturnToTopButton />
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
