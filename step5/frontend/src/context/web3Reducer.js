import PropTypes from "prop-types";
import { WEB3_CONNECT, WEB3_DISCONNECT } from "./web3Types";

export const initialState = {
  signer: null,
  provider: null,
  chainId: 0,
  account: null,
  networkName: "",
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
        account: action.account,
        networkName: action.networkName,
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
