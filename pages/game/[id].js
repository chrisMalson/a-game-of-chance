import axios from "axios";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import GameInfo from "../../components/GameInfo";
import Header from "../../components/Header";

const useStyles = makeStyles({
  pageWrapper: {
    minHeight: "100vh",
  },
});

const GamePage = ({ game, id }) => {
  const { pageWrapper } = useStyles();

  return (
    <Box className={pageWrapper}>
      <Header />
      <GameInfo game={game} id={id} />
    </Box>
  );
};

// getStaticProps would have required getStaticPaths = revisit? TODO
GamePage.getInitialProps = async (context) => {
  const { id } = context.query; // from /game/id

  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;

  const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
  const { data } = await axios({
    method: "get",
    url,
  });

  return {
    game: data,
    id: parseInt(id, 10),
  };
};

export default GamePage;
