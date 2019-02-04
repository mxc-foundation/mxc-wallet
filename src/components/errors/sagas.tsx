import { all, delay, put, call } from "redux-saga/effects"
import Web3 from "web3"
import * as actions from "./actions"

const metamaskLocked = async (web3: Web3) => !(await web3.eth.getAccounts())[0]

const createSagas = (web3: Web3) => {
  function* metamaskLockedSaga() {
    let isLocked = true
    try {
      while (isLocked) {
        const isLocked = yield call(metamaskLocked, web3)
        if (isLocked) {
          yield put(actions.setMetamaskLocked())
          yield delay(1000)
        }
      }
    } finally {
      yield put(actions.unsetMetmaskLocked())
    }
  }
  function* defaultSaga() {
    yield all([metamaskLockedSaga()])
  }
  return {
    defaultSaga,
    metamaskLockedSaga
  }
}

export default (web3: Web3) => createSagas(web3).defaultSaga
