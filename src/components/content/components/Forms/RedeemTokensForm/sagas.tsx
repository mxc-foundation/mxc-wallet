import { call, put, takeLatest } from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import { Blockchain } from '../../../../../utils/blockchain'
import * as actions from './actions'

const createRedeemTokensSaga = (redeemTokens: () => Promise<void>) =>
  function* redeemTokensSaga() {
    try {
      yield call(redeemTokens)
      yield put(actions.redeemTokens.success())
    } catch (error) {
      yield put(actions.redeemTokens.failure(error.message))
    }
  }

const createSaga = (blockchain: Blockchain) =>
  function* redeemTokensButtonSaga() {
    yield takeLatest(
      getType(actions.redeemTokens.request),
      createRedeemTokensSaga(blockchain.redeemTokens)
    )
  }

export default createSaga
