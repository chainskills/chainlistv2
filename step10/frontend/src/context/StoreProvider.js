import React, { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const Store = createContext();

export const useStore = () => useContext(Store);

export const StoreProvider = ({ children, initialState, reducer }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.object.isRequired,
  initialState: PropTypes.object.isRequired,
  reducer: PropTypes.func.isRequired,
};
