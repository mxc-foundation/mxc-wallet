import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { PERIOD_LENGTH_ON_KOVAN } from '../config'
import { amountAtNextVesting } from './amountAtNextVesting'
import { createMXCToken, readTimeFromChain } from './blockchain'
import * as FnBigNumber from './fnBignumber'

export const getAmountAtNextVesting = async (
  theWeb3: Web3,
  tokenAddress: string,
  userAddress: string
): Promise<BigNumber> => {
  const tokenContract = createMXCToken(theWeb3, tokenAddress)
  const timeLockData = await tokenContract.methods
    .vestBalanceOf(userAddress)
    .call()

  const { start, vesting: end, amount, vestedAmount, cliff } = timeLockData
  const now = await readTimeFromChain(theWeb3)
  const amountAtNextVestingEvent = amountAtNextVesting(
    parseInt(start, 10),
    parseInt(end, 10),
    parseInt(cliff, 10),
    FnBigNumber.create(amount),
    FnBigNumber.create(vestedAmount),
    PERIOD_LENGTH_ON_KOVAN,
    now
  )

  return Promise.resolve(amountAtNextVestingEvent)
}
