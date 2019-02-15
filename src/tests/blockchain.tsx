import BigNumber from 'bignumber.js'
import { Blockchain } from '../utils/blockchain'
import { create } from '../utils/fnBignumber'

export const createTestBlockchain: () => Blockchain = () => ({
  checkNetwork: () => Promise.resolve(undefined),
  getAddress: () => Promise.resolve('123'),
  getEtherBalance: () => Promise.resolve(create(0)),
  getLock: () =>
    Promise.resolve({
      cliff: 0,
      end: 0,
      start: 0,
      totalAmount: create('0'),
      vestedAmount: create('0'),
    }),
  getNetwork: () => Promise.resolve(1),
  getNow: () => Promise.resolve(0),
  getTokenBalance: () => Promise.resolve(create(0)),
  grantTokens: (
    recipient: string,
    amount: BigNumber,
    cliffPeriods: number,
    vestingPeriods: number
  ) => Promise.resolve(),
  redeemTokens: () => Promise.resolve(),
  sendEther: (amount: BigNumber, recipient: string) => Promise.resolve(),
  sendTokens: (amount: BigNumber, recipient: string) => Promise.resolve(),
})
