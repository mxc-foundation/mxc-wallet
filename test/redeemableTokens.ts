const MXCToken = artifacts.require('./MXCToken.sol')
import Web3 from 'web3'
declare var web3: Web3
import { getRedeemableTokens } from '../src/utils/getRedeemableTokens'
import { timeTravel } from './tools/blockchain'
import { assert } from './tools/chai'

const INITIAL_AMOUNT = 1000000
const BALANCE_AFTER_2_MONTHS = '2'
const CLIFF_MONTHS = 1
const VESTING_MONTHS = 1000000

contract('Vestable token calculation', ([deployer, user]) => {
  it('Grant some tokens, jump in time.', async () => {
    const token = await MXCToken.new({ from: deployer })
    await token.grantTokenStartNow(
      user,
      INITIAL_AMOUNT,
      CLIFF_MONTHS,
      VESTING_MONTHS,
      {
        from: deployer,
      }
    )
    await timeTravel(20, web3)

    const vestedTokensOfUser = await getRedeemableTokens(
      web3,
      token.address,
      user
    )
    assert.equal(vestedTokensOfUser, BALANCE_AFTER_2_MONTHS)
  })
  it('Grant some tokens, jump in time after end of total vesting time. ', async () => {
    const token = await MXCToken.new({ from: deployer })
    await token.grantTokenStartNow(
      user,
      INITIAL_AMOUNT,
      CLIFF_MONTHS,
      VESTING_MONTHS,
      {
        from: deployer,
      }
    )
    await timeTravel(10000000, web3)

    const vestedTokensOfUser = await getRedeemableTokens(
      web3,
      token.address,
      user
    )
    assert.equal(vestedTokensOfUser, '1000000')
  })
})
