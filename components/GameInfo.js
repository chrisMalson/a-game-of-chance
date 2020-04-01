import parse from "html-react-parser";

const GameInfo = ({ game }) => (
  <>
    <h1>{game.name}</h1>
    {parse(game.description)}
    <img
      style={{ width: "300px", height: "200px" }}
      src={game.background_image}
    />
  </>
);

export default GameInfo;
