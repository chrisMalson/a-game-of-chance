import PropTypes from "prop-types";
import { get } from "lodash/object";
import withAuthUser from "../utils/pageWrappers/withAuthUser";
import withAuthUserInfo from "../utils/pageWrappers/withAuthUserInfo";
import SearchForm from "../components/SearchForm";
import GameList from "../components/GameList";
import FilterOptions from "../components/FilterOptions";
import PickRandomGameButton from "../components/PickRandomGameButton";
import UserBar from "../components/UserBar";
import ReducerWrapper from "../utils/pageWrappers/ReducerWrapper";

const Index = (props) => {
  const { AuthUserInfo } = props;
  const AuthUser = get(AuthUserInfo, "AuthUser", null);
  const uid = AuthUser.id;

  return (
    <div>
      <UserBar AuthUser={AuthUser} />
      {!AuthUser ? (
        <></>
      ) : (
        <ReducerWrapper uid={uid}>
          <SearchForm />
          <PickRandomGameButton />
          <FilterOptions />
          <GameList />
        </ReducerWrapper>
      )}
    </div>
  );
};

// Just an example.

Index.getInitialProps = async (ctx) => {
  // Get the AuthUserInfo object. This is set in `withAuthUser.js`.
  // The AuthUserInfo object is available on both the server and client.
  const AuthUserInfo = get(ctx, "myCustomData.AuthUserInfo", null);
  const AuthUser = get(AuthUserInfo, "AuthUser", null);

  // You can also get the token (e.g., to authorize a request when fetching data)
  // const AuthUserToken = get(AuthUserInfo, 'token', null)

  // You can fetch data here.
};

Index.displayName = "Index";

Index.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }),
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    favoriteFood: PropTypes.string.isRequired,
  }),
};

Index.defaultProps = {
  AuthUserInfo: null,
};

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default withAuthUser(withAuthUserInfo(Index));
