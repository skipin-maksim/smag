import { tabsActions } from './';

const getTabsList = name => (dispatch, getState) => {
  const {
    tabs: { items },
  } = getState();

  dispatch(tabsActions.removeTabs({ name, items }));
};

export default { getTabsList };
