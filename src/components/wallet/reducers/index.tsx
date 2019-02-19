import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import { path, pipe, prop } from 'ramda'
import { combineReducers } from 'redux'
import { getType } from 'typesafe-actions'
import {
  PERIOD_LENGTH_ON_KOVAN,
  PERIOD_LENGTH_ON_MAIN_NET
} from '../../../config'
import { amountAtNextVesting } from '../../../utils/amountAtNextVesting'
import { timeUntilNextVestingPossible } from '../../../utils/calculateTimeToNextVesting'
import calculateVestableAmount from '../../../utils/calcVestableAmount'
import * as FnBigNumber from '../../../utils/fnBignumber'
import { idToNetwork, Network } from '../../errors/networkList'
import { TransactionProps } from '../../Transactions'
import { fetchingTransactions, transactions } from '../../Transactions/reducers'
import * as actions from '../actions'
import balances from './balances'
import {
  etherscanBasePathForNetwork,
  etherscanOriginForNetwork
} from './helpers'

export interface LockStorage {
  totalAmount: string
  vestedAmount: string
  start: number
  end: number
  cliff: number
}

export interface Lock {
  totalAmount: BigNumber
  vestedAmount: BigNumber
  start: number
  end: number
  cliff: number
}

export interface LockStorage {
  totalAmount: string
  vestedAmount: string
  start: number
  end: number
  cliff: number
}
export interface WalletState {
  balances: {
    ether: string
    token: string
  }
  address: string
  network: number
  now: number
  lock: LockStorage
  transactions: TransactionProps[]
  fetchingTransactions: boolean
}

const DEFAULT_LOCK = {
  cliff: 0,
  end: 0,
  start: 0,
  totalAmount: '0',
  vestedAmount: '0',
}

const network = (
  state: number = 1,
  { type, payload: networkId }: { type: any; payload: number }
): number => {
  switch (type) {
    case getType(actions.setNetwork):
      return networkId
    default:
      return state
  }
}

const address = (
  state: string = '',
  { type, payload: newAddress }: { type: any; payload: string }
): string => {
  switch (type) {
    case getType(actions.setAddress):
      return newAddress
    default:
      return state
  }
}

export const lock: (
  state: LockStorage | undefined,
  action: any
) => LockStorage = (
  state = DEFAULT_LOCK,
  { type, payload: newLock }: { type: any; payload: LockStorage }
) => {
  switch (type) {
    case getType(actions.setLock):
      return newLock
    default:
      return state
  }
}

export const now: (state: number | undefined, action: any) => number = (
  state = 0,
  { type, payload: newNow }: { type: any; payload: number }
) => {
  switch (type) {
    case getType(actions.setNow):
      return newNow
    default:
      return state
  }
}

const reducer = combineReducers({
  address,
  balances,
  fetchingTransactions,
  lock,
  network,
  now,
  transactions,
})

export const getAddress = prop('address')

const parseLock: (lock: LockStorage) => Lock = R.evolve({
  totalAmount: FnBigNumber.create,
  vestedAmount: FnBigNumber.create,
})

export const parseLockToLockStorage: (lock: Lock) => LockStorage = R.evolve({
  totalAmount: FnBigNumber.toString,
  vestedAmount: FnBigNumber.toString,
})

export const getLock: (state: WalletState) => Lock = R.pipe(
  prop('lock'),
  parseLock
)

const getTotalAmount: (state: WalletState) => BigNumber = R.pipe(
  getLock,
  R.prop('totalAmount')
)

const getVestedAmount: (state: WalletState) => BigNumber = R.pipe(
  getLock,
  R.prop('vestedAmount')
)

const getStart: (state: WalletState) => number = R.path(['lock', 'start']) as (
  state: WalletState
) => number
const getEnd: (state: WalletState) => number = R.path(['lock', 'end']) as (
  state: WalletState
) => number
const getCliff: (state: WalletState) => number = R.path(['lock', 'cliff']) as (
  state: WalletState
) => number
export const getNow: (state: WalletState) => number = R.prop('now') as (
  state: WalletState
) => number

type BalanceType = 'ether' | 'token' | 'lockedTokens' | 'redeemableTokens'

export type Balance = string

export const selectBalance: (
  type: BalanceType
) => (state: WalletState) => Balance = (type: BalanceType) =>
  path(['balances', type]) as (walletState: WalletState) => Balance

export const getNetworkId: (state: WalletState) => number = R.prop('network')

export const getNetwork: (state: WalletState) => Network = R.pipe(
  getNetworkId,
  idToNetwork
)

export const onMainNet: (state: WalletState) => boolean = R.pipe(
  getNetworkId,
  R.equals(1)
)
export const onTestNet: (state: WalletState) => boolean = R.pipe(
  getNetworkId,
  R.equals(42)
)

const getPeriodLength: (state: WalletState) => number = R.cond([
  [onMainNet, R.always(PERIOD_LENGTH_ON_MAIN_NET)],
  [onTestNet, R.always(PERIOD_LENGTH_ON_KOVAN)],
  [R.T, R.always(60)],
])

export const getTimeToNextVestingEvent: (
  state: WalletState
) => number = R.converge(timeUntilNextVestingPossible, [
  getStart,
  getEnd,
  getCliff,
  getTotalAmount,
  getVestedAmount,
  getPeriodLength,
  getNow,
])

export const getBalance: (
  type: BalanceType
) => (state: WalletState) => BigNumber = (type: BalanceType) =>
  pipe(
    selectBalance(type),
    FnBigNumber.create
  )

export const getEtherBalance: (state: WalletState) => BigNumber = getBalance(
  'ether'
)

export const getTokenBalance: (state: WalletState) => BigNumber = getBalance(
  'token'
)

export const getLockedTokensBalance: (
  state: WalletState
) => BigNumber = R.converge(FnBigNumber.subtract, [
  getVestedAmount,
  getTotalAmount,
])

export const getRedeemableTokensBalance: (
  state: WalletState
) => BigNumber = R.converge(calculateVestableAmount, [
  getStart,
  getEnd,
  getCliff,
  getTotalAmount,
  getVestedAmount,
  getPeriodLength,
  getNow,
])

export const getAmountAtNextVesting: (
  state: WalletState
) => BigNumber = R.converge(amountAtNextVesting, [
  getStart,
  getEnd,
  getCliff,
  getTotalAmount,
  getVestedAmount,
  getPeriodLength,
  R.pipe(
    getNow,
    R.add(1)
  ),
])

export const getNetworkName: (state: WalletState) => string = R.pipe(
  getNetwork,
  R.prop('name')
)

export const getEtherscanUrl: (state: WalletState) => string = R.converge(
  R.concat,
  [
    R.pipe(
      getNetworkId,
      etherscanBasePathForNetwork
    ),
    getAddress,
  ]
)

const addLink = (networkId: number) => (
  transaction: TransactionProps
): TransactionProps => ({
  ...transaction,
  link: `${etherscanOriginForNetwork(networkId)}tx/${transaction.hash}`,
})

const addLinks: (
  network: number,
  transactions: TransactionProps[]
) => TransactionProps[] = (networkId, trans) => R.map(addLink(networkId))(trans)

export const getTransactions: (
  state: WalletState
) => TransactionProps[] = R.converge(addLinks, [
  getNetworkId,
  R.prop('transactions'),
])

export const getFetchingTransactions: (state: WalletState) => boolean = R.prop(
  'fetchingTransactions'
)

export default reducer
