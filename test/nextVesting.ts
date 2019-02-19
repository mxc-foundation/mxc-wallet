const MXCToken = artifacts.require('./MXCToken.sol')
import Web3 from 'web3'
declare var web3: Web3
import { PERIOD_LENGTH_ON_KOVAN } from '../config'
import { readTimeFromChain } from '../src/utils/blockchain'
import * as FnBigNumber from '../src/utils/fnBignumber'
import { getAmountAtNextVesting } from '../src/utils/getAmountAtNextVesting'
import { getTimeToNextVesting } from '../src/utils/getTimeLeftToNextVesting'
import { timeTravel } from './tools/blockchain'
import { assert } from './tools/chai'

const getLock = async (token: any, address: string) => {
  const {
    amount: totalAmount,
    vestedAmount,
    start,
    cliff,
    vesting: end,
  } = await token.vestBalanceOf(address)
  return {
    cliff: parseInt(cliff, 10),
    end: parseInt(end, 10),
    start: parseInt(start, 10),
    totalAmount: FnBigNumber.create(totalAmount),
    vestedAmount: FnBigNumber.create(vestedAmount),
  }
}

contract('Vestable token calculation', ([deployer, user]) => {
  it('Calculate time and amount of next vesting event. Jump to event an vest.', async () => {
    const token = await MXCToken.new({ from: deployer })
    const VESTING_PERIODS = 2
    const CLIFF_PERIODS = 1
    const TOTAL_AMOUNT = 100
    await token.grantTokenStartNow(
      user,
      TOTAL_AMOUNT,
      CLIFF_PERIODS,
      VESTING_PERIODS,
      {
        from: deployer,
      }
    )

    const timeToNextVesting = await getTimeToNextVesting(
      web3,
      token.address,
      user
    )

    assert.equal(
      timeToNextVesting,
      PERIOD_LENGTH_ON_KOVAN + 1,
      'Next vesting time should one period in the future.'
    )

    const nextVestingAmount = await getAmountAtNextVesting(
      web3,
      token.address,
      user
    )

    assert.equal(
      FnBigNumber.toString(nextVestingAmount),
      '50',
      'Next vesting amount should be half of the tokens.'
    )

    await timeTravel(PERIOD_LENGTH_ON_KOVAN - 2, web3)

    await assert.isRejected(token.redeemVestableToken(user))

    await timeTravel(3, web3)

    await token.redeemVestableToken(user)

    const tokenBalance = await token.balanceOf(user)

    assert.equal(tokenBalance, FnBigNumber.toString(nextVestingAmount))
  })
  it('Calculate time and amount of next vesting event. Jump to event an vest. Real world example.', async () => {
    const token = await MXCToken.new({ from: deployer })
    const START_TO_CLIFF = 24 * PERIOD_LENGTH_ON_KOVAN + 20
    const START_TO_END = (487 * PERIOD_LENGTH_ON_KOVAN) / 10
    const TOTAL_AMOUNT = '170588000000000000000000'
    const NOW = await readTimeFromChain(web3)
    await token.grantToken(
      user,
      TOTAL_AMOUNT,
      NOW,
      NOW + START_TO_CLIFF,
      NOW + START_TO_END,
      {
        from: deployer,
      }
    )

    await timeTravel(START_TO_CLIFF - 5, web3)

    await assert.isRejected(token.redeemVestableToken(user))

    timeTravel(6, web3)

    await token.redeemVestableToken(user)

    const tokenBalance = await token.balanceOf(user)

    assert.equal(tokenBalance.toString(), '85293999999999999999984')
  })
})
