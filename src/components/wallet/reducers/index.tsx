import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import { path, pipe, prop } from 'ramda'
import { combineReducers } from 'redux'
import { getType } from 'typesafe-actions'
import * as FnBigNumber from '../../../utils/fnBignumber'
import { idToNetwork, Network } from '../../errors/networkList'
import * as actions from '../actions'
import balances from './balances'
export const getAddress = prop('address')

export interface WalletState {
  balances: {
    ether: string
    token: string
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

type BalanceType = 'ether' | 'token' | 'lockedTokens'

export const selectBalance: (
  type: BalanceType
) => (state: WalletState) => Balance = (type: BalanceType) =>
  path(['balances', type]) as (walletState: WalletState) => Balance

export const getNetwork: (state: WalletState) => Network = R.pipe(
  R.prop('network'),
  idToNetwork
)

export const getBalance: (
  type: BalanceType
) => (state: WalletState) => BigNumber = (type: BalanceType) =>
  pipe(
    selectBalance(type),
    FnBigNumber.create
  )

export type Balance = string

export const getEtherBalance: (state: WalletState) => BigNumber = getBalance(
  'ether'
)

export const getTokenBalance: (state: WalletState) => BigNumber = getBalance(
  'token'
)

export const getLockedTokensBalance: (
  state: WalletState
) => BigNumber = getBalance('lockedTokens')

export default reducer
