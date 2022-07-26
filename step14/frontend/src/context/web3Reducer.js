import PropTypes from "prop-types";
import {
	WEB3_CONNECT,
	WEB3_DISCONNECT,
	GET_ARTICLE,
	RELOAD_ARTICLES,
	GET_MY_ARTICLES,
	GET_MY_ARTICLES,
	SHOW_EVENTS,
	INCOMING_EVENT,
} from "context/types";

export const initialState = {
	connected: false,
	signer: null,
	provider: null,
	chainId: 0,
	contract: null,
	account: null,
	articles: [],
	marketplace: false,
	eventMessage: "",
	showEvents: true,
	timeStamp: null,
	refreshTimeStamp: null,
	eventTimeStamp: null,
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
				name: action.name,
				allowed: action.allowed,
				refreshTimeStamp: new Date(),
				connected: true,
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
		case GET_MARKETPLACE:
		case GET_MY_ARTICLES:
			return {
				...state,
				articles: action.articles,
				marketplace: action.marketplace,
				timeStamp: action.timeStamp,
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
