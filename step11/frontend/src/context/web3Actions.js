import { ethers } from "ethers";
import ChainList from "artifacts/contracts/ChainList.sol/ChainList.json";
import {
	WEB3_CONNECT,
	WEB3_DISCONNECT,
	GET_ARTICLE,
	SHOW_EVENTS,
	INCOMING_EVENT,
	RELOAD_ARTICLES,
} from "context/types";

export const setupWeb3 = async (state, dispatch) => {
	if (state.contract !== null) {
		// remove previous listeners
		removeAllListeners(state.contract);
	}

	if (typeof window.ethereum !== "undefined") {
		dispatch(await connectWeb3());

		window.ethereum.on("chainChanged", async (_chainId) => {
			// connect to the new network
			dispatch(await connectWeb3());
		});

		window.ethereum.on("accountsChanged", async () => {
			// connect the new account
			dispatch(await connectWeb3());
		});

		window.ethereum.on("disconnect", async (code, reason) => {
			// Subscribe to session disconnection
			dispatch(await disconnectWeb3(state));
		});
	} else {
		console.error("Metamask is not installed!");
	}
};


const connectWeb3 = async () => {
	// setup web3
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(
		process.env.REACT_APP_CONTRACT_ADDRESS,
		ChainList.abi,
		signer
	);

	let account = null;
	try {
		account = await signer.getAddress();
	} catch (error) {}

	// get chain settings
	const network = await provider.getNetwork();
	const { name, allowed } = chainSettings(network.chainId);

	// update the state
	return {
		type: WEB3_CONNECT,
		contract: contract,
		signer: signer,
		provider: provider,
		chainId: network.chainId,
		account: account,
		name: name,
		allowed: allowed,
	};
};

const disconnectWeb3 = async (state) => {
	// remove previous listeners
	removeAllListeners(state.contract);

	// update the state
	return {
		type: WEB3_DISCONNECT,
	};
};

export const addAllListeners = (state, dispatch) => {
	// remove previous listeners
	removeAllListeners(state.contract);

	try {
		state.provider.once("block", () => {
			state.contract.on("SellArticleEvent", async (_seller, _name, _price) => {
				let eventMessage = "";
				if (state.account === _seller) {
					eventMessage =
						"Your article  " + _name + " is available in the marketplace";
				} else {
					eventMessage =
						"The article  " +
						_name +
						" is available in the marketplace for " +
						ethers.utils.formatEther(_price) +
						" ETH ";
				}
				dispatch({
					type: INCOMING_EVENT,
					eventMessage: eventMessage,
					eventTimeStamp: new Date(),
				});
				await reloadArticles(dispatch);
			});

			state.contract.on(
				"BuyArticleEvent",
				async (_seller, _buyer, _name, _price) => {
					if (state.account === _seller) {
						const eventMessage =
							_buyer +
							" bought your article " +
							_name +
							" for " +
							ethers.utils.formatEther(_price) +
							" ETH ";

						dispatch({
							type: INCOMING_EVENT,
							eventMessage: eventMessage,
							eventTimeStamp: new Date(),
						});
					}

					await reloadArticles(dispatch);
				}
			);
		});
	} catch (error) {
		console.log(error);
	}
};

const removeAllListeners = (contract) => {
	// any existing contract?
	if (contract === null || typeof contract === "undefined") {
		return;
	}
	// remove all events
	contract.removeAllListeners("SellArticleEvent");
	contract.removeAllListeners("BuyArticleEvent");
};

const chainSettings = (chainId) => {
	// get the network name and detect if the network is allowed by our application
	switch (chainId) {
		case 1:
			return {
				name: "Mainnet",
				allowed: false,
			};
		case 2:
			return {
				name: "Morden",
				allowed: false,
			};
		case 3:
			return {
				name: "Ropsten",
				allowed: true,
			};
		case 4:
			return {
				name: "Rinkeby",
				allowed: false,
			};
		case 5:
			return {
				name: "Goerli",
				allowed: false,
			};
		case 42:
			return {
				name: "Kovan",
				allowed: false,
			};
		default:
			return {
				name: "Private network",
				allowed: true,
			};
	}
};

export const reloadArticles = async (dispatch) => {
	dispatch({
		type: RELOAD_ARTICLES,
	});
};

export const sellArticle = async (state, dispatch, article) => {
	if (state.contract !== null) {
		try {
			const transaction = await state.contract.sellArticle(
				article.name,
				article.description,
				ethers.utils.parseUnits(article.price, "ether")
			);
			await transaction.wait();
			await reloadArticles(dispatch);
		} catch (error) {
			console.error(error);
		}
	}
};

export const buyArticle = async (state, dispatch, price) => {
	if (state.contract !== null) {
		try {
			const transaction = await state.contract.buyArticle({
				value: ethers.utils.parseUnits(price, "ether"),
			});
			await transaction.wait();
		} catch (error) {
			console.error(error);
		}
		await reloadArticles(dispatch);
	}
};

export const getArticle = async (state, dispatch) => {
	if (state.contract !== null && state.account !== null) {
		try {
			const [_seller, _name, _description, _price] =
				await state.contract.getArticle();
			dispatch({
				type: GET_ARTICLE,
				seller: _seller,
				name: _name,
				description: _description,
				price: ethers.utils.formatEther(_price),
			});
		} catch (error) {
			console.error(error);
			dispatch({
				type: GET_ARTICLE,
				seller: null,
				name: null,
				description: null,
				price: 0,
			});
		}
	}
};

export const showEvents = (state, dispatch) => {
	dispatch({
		type: SHOW_EVENTS,
		showEvents: true,
	});
};

export const hideEvents = (state, dispatch) => {
	dispatch({
		type: SHOW_EVENTS,
		showEvents: false,
	});
};
