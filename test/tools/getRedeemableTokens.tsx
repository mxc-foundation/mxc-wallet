import Web3 from 'web3'
import { createMXCToken, readTimeFromChain } from '../../src/utils/blockchain'
import * as FnBigNumber from '../../src/utils/fnBignumber'
import calculateVestableAmount from '../../src/utils/locks/redeemableTokens'

const PERIOD_LENGTH: { [key: string]: number } = {
  '1': 60 * 60 * 24 * 30,
  '42': 60,
}
export const getRedeemableTokens = async (
  theWeb3: Web3,
  tokenAddress: string,
  userAddress: string
): Promise<string> => {
  const tokenContract = createMXCToken(theWeb3, tokenAddress)
  const timeLockData = await tokenContract.methods
    .vestBalanceOf(userAddress)
    .call()
  const networkId = await theWeb3.eth.net.getId()
  const { start, vesting: end, amount, vestedAmount, cliff } = timeLockData
  const now = await readTimeFromChain(theWeb3)
  const vestableTokensAmount = calculateVestableAmount(
    parseInt(start, 10),
    parseInt(end, 10),
    parseInt(cliff, 10),
    FnBigNumber.create(amount),
    FnBigNumber.create(vestedAmount),
    PERIOD_LENGTH[networkId] || 60,
    now
  )

  return Promise.resolve(FnBigNumber.toString(vestableTokensAmount))
}
