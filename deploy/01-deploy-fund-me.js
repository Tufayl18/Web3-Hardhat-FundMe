const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
// module.exports.default = deployFunc

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //use mock when local or hardhat network
    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
        console.log("ethusd in mock: ", ethUsdPriceFeedAddress)
    } else {
        ethUsdPriceFeedAddress =
            networkConfig[chainId]["ethUsdPriceFeedAddress"]
        console.log("ethUsdPriceFeedAddress in sepolia", ethUsdPriceFeedAddress)
    }
    const args = [ethUsdPriceFeedAddress]
    const FundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // pricefeed address
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log("FundMe deployed to:", FundMe.address)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(FundMe.address, args)
    }

    log(
        "------------------------------------------------------------------------"
    )
}

module.exports.tags = ["all", "fundMe"]
