const { run } = require("hardhat")

const verify = async (contractAddress, args) => {
    console.log("Verifying")
    try {
        await hre.run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log(`${contractAddress} verified`)
    } catch (e) {
        if (e.message.toLowerCase().includes("already been verified")) {
            return console.log("Already Verified")
        }
        console.log("Error", e)
    }
}

module.exports = { verify }
