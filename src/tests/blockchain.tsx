import { Blockchain } from '../utils/blockchain'
import { create } from '../utils/fnBignumber'

export const createTestBlockchain: () => Blockchain = () => ({
  addAMLAdmin: () => Promise.resolve(),
  addKYCAdmin: () => Promise.resolve(),
  amlCompleted: () => Promise.resolve(true),
  buyTokens: () => Promise.resolve(undefined),
  checkNetwork: () => Promise.resolve(undefined),
  getAddress: () => Promise.resolve('123'),
  getEtherBalance: () => Promise.resolve(create(0)),
  getEtherToTokenRate: () => Promise.resolve(create(0)),
  getNetwork: () => Promise.resolve(1),
  getTokenBalance: () => Promise.resolve(create(0)),
  isAMLAdmin: () => Promise.resolve(false),
  isKYCAdmin: () => Promise.resolve(false),
  isOwner: () => Promise.resolve(false),
  kycCompleted: () => Promise.resolve(true),
  sendTokens: () => Promise.resolve(undefined),
  setAMLCompleted: () => Promise.resolve(),
  setKYCCompleted: () => Promise.resolve(),
  unsetAMLCompleted: () => Promise.resolve(),
  unsetKYCCompleted: () => Promise.resolve(),
})
