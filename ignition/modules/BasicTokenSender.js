const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BasicTokenSenderModule", (m) => {
  // Define router and link addresses as parameters
  //router contract in avalanche fuji
  // const router = m.getParameter("router", "0xF694E193200268f9a4868e4Aa017A0118C9a8177"); // Replace with actual router address
  // const link = m.getParameter("link", "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846"); // Replace with actual LINK token address
  const router = m.getParameter("router", "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59"); // Replace with actual router address
  const link = m.getParameter("link", "0x779877A7B0D9E8603169DdbD7836e478b4624789"); // Replace with actual LINK token address

  // Deploy the BasicTokenSender contract with the router and link parameters
  const basicTokenSender = m.contract("BasicTokenSender", [router, link]);

  return { basicTokenSender };
});
