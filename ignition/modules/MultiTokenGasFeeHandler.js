// const { expect } = require("chai");

// describe("GasFeeRecoveryMultiToken", function () {
//     let contract;
//     let owner;
//     let addr1;
//     let addr2;

//     beforeEach(async function () {
//         [owner, addr1, addr2] = await ethers.getSigners();
//         const GasFeeRecoveryMultiToken = await ethers.getContractFactory("GasFeeRecoveryMultiToken");
//         const ethUsdPriceFeedAddress = "0x13e3Ee699D1909E989722E753853AE30b17e08c5"; // Example address
//         const wldTokenAddress = "0xdC6fF44d5d932Cbd77B52E5612Ba0529DC6226F1"
//         const wldUsdPriceFeedAddress = "0x4e1C6B168DCFD7758bC2Ab9d2865f1895813D236"

//         contract = await GasFeeRecoveryMultiToken.deploy(ethUsdPriceFeedAddress, wldTokenAddress ,wldUsdPriceFeedAddress);
//         await contract.deployed();
//     });

//     it("Should set the right owner", async function () {
//         expect(await contract.owner()).to.equal(owner.address);
//     });

//     // Add more tests for your functions
// });



const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("GasFeeRecoveryMultiTokenModule", (m) => {
  // Set parameters for the ETH/USD price feed and WLD token
  const ethUsdPriceFeed = m.getParameter("_ethUsdPriceFeed", "0x61Ec26aA57019C486B10502285c5A3D4A4750AD7"); // Replace with the actual ETH/USD price feed address
  const wldToken = m.getParameter("_wldTokenAddress", "0x1a1B7fEeA4233F9F6DEdA0252F8758751fECa004"); // Replace with the WLD token address
  const wldPriceFeed = m.getParameter("_wldPriceFeedAddress", "0xC3D7ba4234995543188278E51837F1C27b89E331"); // Replace with the WLD/USD price feed address

  // Deploy the GasFeeRecoveryMultiToken contract with the ETH/USD price feed
  const gasFeeRecoveryMultiToken = m.contract("GasFeeRecoveryMultiToken", [ethUsdPriceFeed, wldToken, wldPriceFeed]);

  // After deploying, add the WLD token and its price feed
//   m.call(gasFeeRecoveryMultiToken, "addSupportedToken", {
//     args: [wldToken, wldPriceFeed],
//   });

  return { gasFeeRecoveryMultiToken };
});
