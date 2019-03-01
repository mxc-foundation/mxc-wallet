const MXCToken = artifacts.require('./MXCToken.sol')
import Web3 from 'web3'
declare var web3: Web3
import { PERIOD_LENGTH_ON_KOVAN } from '../config'
import { timeTravel } from './tools/blockchain'
import { assert } from './tools/chai'
import { getTimeToNextVestingOnKovan } from './tools/getTimeLeftToNextVesting'

const INITIAL_AMOUNT = 100
const CLIFF_MONTHS = 1
const VESTING_MONTHS = 2

contract('Calculate the time left to the next vesting', ([deployer, user]) => {
  it('Grant some tokens, jump in time to the second after cliff. Get the time until the end of the period', async () => {
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
    await timeTravel(PERIOD_LENGTH_ON_KOVAN + 1, web3)

    const timeToNextVesting = await getTimeToNextVestingOnKovan(
      web3,
      token.address,
      user
    )
    assert.equal(timeToNextVesting, 59)
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
    await timeTravel(PERIOD_LENGTH_ON_KOVAN / 2, web3)

    const timeToNextVesting = await getTimeToNextVestingOnKovan(
      web3,
      token.address,
      user
    )
    assert.equal(timeToNextVesting, 31)
  })
})
