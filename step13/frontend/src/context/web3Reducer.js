import PropTypes from "prop-types";
import {
  WEB3_CONNECT,
  WEB3_DISCONNECT,
  GET_ARTICLE,
  RELOAD_ARTICLES,
  SHOW_EVENTS,
  INCOMING_EVENT,
} from "context/web3Types";

export const initialState = {
  signer: null,
  provider: null,
  chainId: 0,
  contract: null,
  account: null,
  networkName: "",
  allowed: false,
  articleName: "",
  articleDescription: "",
  articlePrice: 0,
  refreshTimeStamp: null,
  eventMessage: "",
  showEvents: true,
  eventTimeStamp: null,
  connected: false,
};

export const web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case WEB3_CONNECT:
      return {
        ...state,
        signer: action.signer,
        provider: action.provider,
        chainId: action.chainId,
        contract: action.contract,
        account: action.account,
        networkName: action.networkName,
        allowed: action.allowed,
        refreshTimeStamp: new Date(),
        connected: traction.account !== null ? true : false,
      };
    case WEB3_DISCONNECT:
      return {
        ...state,
        initialState,
      };
    case GET_ARTICLE:
      return {
        ...state,
        seller: action.seller,
        articleName: action.name,
        articleDescription: action.description,
        articlePrice: action.price,
      };
    case RELOAD_ARTICLES:
      return {
        ...state,
        refreshTimeStamp: new Date(),
      };
    case INCOMING_EVENT:
      return {
        ...state,
        eventMessage: action.eventMessage,
        eventTimeStamp: action.eventTimeStamp,
      };
    case SHOW_EVENTS:
      return {
        ...state,
        showEvents: action.showEvents,
      };
    default:
      return state;
  }
};

web3Reducer.propTypes = {
  state: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired,
};
