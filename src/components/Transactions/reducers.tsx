import * as R from 'ramda'
import { createReducer } from 'redux-create-reducer'
import { getType } from 'typesafe-actions'
import * as actions from './actions'

const returnPayload = R.pipe(
  R.nthArg(1),
  R.prop('payload')
)

export const transactions = createReducer([], {
  [getType(actions.setTransactions)]: returnPayload,
})
