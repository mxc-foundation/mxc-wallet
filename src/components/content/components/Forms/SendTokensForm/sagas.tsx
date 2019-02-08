import BigNumber from 'bignumber.js'
import { reset } from 'redux-form'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import { Blockchain } from '../../../../../utils/blockchain'
import * as fnBigNumber from '../../../../../utils/fnBignumber'
import * as actions from './actions'
import { SendTokenPayload } from './actions'
export const sendTokensSaga = (
  sendTokens: (amount: BigNumber, recipient: string) => Promise<void>
) =>
  function*({
    payload: { amount, recipient },
  }: {
    type: any
    payload: SendTokenPayload
  }) {
    try {
      yield call(sendTokens, fnBigNumber.create(amount), recipient)
      yield put(actions.sendTokens.success())
      yield put(reset('sendTokens'))
    } catch (error) {
      yield put(actions.sendTokens.failure(error.message))
    }
  }

export const createSendTokensSaga = (blockchain: Blockchain) =>
  function* watchSendTokensRequest() {
    yield takeLatest(
      getType(actions.sendTokens.request),
      sendTokensSaga(blockchain.sendTokens)
    )
  }
