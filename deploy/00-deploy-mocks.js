const {
    developmentChains,
    decimals,
    initial_answer,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    console.log("Network Name:", network.name)
    if (developmentChains.includes(network.name)) {
        console.log("local network detected! deploying mock")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [decimals, initial_answer],
        })
        log("Mocks deployed")
        log(
            "------------------------------------------------------------------------"
        )
    }
}
module.exports.tags = ["all", "mocks"]
