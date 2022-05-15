import PropTypes from "prop-types";
import {
	WEB3_CONNECT,
	WEB3_DISCONNECT,
	GET_ARTICLE,
	RELOAD_ARTICLES,
	SHOW_EVENTS,
	INCOMING_EVENT,
} from "context/types";

export const initialState = {
	signer: null,
	provider: null,
	chainId: 0,
	contract: null,
	address: null,
	name: "",
	allowed: false,
	articleName: "",
	articleDescription: "",
	articlePrice: 0,
	refreshTimeStamp: null,
	eventMessage: "",
	showEvents: false,
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
				address: action.address,
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
