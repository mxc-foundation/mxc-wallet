import { BigNumber } from "bignumber.js"
import { applySpec, path, pipe, prop } from "ramda"
import * as R from "ramda"
import { combineReducers } from "redux"
import { getType } from "typesafe-actions"
import * as FnBigNumber from "../../../utils/fnBignumber"
import { idToNetwork, Network } from "../../errors/networkList"
import * as actions from "../actions"
import etherBalance from "./etherBalance"
export const getAddress = prop("address")

const balances = combineReducers({
  ether: etherBalance
})

interface BalanceState {
  value: string
}

export interface WalletState {
  balances: {
    ether: BalanceState
    token: BalanceState
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
  { type, payload: address }: { type: any; payload: string }
) => {
  switch (type) {
    case getType(actions.setAddress):
      return address
    default:
      return state
  }
}

const reducer = combineReducers({
  address,
  balances,
  network
})

type BalanceType = "ether" | "token"

export const selectBalance: (
  type: BalanceType
) => (state: WalletState) => BalanceState = (type: BalanceType) =>
  path(["balances", type]) as (walletState: WalletState) => BalanceState

export const getNetwork: (state: WalletState) => Network = R.pipe(
  R.prop("network"),
  idToNetwork
)

export const getBalanceValue: (
  type: BalanceType
) => (state: WalletState) => BigNumber = (type: BalanceType) =>
  pipe(
    selectBalance(type),
    prop("value"),
    FnBigNumber.create
  )

export interface Balance {
  value: BigNumber
  fiatValue: BigNumber
}

const getBalance: (
  type: BalanceType
) => (state: WalletState) => Balance = type =>
  applySpec({
    value: getBalanceValue(type)
  })

export const getEtherBalance: (state: WalletState) => Balance = getBalance(
  "ether"
)

export default reducer
