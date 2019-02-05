import BigNumber from 'bn.js'
import { combineReducers } from 'redux'
import { getType } from 'typesafe-actions'
import * as actions from '../actions'

const etherBalanceValue = (
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

const etherBalance = combineReducers({
  value: etherBalanceValue,
})

export default etherBalance
