import React, { useReducer, createContext } from 'react';

const initialState = {
  user: null,
};

if (localStorage.getItem('user')) {
  const user = JSON.parse(localStorage.getItem('user'));
  initialState.user = user;
}

const AuthContext = createContext({
  user: null,
  login: () => { },
  logout: () => { },
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
