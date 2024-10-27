// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter {
    function getPrice(
        AggregatorV3Interface pricefeed
    ) internal view returns (uint256) {
        (, int256 answer, , , ) = pricefeed.latestRoundData();
        // Eth in USD
        // 3267.00000000
        return uint256(answer * 1e10);
    }

    // function getVersion(
    //     AggregatorV3Interface pricefeed
    // ) internal view returns (uint256) {
    //     return pricefeed.version();
    // }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmtInUSD = (ethPrice * ethAmount) / 1e18;
        return ethAmtInUSD;
    }
}
