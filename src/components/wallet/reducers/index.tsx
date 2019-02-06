import BigNumber from 'bn.js'
import * as R from 'ramda'
import { applySpec, path, pipe, prop } from 'ramda'
import { combineReducers } from 'redux'
import { getType } from 'typesafe-actions'
import * as FnBigNumber from '../../../utils/fnBignumber'
import { idToNetwork, Network } from '../../errors/networkList'
import * as actions from '../actions'
import etherBalance from './etherBalance'
import lockedTokenBalance from './lockedTokensBalance'
import tokenBalance from './tokenBalance'
export const getAddress = prop('address')

const balances = combineReducers({
  ether: etherBalance,
  lockedTokens: lockedTokenBalance,
  token: tokenBalance,
})

interface BalanceState {
  value: string
}

export interface WalletState {
  balances: {
    ether: BalanceState
    token: BalanceState
    lockedTokens: string
  }
  address: string
  network: string
}

const network = (
  state: string | null = null,
  { type, payload: networkId }: { type: any; payload: string }
) => {
  switch (type) {
    case getType(actions.setNetwork):
      return networkId
    default:
      return state
  }
}

const address = (
  state: string | null = null,
  { type, payload: newAddress }: { type: any; payload: string }
) => {
  switch (type) {
    case getType(actions.setAddress):
      return newAddress
    default:
      return state
  }
}

const reducer = combineReducers({
  address,
  balances,
  network,
})

type BalanceType = 'ether' | 'token'

export const selectBalance: (
  type: BalanceType
) => (state: WalletState) => BalanceState = (type: BalanceType) =>
  path(['balances', type]) as (walletState: WalletState) => BalanceState

export const getNetwork: (state: WalletState) => Network = R.pipe(
  R.prop('network'),
  idToNetwork
)

export const getBalanceValue: (
  type: BalanceType
) => (state: WalletState) => BigNumber = (type: BalanceType) =>
  pipe(
    selectBalance(type),
    prop('value'),
    FnBigNumber.create
  )

export interface Balance {
  value: BigNumber
}

const getBalance: (
  type: BalanceType
) => (state: WalletState) => Balance = type =>
  applySpec({
    value: getBalanceValue(type),
  })

export const getEtherBalance: (state: WalletState) => Balance = getBalance(
  'ether'
)

export const getTokenBalance: (state: WalletState) => Balance = getBalance(
  'token'
)

export const getLockedTokensBalance: (state: WalletState) => BigNumber = R.pipe(
  R.path(['balances', 'lockedTokens']),
  R.defaultTo('0') as any,
  FnBigNumber.create
)

export default reducer
