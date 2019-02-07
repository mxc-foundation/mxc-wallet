import BigNumber from 'bignumber.js'
import { combineReducers } from 'redux'
import { getType } from 'typesafe-actions'
import * as FnBigNumber from '../../../utils/fnBignumber'
import * as actions from '../actions'
export const etherBalance = (
  state: string = '0',
  { type, payload: newBalance }: { type: any; payload: BigNumber }
) => {
  switch (type) {
    case getType(actions.setEtherBalance):
      return FnBigNumber.toString(newBalance)
    default:
      return state
  }
}

export const lockedTokenBalance = (
  state: string = '0',
  { type, payload: newBalance }: { type: any; payload: BigNumber }
) => {
  switch (type) {
    case getType(actions.setLockedTokensBalance):
      return FnBigNumber.toString(newBalance)
    default:
      return state
  }
}

const tokenBalance = (
  state: string = '0',
  { type, payload: newBalance }: { type: any; payload: BigNumber }
) => {
  switch (type) {
    case getType(actions.setTokenBalance):
      return newBalance.toString()
    default:
      return state
  }
}

export default combineReducers({
  ether: etherBalance,
  lockedTokens: lockedTokenBalance,
  token: tokenBalance,
})
