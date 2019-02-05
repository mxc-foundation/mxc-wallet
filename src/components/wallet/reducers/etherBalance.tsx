import BigNumber from 'bn.js'
import { combineReducers } from 'redux'
import { getType } from 'typesafe-actions'
import * as FnBigNumber from '../../../utils/fnBignumber'
import * as actions from '../actions'
const etherBalanceValue = (
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

const etherBalance = combineReducers({
  value: etherBalanceValue,
})

export default etherBalance
