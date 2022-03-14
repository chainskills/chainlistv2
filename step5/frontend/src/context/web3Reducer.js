import PropTypes from "prop-types";
import { WEB3_CONNECT, WEB3_DISCONNECT } from "./types";

export const initialState = {
  signer: null,
  provider: null,
  chainId: 0,
  address: null,
  name: "",
  allowed: false,
};

export const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case WEB3_CONNECT:
      return {
        ...state,
        signer: action.signer,
        provider: action.provider,
        chainId: action.chainId,
        address: action.address,
        name: action.name,
        allowed: action.allowed,
      };
    case WEB3_DISCONNECT:
      return {
        ...state,
        initialState,
      };
    default:
      return state;
  }
};

web3Reducer.propTypes = {
  state: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired,
};
