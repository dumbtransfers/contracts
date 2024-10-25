// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GasFeeRecoveryMultiToken {
    AggregatorV3Interface internal ethUsdPriceFeed;
    mapping(address => AggregatorV3Interface) public tokenUsdPriceFeeds; // Mapping for token/USD oracles
    mapping(address => IERC20) public supportedTokens; // Supported tokens mapping (e.g., WLD, USDC.e)

    address public owner;

    constructor(address _ethUsdPriceFeed, address _wldTokenAddress, address _wldPriceFeedAddress) {
        ethUsdPriceFeed = AggregatorV3Interface(_ethUsdPriceFeed);
        owner = msg.sender;

        // Add WLD as a supported token by default
        supportedTokens[_wldTokenAddress] = IERC20(_wldTokenAddress);
        tokenUsdPriceFeeds[_wldTokenAddress] = AggregatorV3Interface(_wldPriceFeedAddress);
    }


    // Function to add supported tokens and their price feeds
    function addSupportedToken(address tokenAddress, address priceFeedAddress) external {
        require(msg.sender == owner, "Not the owner");
        supportedTokens[tokenAddress] = IERC20(tokenAddress);
        tokenUsdPriceFeeds[tokenAddress] = AggregatorV3Interface(priceFeedAddress);
    }

    function getLatestEthPrice() public view returns (int) {
        (, int price, , , ) = ethUsdPriceFeed.latestRoundData();
        return price;
    }

    function getLatestTokenPrice(address token) public view returns (int) {
        require(supportedTokens[token] != IERC20(address(0)), "Token not supported");
        (, int price, , , ) = tokenUsdPriceFeeds[token].latestRoundData();
        return price;
    }
    // Function to execute the transaction with fee recovery in the given token (e.g., WLD, USDC.e)
    // function executeTransactionWithFee(address user, address token, uint256 gasUsed) external {
    //     require(supportedTokens[token] != IERC20(address(0)), "Token not supported");

    //     // Step 1: Get gas price and ETH/USD conversion
    //     uint256 gasPrice = tx.gasprice; // current gas price in gwei
    //     int ethUsdPrice = ethUsdPriceFeed.getLatestPrice();  // Example: ETH/USD = $2000
    //     uint256 totalGasCostEth = gasPrice * gasUsed;

    //     // Step 2: Convert gas cost from ETH to USD
    //     uint256 totalGasCostUsd = (totalGasCostEth * uint256(ethUsdPrice)) / 1 ether;

    //     // Step 3: Get token/USD conversion rate (for WLD, USDC.e, etc.)
    //     int tokenUsdPrice = tokenUsdPriceFeeds[token].getLatestPrice();  // Example: WLD/USD or USDC.e/USD

    //     // Step 4: Convert gas cost in USD to token equivalent
    //     uint256 tokenRequired = (totalGasCostUsd * 1 ether) / uint256(tokenUsdPrice);

    //     // Add a multiplier for fees (optional)
    //     tokenRequired = (tokenRequired * feeMultiplier) / 100;

    //     // Step 5: Transfer the required token amount from user to the contract
    //     require(supportedTokens[token].transferFrom(user, address(this), tokenRequired), "Token transfer failed");

    //     // Step 6: Execute the transaction and pay gas in ETH from the contract balance
    //     // Your transaction logic here
    // }

    // Owner can withdraw any token collected from the contract (to convert back to ETH)
    function withdrawToken(address token, uint256 amount) external {
        require(msg.sender == owner, "Not the owner");
        require(supportedTokens[token].transfer(owner, amount), "Token withdrawal failed");
    }
}
