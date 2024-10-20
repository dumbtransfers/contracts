const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CrossChain Payment Test", function () {
  let crossChainPayment, routerMock, owner, addr1;
  const destinationChainSelector = 1234; // Example destination chain
  const receiver = "0x1234567890abcdef1234567890abcdef12345678"; // Example receiver
  const tokenAddress = "0xabcdefabcdefabcdefabcdefabcdefabcdef"; // Example token
  const amount = ethers.parseUnits("100", 18); // Sending 100 tokens

  beforeEach(async function () {
    // Get signers
    [owner, addr1] = await ethers.getSigners();

    // Mock the router contract
    const RouterMock = await ethers.getContractFactory("RouterMock");
    routerMock = await RouterMock.deploy();
    await routerMock.deployed();

    // Deploy the CrossChainPayment contract with the mock router
    const CrossChainPayment = await ethers.getContractFactory("CrossChainPayment");
    crossChainPayment = await CrossChainPayment.deploy(routerMock.address);
    await crossChainPayment.deployed();
  });

  it("should successfully send a cross-chain message with a calculated fee", async function () {
    // Mock the fee returned by the router
    const mockFee = ethers.parseUnits("100", 18); // Sending 100 tokens
    await routerMock.setFee(mockFee); // Assuming the mock router has a `setFee` function

    // Send a cross-chain message
    await expect(
      crossChainPayment.connect(owner).sendMessage(
        destinationChainSelector,
        receiver,
        tokenAddress,
        amount,
        { value: mockFee } // User provides the calculated fee in native token (ETH)
      )
    ).to.emit(routerMock, "MessageSent")
      .withArgs(owner.address, destinationChainSelector, receiver, tokenAddress, amount);

    // Check if the correct fee was used
    const messageSent = await routerMock.getLastMessage(); // Assuming `getLastMessage()` exists in mock
    expect(messageSent.fee).to.equal(mockFee);
    expect(messageSent.receiver).to.equal(receiver);
    expect(messageSent.tokenAddress).to.equal(tokenAddress);
    expect(messageSent.amount).to.equal(amount);
  });
});
