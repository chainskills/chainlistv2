import { ethers } from "ethers";
import { WEB3_CONNECT, WEB3_DISCONNECT } from "context/web3Types";

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

	// get chain settings
	const network = await provider.getNetwork();
	const { networkName, allowed } = chainSettings(network.chainId);

	// if not allowed, not needed to go further
	if (!allowed) {
		return {
			type: WEB3_CONNECT,
			signer: null,
			provider: provider,
			chainId: network.chainId,
			account: null,
			networkName: networkName,
			allowed: false,
		};
	}

	// we can pursue the connection
	const signer = provider.getSigner();

	let account = null;
	try {
		account = await signer.getAddress();
	} catch (error) {}

	// update the state
	return {
		type: WEB3_CONNECT,
		signer: signer,
		provider: provider,
		chainId: network.chainId,
		account: account,
		networkName: networkName,
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
				networkName: "Mainnet",
				allowed: false,
			};
		case 2:
			return {
				networkName: "Morden",
				allowed: false,
			};
		case 3:
			return {
				networkName: "Ropsten",
				allowed: false,
			};
		case 4:
			return {
				networkName: "Rinkeby",
				allowed: false,
			};
		case 5:
			return {
				networkName: "Goerli",
				allowed: false,
			};
		case 42:
			return {
				networkName: "Kovan",
				allowed: false,
			};
		default:
			return {
				networkName: "Private network",
				allowed: true,
			};
	}
};
