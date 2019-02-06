import BigNumber from 'bn.js'
import { all, call, delay, put, select, spawn } from 'redux-saga/effects'
import * as walletActions from '../../components/wallet/actions'
import * as selectors from '../../selectors'
import { Blockchain } from '../../utils/blockchain'
import { handleErrors } from '../errors/sagas'

export function* watchEtherBalanceSaga(
  getEtherBalance: () => Promise<BigNumber>
) {
  while (true) {
    try {
      const { value: oldBalance }: { value: BigNumber } = yield select(
        selectors.getEtherBalance
      )
      const newBalance: BigNumber = yield call(getEtherBalance)
      if (!oldBalance.eq(newBalance)) {
        yield put(walletActions.setEtherBalance(newBalance.toString(10)))
      }
    } catch (error) {
      yield spawn(handleErrors, error)
    }
    yield delay(1000)
  }
}

export function* watchTokenBalanceSaga(
  getTokenBalance: () => Promise<BigNumber>
) {
  while (true) {
    try {
      const { value: oldBalance } = yield select(selectors.getTokenBalance)
      const newBalance: BigNumber = yield call(getTokenBalance)
      if (!oldBalance.eq(newBalance)) {
        yield put(walletActions.setTokenBalance(newBalance.toString(10)))
      }
    } catch (error) {
      yield spawn(handleErrors, error)
    }
    yield delay(1000)
  }
}

export function* watchLockedTokensBalanceSaga(
  getLockedTokensBalance: () => Promise<BigNumber>
) {
  while (true) {
    try {
      const oldBalance: BigNumber = yield select(
        selectors.getLockedTokensBalance
      )
      const newBalance: BigNumber = yield call(getLockedTokensBalance)
      if (!oldBalance.eq(newBalance)) {
        yield put(walletActions.setLockedTokensBalance(newBalance.toString(10)))
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
      if (oldAddress !== newAddress) {
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
      watchAddressSaga(blockchain.getAddress),
      watchTokenBalanceSaga(blockchain.getTokenBalance),
      watchLockedTokensBalanceSaga(blockchain.getLockedTokens),
    ])
  }
}

export default (blockchain: Blockchain) => createSaga(blockchain)
