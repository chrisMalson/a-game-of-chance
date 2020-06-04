const gameListReducer = (state, { type, name, id, platform, storedGames }) => {
  switch (type) {
    // LIST MANAGEMENT
    case "ADD_GAME":
      return [...state, { name, id, platform, isVisible: true }]; // id will likely be used for element key purposes
    case "REMOVE_GAME":
      return state.filter((game) => game.id !== id);
    case "CHANGE_PLATFORM":
      return state.map((game) =>
        game.id !== id ? game : { name, id, platform, isVisible: true }
      );
    case "BUILD_STORED_LIST":
      return storedGames.map((game) => ({ ...game, isVisible: true }));

    // FILTERS
    case "SORT_A_TO_Z":
      return state
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((game) => game);
    case "SORT_Z_TO_A":
      return state
        .sort((a, b) => a.name.localeCompare(b.name))
        .reverse()
        .map((game) => game);
    case "SORT_BY_PLATFORM":
      return state.map((game) => {
        switch (platform) {
          case "all-platforms":
          case game.platform:
            return { ...game, isVisible: true };
          default:
            return { ...game, isVisible: false };
        }
      });
    case "SET_ALL_TO_VISIBLE":
      return state.map((game) => ({ ...game, isVisible: true }));
    default:
      return state;
  }
};

export default gameListReducer;
