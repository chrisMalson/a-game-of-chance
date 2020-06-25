import axios from "axios";
import Router from "next/router";

import { get } from "lodash/object";
import GameInfo from "../../components/GameInfo";
import withAuthUser from "../../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../../utils/pageWrappers/withAuthUserInfo";
import ReducerWrapper from "../../utils/pageWrappers/ReducerWrapper";

// currently displays name, description, and a related image
// description property was in HTML format; needed html-react-parser to display text without <p> tags
const GamePage = (props) => {
  const { AuthUserInfo, game, id } = props;
  const AuthUser = get(AuthUserInfo, "AuthUser", null);
  const uid = AuthUser.id;

  return (
    <ReducerWrapper uid={uid}>
      <GameInfo game={game} id={id} />
    </ReducerWrapper>
  );
};

// getStaticProps would have required getStaticPaths = revisit?
GamePage.getInitialProps = async (context) => {
  if (!context.myCustomData.AuthUserInfo.AuthUser) {
    if (context.res) {
      context.res.writeHead(302, { Location: "/" });
      context.res.end();
      context.res.finished = true;
    } else {
      Router.push("/");
    }
  }

  const { id } = context.query; // from /game/id

  const url = `https://api.rawg.io/api/games/${id}`;
  const { data } = await axios({
    method: "get",
    url,
    headers: {
      "User-Agent": "a-game-of-chance", // RAWG.io requires this for their API calls
    },
  });

  return {
    game: data,
    id: parseInt(id, 10),
  };
};

export default withAuthUser(withAuthUserInfo(GamePage));
