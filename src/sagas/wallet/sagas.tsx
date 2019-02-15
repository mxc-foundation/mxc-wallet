import BigNumber from 'bignumber.js'
import {
  all,
  call,
  delay,
  put,
  select,
  spawn,
  takeLatest
} from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import * as redeemButtonActions from '../../components/content/components/Forms/RedeemTokensPanel/actions'
import * as walletActions from '../../components/wallet/actions'
import {
  Lock,
  LockStorage,
  parseLockToLockStorage
} from '../../components/wallet/reducers'
import * as selectors from '../../selectors'
import { Blockchain } from '../../utils/blockchain'
import { handleErrors } from '../errors/sagas'
import { locksAreDifferent } from './helper/compareLocks'

const UPDATE_INTERVAL = 1000

const createSaga = (blockchain: Blockchain) => {
  function* updateLock() {
    const oldLock: Lock = yield select(selectors.getLock)
    const newLock: Lock = yield call(blockchain.getLock)
    const newLockStorage: LockStorage = parseLockToLockStorage(newLock)
    if (locksAreDifferent(oldLock, newLock)) {
      yield put(walletActions.setLock(newLockStorage))
    }
  }

  function* updateEtherBalance() {
    const oldBalance: BigNumber = yield select(selectors.getEtherBalance)
    const newBalance: BigNumber = yield call(blockchain.getEtherBalance)
    if (!oldBalance.eq(newBalance)) {
      yield put(walletActions.setEtherBalance(newBalance.toString(10)))
    }
  }
  function* updateTokenBalance() {
    const oldBalance: BigNumber = yield select(selectors.getTokenBalance)
    const newBalance: BigNumber = yield call(blockchain.getTokenBalance)
    if (!oldBalance.eq(newBalance)) {
      yield put(walletActions.setTokenBalance(newBalance.toString(10)))
    }
  }

  function* updateNow() {
    const oldNow: number = yield select(selectors.getNow)
    const newNow: number = yield call(blockchain.getNow)
    if (oldNow !== newNow) {
      yield put(walletActions.setNow(newNow))
    }
  }
  function* updateNetwork() {
    const oldNetwork = yield select(selectors.getNetworkId)
    const newNetwork = yield call(blockchain.getNetwork)
    if (newNetwork !== oldNetwork) {
      yield put(walletActions.setNetwork(newNetwork))
    }
  }

  function* watchEtherBalanceSaga() {
    while (true) {
      try {
        yield* updateEtherBalance()
      } catch (error) {
        yield spawn(handleErrors, error)
      }
      yield delay(UPDATE_INTERVAL)
    }
  }

  function* watchNetworkSaga() {
    while (true) {
      try {
        yield* updateNetwork()
      } catch (error) {
        yield spawn(handleErrors, error)
      }
      yield delay(UPDATE_INTERVAL)
    }
  }

  function* watchTokenBalanceSaga() {
    while (true) {
      try {
        yield* updateTokenBalance()
      } catch (error) {
        yield spawn(handleErrors, error)
      }
      yield delay(UPDATE_INTERVAL)
    }
  }

  function* watchNow() {
    while (true) {
      try {
        yield* updateNow()
      } catch (error) {
        yield spawn(handleErrors, error)
      }
      yield delay(UPDATE_INTERVAL)
    }
  }

  function* watchLock() {
    while (true) {
      try {
        yield* updateLock()
      } catch (error) {
        yield spawn(handleErrors, error)
      }
      yield delay(UPDATE_INTERVAL)
    }
  }

  function* updateBalances() {
    yield all([updateLock(), updateTokenBalance(), updateEtherBalance()])
  }

  function* updateBalancesAfterRedemption() {
    yield takeLatest(
      [
        getType(redeemButtonActions.redeemTokens.success),
        getType(walletActions.setAddress),
      ],
      updateBalances
    )
  }

  function* watchAddressSaga() {
    while (true) {
      try {
        const oldAddress = yield select(selectors.getAddress)
        const newAddress = yield call(blockchain.getAddress)
        if (oldAddress !== newAddress) {
          yield put(walletActions.setAddress(newAddress))
        }
      } catch (error) {
        yield spawn(handleErrors, error)
      }
      yield delay(UPDATE_INTERVAL)
    }
  }
  return function* defaultSaga() {
    yield all([
      watchEtherBalanceSaga(),
      watchAddressSaga(),
      watchTokenBalanceSaga(),
      watchLock(),
      watchNetworkSaga(),
      updateBalancesAfterRedemption(),
      watchNow(),
    ])
  }
}

export default (blockchain: Blockchain) => createSaga(blockchain)
