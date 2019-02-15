// http://api.kovan.etherscan.io/api?module=account&action=txlist&address=0xceC7a6E1883b9bA85D5608717C5F9D78c288cBCB&sort=asc&apikey=GKBJXUY561Q8URUJPXQKAGPACWQU1D1GEN
import { call, put, select } from 'redux-saga/effects'
import * as selectors from '../../selectors'
import * as actions from './actions'
import { getTransactions } from './helpers'

export function* updateTransactions() {
  const address = yield select(selectors.getAddress)
  const network = yield select(selectors.getNetworkId)
  if (address) {
    const transactions = yield call(getTransactions, address, network)
    yield put(actions.setTransactions(transactions))
  }
}
