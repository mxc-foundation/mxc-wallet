import Web3 from 'web3'
import { createMXCToken, readTimeFromChain } from './blockchain'
import calculateVestableAmount from './calcVestableAmount'
import * as FnBigNumber from './fnBignumber'

export const getRedeemableTokens = async (
  theWeb3: Web3,
  tokenAddress: string,
  userAddress: string
): Promise<string> => {
  const tokenContract = createMXCToken(theWeb3, tokenAddress)
  const timeLockData = await tokenContract.methods
    .vestBalanceOf(userAddress)
    .call()

  const { start, vesting: end, amount, vestedAmount, cliff } = timeLockData
  const now = await readTimeFromChain(theWeb3)
  const vestableTokensAmount = calculateVestableAmount(
    parseInt(start, 10),
    parseInt(end, 10),
    parseInt(cliff, 10),
    FnBigNumber.create(amount),
    FnBigNumber.create(vestedAmount),
    10,
    now
  )

  return Promise.resolve(FnBigNumber.toString(vestableTokensAmount))
}
