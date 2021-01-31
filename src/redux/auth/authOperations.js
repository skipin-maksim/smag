import axios from 'axios';
import { authActions } from './';

const baseURL = 'https://smagserver.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const logIn = loginData => async dispatch => {
  dispatch(authActions.logInRequest());

  try {
    const { data } = await axios.post(`${baseURL}/login`, loginData);

    console.log(data);

    dispatch(authActions.logInSuccess(data.data));

    token.set(data.token);
  } catch (error) {
    dispatch(authActions.logInError(error));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  try {
    const {
      auth: { token: existingToken },
    } = getState();

    if (existingToken) {
      dispatch(authActions.getCurrentUserRequest());

      await token.set(existingToken);

      const { data } = await axios.get(`${baseURL}/current-user`);
      console.log(data);

      if (!data) {
        await token.unset();

        dispatch(authActions.getCurrentUserError());
        return;
      }

      dispatch(authActions.getCurrentUserSuccess(data));
    }
  } catch (e) {
    console.log(e);
    dispatch(authActions.getCurrentUserError());
  }
};

export default { logIn, token, getCurrentUser };
