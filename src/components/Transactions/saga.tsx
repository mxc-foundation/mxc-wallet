import { call, put, select } from 'redux-saga/effects'
import * as selectors from '../../selectors'
import * as actions from './actions'
import { getTransactions, tweakTxs } from './helpers'

// Refreshing and tweak all transactions for a given address and network.
export function* refreshTransactions() {
  const address = yield select(selectors.getAddress)
  const network = yield select(selectors.getNetworkId)
  if (address) {
    const transactions = yield call(getTransactions, address, network)
    const tweakedTxs = yield call(tweakTxs, transactions, address, network)
    yield put(actions.refreshTransactions.success(tweakedTxs))
  }
}

// Fetch and tweak all transactions for a given address and network.
export function* fetchTransactions() {
  yield put(actions.fetchTransactions.request())
  try {
    const address = yield select(selectors.getAddress)
    const network = yield select(selectors.getNetworkId)
    if (address) {
      const transactions = yield call(getTransactions, address, network)
      const tweakedTxs = yield call(tweakTxs, transactions, address, network)

      yield put(actions.fetchTransactions.success(tweakedTxs))
    } else {
      yield put(
        actions.fetchTransactions.failure(new Error('No address found.'))
      )
    }
  } catch (error) {
    yield put(actions.refreshTransactions.failure(error))
  }
}
