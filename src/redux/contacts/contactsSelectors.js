const getAllContactsList = state => state.contacts.allContacts;

const getIsLoading = state => state.contacts.loader;

export default { getAllContactsList, getIsLoading };
