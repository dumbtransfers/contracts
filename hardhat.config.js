require("@nomicfoundation/hardhat-toolbox");

// Import and configure dotenv for private key management
require("dotenv").config();

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {
      // Default local hardhat network
    },
    ethereumSepolia: {
      url:
        'https://eth-sepolia.api.onfinality.io/public' !== undefined ? 'https://eth-sepolia.api.onfinality.io/public' : "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
    avalancheFuji: {
      url: 'https://avalanche-fuji-c-chain-rpc.publicnode.com' !== undefined ? 'https://avalanche-fuji-c-chain-rpc.publicnode.com' : "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 43113,
    },
    dumbtransfers: {
      url: 'https://node.l1marketplace.com/ext/bc/2VGbAG68yBSqUxdRTbCZ9A84yT5YFR7yvKTn6N57WFLtJcAdHR/rpc' !== undefined ? 'https://node.l1marketplace.com/ext/bc/2VGbAG68yBSqUxdRTbCZ9A84yT5YFR7yvKTn6N57WFLtJcAdHR/rpc' : "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 436850695,
    },
    optimismSepolia: {
      url: `https://optimism-sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155420
    },
  },
};
