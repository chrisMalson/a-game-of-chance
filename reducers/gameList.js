const gameListReducer = (state, { type, name, id }) => {
  switch (type) {
    case "ADD_GAME":
      return [...state, { name, id }]; // id will likely be used for element key purposes
    case "REMOVE_GAME":
    case "RENDER_GAME_LIST":
    default:
      return state;
  }
};

export default gameListReducer;
