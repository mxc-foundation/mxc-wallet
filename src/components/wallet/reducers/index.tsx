import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import { path, pipe, prop } from 'ramda'
import { combineReducers } from 'redux'
import { getType } from 'typesafe-actions'
import * as FnBigNumber from '../../../utils/fnBignumber'
import { idToNetwork, Network } from '../../errors/networkList'
import * as actions from '../actions'
import balances from './balances'
import { etherscanBasePathForNetwork } from './helpers'
export const getAddress = prop('address')

export interface WalletState {
  balances: {
    ether: string
    token: string
    lockedTokens: string
  }
  address: string
  network: number
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

type BalanceType = 'ether' | 'token' | 'lockedTokens' | 'redeemableTokens'

export const selectBalance: (
  type: BalanceType
) => (state: WalletState) => Balance = (type: BalanceType) =>
  path(['balances', type]) as (walletState: WalletState) => Balance

export const getNetworkId: (state: WalletState) => number = R.prop('network')

export const getNetwork: (state: WalletState) => Network = R.pipe(
  getNetworkId,
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

export const getRedeemableTokensBalance: (
  state: WalletState
) => BigNumber = getBalance('redeemableTokens')

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

export default reducer
