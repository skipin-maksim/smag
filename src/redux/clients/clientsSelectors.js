const getAllClientsList = state => state.clients.allClients;

const getIsLoading = state => state.clients.loader;

const getClientById = (state, id) => {
  return getAllClientsList(state).find(({ _id }) => _id === id);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllClientsList, getIsLoading, getClientById };
