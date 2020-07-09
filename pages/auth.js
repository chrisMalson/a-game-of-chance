import FirebaseAuth from "../components/FirebaseAuth";
import HeaderSimple from "../components/HeaderSimple";

const Auth = () => {
  return (
    <div>
      <HeaderSimple />
      <div>
        <FirebaseAuth />
      </div>
    </div>
  );
};

export default Auth;
