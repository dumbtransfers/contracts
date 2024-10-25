const { ethers } = require("hardhat");

async function main() {
  // Set the deployed contract address
  const contractAddress = "0x9bAEF811A847E7BCfeD06E76Dd83210def53297A"; // Replace with your deployed contract address

  // Fetch the contract ABI (it should be in the artifacts if you compiled the contract)
  const GasFeeRecoveryMultiToken = await ethers.getContractFactory("GasFeeRecoveryMultiToken");

  // Connect to the deployed contract
  const contract = await GasFeeRecoveryMultiToken.attach(contractAddress);

  // Example 1: Call `getLatestEthPrice` to fetch the latest ETH/USD price
  const ethPrice = await contract.getLatestEthPrice();
  console.log(`ETH/USD Price: ${ethPrice.toString()}`);

  // Example 2: Call `getLatestTokenPrice` for WLD token
//   const wldTokenAddress = "0xdC6fF44d5d932Cbd77B52E5612Ba0529DC6226F1"; // WLD token address on Optimism Sepolia
//   const wldPrice = await contract.getLatestTokenPrice(wldTokenAddress);
//   console.log(`WLD/USD Price: ${wldPrice.toString()}`);

  // Example 3: Add a new supported token (example with USDC)
//   const usdcTokenAddress = "0xYourUSDCAddress"; // Replace with the actual USDC token address
//   const usdcPriceFeedAddress = "0xYourUSDCPriceFeedAddress"; // Replace with the actual USDC/USD price feed address

//   const addTokenTx = await contract.addSupportedToken(usdcTokenAddress, usdcPriceFeedAddress);
//   await addTokenTx.wait(); // Wait for the transaction to be mined

//   console.log(`Added USDC token with price feed: ${usdcPriceFeedAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
