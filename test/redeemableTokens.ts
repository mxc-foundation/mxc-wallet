const MXCToken = artifacts.require('./MXCToken.sol')
import Web3 from 'web3'
declare var web3: Web3
import { PERIOD_LENGTH_ON_KOVAN } from '../config'
import { timeTravel } from './tools/blockchain'
import { assert } from './tools/chai'
import { getRedeemableTokens } from './tools/getRedeemableTokens'

const INITIAL_AMOUNT = 1000000
const BALANCE_AFTER_2_PERIODS = '2'
const CLIFF_PERIODS = 1
const VESTING_PERIODS = 1000000

contract('Vestable token calculation', ([deployer, user]) => {
  it('Grant some tokens, jump in time.', async () => {
    const token = await MXCToken.new({ from: deployer })
    await token.grantTokenStartNow(
      user,
      INITIAL_AMOUNT,
      CLIFF_PERIODS,
      VESTING_PERIODS,
      {
        from: deployer,
      }
    )
    await timeTravel(2 * PERIOD_LENGTH_ON_KOVAN, web3)

    const vestedTokensOfUser = await getRedeemableTokens(
      web3,
      token.address,
      user
    )
    assert.equal(vestedTokensOfUser, BALANCE_AFTER_2_PERIODS)
  })
  it('Grant some tokens, jump in time after end of total vesting time. ', async () => {
    const token = await MXCToken.new({ from: deployer })
    await token.grantTokenStartNow(
      user,
      INITIAL_AMOUNT,
      CLIFF_PERIODS,
      VESTING_PERIODS,
      {
        from: deployer,
      }
    )
    await timeTravel((VESTING_PERIODS + 1) * PERIOD_LENGTH_ON_KOVAN, web3)

    const vestedTokensOfUser = await getRedeemableTokens(
      web3,
      token.address,
      user
    )
    assert.equal(vestedTokensOfUser, '1000000')
  })
})
