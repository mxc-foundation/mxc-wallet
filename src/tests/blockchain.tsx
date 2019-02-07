import BigNumber from 'bignumber.js'
import { Blockchain } from '../utils/blockchain'
import { create } from '../utils/fnBignumber'

export const createTestBlockchain: () => Blockchain = () => ({
  checkNetwork: () => Promise.resolve(undefined),
  getAddress: () => Promise.resolve('123'),
  getEtherBalance: () => Promise.resolve(create(0)),
  getLockedTokens: () => Promise.resolve(create(0)),
  getNetwork: () => Promise.resolve(1),
  getTokenBalance: () => Promise.resolve(create(0)),
  redeemTokens: () => Promise.resolve(),
  sendTokens: (amount: BigNumber, recipient: string) => Promise.resolve(),
})
