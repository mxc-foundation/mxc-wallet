import * as R from 'ramda'
import { createReducer } from 'redux-create-reducer'
import { getType } from 'typesafe-actions'
import * as actions from './actions'

const returnPayload = R.pipe(
  R.nthArg(1),
  R.prop('payload')
)

export const transactions = createReducer([], {
  [getType(actions.refreshTransactions.success)]: returnPayload,
  [getType(actions.fetchTransactions.success)]: returnPayload,
})

export const fetchingTransactions = createReducer(false, {
  [getType(actions.fetchTransactions.request)]: R.T,
  [getType(actions.fetchTransactions.success)]: R.F,
  [getType(actions.fetchTransactions.failure)]: R.F,
})
