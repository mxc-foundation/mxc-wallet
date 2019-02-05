const MXCToken = artifacts.require('./MXCToken.sol')
import { assert } from './tools/chai'

const ONE = 1
const CLIFF_MONTHS = 1
const VESTING_MONTHS = 2
contract('MXCToken', ([deployer, user]) => {
  it('should be possible to send tokens', async () => {
    const token = await MXCToken.new({ from: deployer })
    await token.transfer(user, ONE, { from: deployer })
    const userBalance = await token.balanceOf.call(user)
    assert.equal(userBalance, ONE)
  })
  it('should not be possible to redeem tokens that have not yet vested', async () => {
    const token = await MXCToken.new({ from: deployer })
    await token.grantTokenStartNow(user, ONE, CLIFF_MONTHS, VESTING_MONTHS, {
      from: deployer,
    })
    const [userBalance] = await token.vestBalanceOf.call(user)
    assert.equal(userBalance, ONE)
    await assert.isRejected(token.redeemVestableToken({ from: user }))
  })
})
