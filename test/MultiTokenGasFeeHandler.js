const { expect } = require("chai");

describe("GasFeeRecoveryMultiToken", function () {
    let contract;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const GasFeeRecoveryMultiToken = await ethers.getContractFactory("GasFeeRecoveryMultiToken");
        const ethUsdPriceFeedAddress = "0x13e3Ee699D1909E989722E753853AE30b17e08c5"; // Example address
        const wldTokenAddress = "0xdC6fF44d5d932Cbd77B52E5612Ba0529DC6226F1"
        const wldUsdPriceFeedAddress = "0x4e1C6B168DCFD7758bC2Ab9d2865f1895813D236"

        contract = await GasFeeRecoveryMultiToken.deploy(ethUsdPriceFeedAddress, wldTokenAddress, wldUsdPriceFeedAddress);
        // await contract.deployed();
    });

    it("Should set the right owner", async function () {
        expect(await contract.owner()).to.equal(owner.address);
    });

    // Add more tests for your functions
});
