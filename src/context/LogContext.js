import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const LogContext = createContext(initialState);

const logReducer = (state, action) => {
  switch (action.type) {
    case "logStart":
      return {
        user: null,
        loading: true,
        error: null,
      };

    case "logComplete":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };

    case "logFail":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const LogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(logReducer, initialState);

  return (
    <LogContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </LogContext.Provider>
  );
};
