import { all, call, put, select, spawn, take, delay } from "redux-saga/effects"
import * as walletActions from "../../components/wallet/actions"
import * as selectors from "../../selectors"
import { Blockchain } from "../../utils/blockchain"
import { handleErrors } from "../errors/sagas"
import BigNumber from "bignumber.js"

export function* watchEtherBalanceSaga(
  getEtherBalance: () => Promise<BigNumber>
) {
  while (true) {
    try {
      const { value: oldBalance } = yield select(selectors.getEtherBalance)
      const newBalance: BigNumber = yield call(getEtherBalance)
      if (!oldBalance.isEqualTo(newBalance)) {
        yield put(walletActions.setEtherBalance(newBalance))
      }
    } catch (error) {
      yield spawn(handleErrors, error)
    }
    yield delay(1000)
  }
}

export function* watchAddressSaga(getAddress: () => Promise<string>) {
  while (true) {
    try {
      const oldAddress = yield select(selectors.getAddress)
      const newAddress = yield call(getAddress)
      if (oldAddress != newAddress) {
        yield put(walletActions.setAddress(newAddress))
      }
    } catch (error) {
      yield spawn(handleErrors, error)
    }
    yield delay(1000)
  }
}

const createSaga = (blockchain: Blockchain) => {
  return function* defaultSaga() {
    yield all([
      watchEtherBalanceSaga(blockchain.getEtherBalance),
      watchAddressSaga(blockchain.getAddress)
    ])
  }
}

export default (blockchain: Blockchain) => createSaga(blockchain)
