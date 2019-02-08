const MXCTokenTruffle = artifacts.require('./MXCToken.sol')
import Web3 from 'web3'
import { createMXCToken } from './../src/utils/blockchain'
import { timeTravel } from './tools/blockchain'
declare var web3: Web3
import { assert } from './tools/chai'
const INITIAL_AMOUNT = '1000000'
const BALANCE_AFTER_2_MONTHS = '2'
const BALANCE_AFTER_4_MONTHS = '4'
const CLIFF_MONTHS = 1
const VESTING_MONTHS = 1000000

contract('MXCToken with TypeChain', ([deployer, user]) => {
  it('should unlock tokens after vesting time', async () => {
    const { address: tokenAddress } = await MXCTokenTruffle.new({
      from: deployer,
    })
    const token = createMXCToken(web3, tokenAddress)
    await token.methods
      .grantTokenStartNow(user, INITIAL_AMOUNT, CLIFF_MONTHS, VESTING_MONTHS)
      .send({ from: deployer, gas: 6721975 })
    await timeTravel(20, web3)
    await token.methods
      .redeemVestableToken(user)
      .send({ from: deployer, gas: 6721975 })
    const unlockedBalance2Months = await token.methods.balanceOf(user).call()
    assert.equal(unlockedBalance2Months, BALANCE_AFTER_2_MONTHS)
    await timeTravel(20, web3)
    await token.methods
      .redeemVestableToken(user)
      .send({ from: deployer, gas: 6721975 })
    const unlockedBalance4Months = await token.methods.balanceOf(user).call()
    assert.equal(unlockedBalance4Months, BALANCE_AFTER_4_MONTHS)
  })
  it('Total amount should be one Million for the user', async () => {
    const { address: tokenAddress } = await MXCTokenTruffle.new({
      from: deployer,
    })
    const token = createMXCToken(web3, tokenAddress)
    await token.methods
      .grantTokenStartNow(user, INITIAL_AMOUNT, CLIFF_MONTHS, VESTING_MONTHS)
      .send({ from: deployer, gas: 6721975 })
    const { amount } = await token.methods.vestBalanceOf(user).call()
    assert.equal(amount, INITIAL_AMOUNT)
  })
})
