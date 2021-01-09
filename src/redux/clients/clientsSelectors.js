const getAllClientsList = state => state.clients.allClients;

const getIsLoading = state => state.clients.loader;

export default { getAllClientsList, getIsLoading };
