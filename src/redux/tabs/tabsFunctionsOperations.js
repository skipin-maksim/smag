const addTab = (state, payload) => {
  const isTabs = state.find(item => item.name === payload.name);

  if (!isTabs) return [...state, payload];

  return state;
};
const removeTab = (state, payload) => {
  // if (state.length === 1) {
  //   return initialStateItem;
  // }

  return state.filter(item => item.name !== payload);
};

export const func = {
  addTab,
  removeTab,
};
