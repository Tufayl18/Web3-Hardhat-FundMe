const { deployments, ethers, getNamedAccounts, network } = require("hardhat")
const { developmentchains } = require("../helper-hardhat-config")
const { assert } = require("ethers")

//staging test onlu runs on testnet
developmentchains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
          let fundMe, deployer
          const sendValue = ethers.parseEther("1")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              fundMe = await ethers.getContract("FundMe", deployer)
          })

          it("Allows people to fund and withdraw", async () => {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingFundMeBalance = await ethers.provider.getBalance(
                  fundMe.target
              )
              assert.equal(endingFundMeBalance.toString(), "0")
          })
      })
