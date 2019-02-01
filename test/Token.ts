const MXCToken = artifacts.require("MXCToken")

const ONE = 1

contract("MXCToken", ([deployer, user]) => {
  it("should be possible to send tokens", async () => {
    const token = await MXCToken.new({ from: deployer })
    await token.transfer(user, ONE, { from: deployer })
    const userBalance = await token.balanceOf.call(user)
    assert.equal(userBalance, ONE)
  })
})
