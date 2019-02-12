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
import * as redeemButtonActions from '../../components/content/components/Forms/RedeemTokensForm/actions'
import * as walletActions from '../../components/wallet/actions'
import * as selectors from '../../selectors'
import { Blockchain } from '../../utils/blockchain'
import { handleErrors } from '../errors/sagas'

const createSaga = (blockchain: Blockchain) => {
  function* updateLockedTokensBalance() {
    const oldBalance: BigNumber = yield select(selectors.getLockedTokensBalance)
    const newBalance: BigNumber = yield call(blockchain.getLockedTokens)
    if (!oldBalance.eq(newBalance)) {
      yield put(walletActions.setLockedTokensBalance(newBalance.toString(10)))
    }
  }

  function* updateRedeemableTokensBalance() {
    const oldBalance: BigNumber = yield select(
      selectors.getRedeemableTokensBalance
    )
    const newBalance: BigNumber = yield call(
      blockchain.getRedeemableTokensBalance
    )
    if (!oldBalance.eq(newBalance)) {
      yield put(
        walletActions.setRedeemableTokensBalance(newBalance.toString(10))
      )
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
  function* watchEtherBalanceSaga() {
    while (true) {
      try {
        yield* updateEtherBalance()
      } catch (error) {
        yield spawn(handleErrors, error)
      }
      yield delay(1000)
    }
  }

  function* watchTokenBalanceSaga() {
    while (true) {
      try {
        yield* updateTokenBalance()
      } catch (error) {
        yield spawn(handleErrors, error)
      }
      yield delay(1000)
    }
  }

  function* watchLockedTokensBalanceSaga() {
    while (true) {
      try {
        yield* updateLockedTokensBalance()
      } catch (error) {
        yield spawn(handleErrors, error)
      }
      yield delay(60000)
    }
  }

  function* watchRedeemableTokensBalanceSaga() {
    while (true) {
      try {
        yield* updateRedeemableTokensBalance()
      } catch (error) {
        yield spawn(handleErrors, error)
      }
      yield delay(60000)
    }
  }
  function* updateBalances() {
    yield all([
      updateLockedTokensBalance(),
      updateRedeemableTokensBalance(),
      updateTokenBalance(),
      updateEtherBalance(),
    ])
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
      yield delay(1000)
    }
  }
  return function* defaultSaga() {
    yield all([
      watchEtherBalanceSaga(),
      watchAddressSaga(),
      watchTokenBalanceSaga(),
      watchLockedTokensBalanceSaga(),
      watchRedeemableTokensBalanceSaga(),
      updateBalancesAfterRedemption(),
    ])
  }
}

export default (blockchain: Blockchain) => createSaga(blockchain)
