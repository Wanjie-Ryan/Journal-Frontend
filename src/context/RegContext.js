// RegContext.js
import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const RegContext = createContext(initialState);

const regReducer = (state, action) => {
  switch (action.type) {
    case "regStart":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "regComplete":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case "regFail":
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const RegContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(regReducer, initialState);

  return (
    <RegContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </RegContext.Provider>
  );
};
