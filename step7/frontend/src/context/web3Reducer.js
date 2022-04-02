import PropTypes from "prop-types";
import {
	WEB3_CONNECT,
	WEB3_DISCONNECT,
	GET_ARTICLE,
	ARTICLE_SAVED,
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
		case ARTICLE_SAVED:
			return {
				...state,
				refreshTimeStamp: new Date(),
			};
		default:
			return state;
	}
};

web3Reducer.propTypes = {
	state: PropTypes.object.isRequired,
	action: PropTypes.object.isRequired,
};
