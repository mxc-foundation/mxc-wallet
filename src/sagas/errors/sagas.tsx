import { all, call, delay, put, takeLatest } from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import * as actions from '../../components/errors/actions'

import { Blockchain } from '../../utils/blockchain'
import * as errors from '../../utils/errors'

export function* handleErrors(error: Error) {
  switch (error.message) {
    case errors.ERROR_NETWORK_IS_NOT_SUPPORTED:
      yield put(actions.setUnsupportedNetwork())
      break
    case errors.ERROR_NO_ADDRESS_AVAILABLE:
      yield put(actions.setMetamaskLocked())
      break
    default:
      throw error
  }
}

export const createErrorRecoverSagas = (blockchain: Blockchain) => {
  function* recoverUnsupportedNetwork() {
    while (true) {
      yield delay(1000)
      try {
        yield call(blockchain.checkNetwork)
        yield put(actions.unsetUnsupportedNetwork())
        break
        // tslint:disable-next-line no-empty
      } catch (error) {}
    }
  }
  function* recoverLockedMetaMask() {
    while (true) {
      yield delay(1000)
      try {
        yield call(blockchain.getAddress)
        yield put(actions.unsetMetmaskLocked())
        break
        // tslint:disable-next-line no-empty
      } catch (error) {}
    }
  }
  function* recoverUnsupportedNetworkSaga() {
    yield takeLatest(
      getType(actions.setUnsupportedNetwork),
      recoverUnsupportedNetwork
    )
  }

  function* recoverLockedMetaMaskSaga() {
    yield takeLatest(getType(actions.setMetamaskLocked), recoverLockedMetaMask)
  }

  function* recoverErrorsSaga() {
    yield all([recoverUnsupportedNetworkSaga(), recoverLockedMetaMaskSaga()])
  }
  return {
    recoverErrorsSaga,
    recoverLockedMetaMask,
    recoverLockedMetaMaskSaga,
    recoverUnsupportedNetwork,
    recoverUnsupportedNetworkSaga,
  }
}

export default (blockchain: Blockchain) =>
  createErrorRecoverSagas(blockchain).recoverErrorsSaga
