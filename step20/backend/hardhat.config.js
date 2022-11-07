require("@nomicfoundation/hardhat-toolbox");

// read secrets keys
const {
  alchemyURLGoerli,
  privateKeyGoerli,
  alchemyURLMainnet,
  privateKeyMainnet,
} = require("./secrets.json");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "../frontend/src/artifacts",
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      coinbase: "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199",
    },
    goerli: {
      url: alchemyURLGoerli,
      accounts: [privateKeyGoerli],
    },
    mainnet: {
      url: alchemyURLMainnet,
      accounts: [privateKeyMainnet],
    },
  },
};
