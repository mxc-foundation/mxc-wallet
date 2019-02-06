import BigNumber from 'bn.js'
import { getType } from 'typesafe-actions'
import * as FnBigNumber from '../../../utils/fnBignumber'
import * as actions from '../actions'

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

export default lockedTokenBalance
