import { ethers } from "ethers";
import ChainList from "artifacts/contracts/ChainList.sol/ChainList.json";
import {
	WEB3_CONNECT,
	WEB3_DISCONNECT,
	GET_ARTICLE,
	ARTICLE_SAVED,
} from "context/types";

export const setupWeb3 = async (state, dispatch) => {
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
			dispatch(await disconnectWeb3());
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

	let address = null;
	try {
		address = await signer.getAddress();
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
		address: address,
		name: name,
		allowed: allowed,
	};
};

const disconnectWeb3 = async () => {
	// update the state
	return {
		type: WEB3_DISCONNECT,
	};
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

export const sellArticle = async (state, dispatch, article) => {
	if (state.contract !== null) {
		try {
			const transaction = await state.contract.sellArticle(
				article.name,
				article.description,
				ethers.utils.parseUnits(article.price, "ether")
			);
			await transaction.wait();

			dispatch({
				type: ARTICLE_SAVED,
			});
		} catch (error) {
			console.error(error);
		}
	}
};

export const getArticle = async (state, dispatch) => {
	if (state.contract !== null && state.address !== null) {
		try {
			const [_owner, _name, _description, _price] =
				await state.contract.getArticle();
			dispatch({
				type: GET_ARTICLE,
				seller: _owner,
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
