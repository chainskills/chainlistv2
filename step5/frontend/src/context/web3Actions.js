import { ethers } from "ethers";
import { WEB3_CONNECT, WEB3_DISCONNECT } from "context/types";

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
    signer: signer,
    provider: provider,
    chainId: network.chainId,
    account: account,
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
