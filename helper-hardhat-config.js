const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeedAddress: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
}
const developmentChains = ["hardhat", "localhost"]
const decimals = 8
const initial_answer = 200000000000
module.exports = { networkConfig, developmentChains, decimals, initial_answer }
