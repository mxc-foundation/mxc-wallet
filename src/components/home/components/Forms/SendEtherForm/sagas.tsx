import BigNumber from 'bignumber.js'
import { reset } from 'redux-form'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import { Blockchain } from '../../../../../utils/blockchain'
import * as fnBigNumber from '../../../../../utils/fnBignumber'
import * as actions from './actions'
import { SendEtherPayload } from './actions'
export const sendEtherSaga = (
  sendEther: (amount: BigNumber, recipient: string) => Promise<void>
) =>
  function*({
    payload: { amount, recipient },
  }: {
    type: any
    payload: SendEtherPayload
  }) {
    try {
      yield call(sendEther, fnBigNumber.create(amount), recipient)
      yield put(actions.sendEther.success())
      yield put(reset('sendEther'))
    } catch (error) {
      yield put(actions.sendEther.failure(error.message))
    }
  }

export const createsendEtherSaga = (blockchain: Blockchain) =>
  function* watchsendEtherRequest() {
    yield takeLatest(
      getType(actions.sendEther.request),
      sendEtherSaga(blockchain.sendEther)
    )
  }
