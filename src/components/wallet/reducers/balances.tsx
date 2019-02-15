import { combineReducers } from 'redux'
import { getType } from 'typesafe-actions'
import * as actions from '../actions'

export const etherBalance = (
  state: string = '0',
  { type, payload: newBalance }: { type: any; payload: string }
) => {
  switch (type) {
    case getType(actions.setEtherBalance):
      return newBalance
    default:
      return state
  }
}

const tokenBalance = (
  state: string = '0',
  { type, payload: newBalance }: { type: any; payload: string }
) => {
  switch (type) {
    case getType(actions.setTokenBalance):
      return newBalance
    default:
      return state
  }
}

export default combineReducers({
  ether: etherBalance,
  token: tokenBalance,
})
