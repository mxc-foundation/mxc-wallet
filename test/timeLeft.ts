const MXCToken = artifacts.require('./MXCToken.sol')
import Web3 from 'web3'
declare var web3: Web3
import { getTimeToNextVesting } from '../src/utils/getTimeLeftToNextVesting'
import { timeTravel } from './tools/blockchain'
import { assert } from './tools/chai'

const INITIAL_AMOUNT = 1000000
const CLIFF_MONTHS = 1
const VESTING_MONTHS = 1000000

contract('Calculate the time left to the next vesting', ([deployer, user]) => {
  it('Grant some tokens, jump in time to the cliff. Get the time left', async () => {
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
    await timeTravel(60, web3)

    const timeToNextVesting = await getTimeToNextVesting(
      web3,
      token.address,
      user
    )
    assert.equal(timeToNextVesting, 0)
  })
  it('Grant some tokens, jump in time. Get the time left', async () => {
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
    await timeTravel(125, web3)

    const timeToNextVesting = await getTimeToNextVesting(
      web3,
      token.address,
      user
    )
    assert.equal(timeToNextVesting, 55)
  })
})
