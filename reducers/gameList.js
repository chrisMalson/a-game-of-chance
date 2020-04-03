const gameListReducer = (state, { type, name, id, platform }) => {
  switch (type) {
    case "ADD_GAME":
      return [...state, { name, id, platform }]; // id will likely be used for element key purposes
    case "REMOVE_GAME":
      return state.filter(game => game.id !== id);
    case "CHANGE_PLATFORM":
      return [...state.filter(game => game.id !== id), { name, id, platform }];
    default:
      return state;
  }
};

export default gameListReducer;
