import BigNumber from 'bignumber.js'
import { reset } from 'redux-form'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import { Blockchain } from '../../../../../utils/blockchain'
import * as fnBigNumber from '../../../../../utils/fnBignumber'
import * as actions from './actions'
import { GrantTokenPayload } from './actions'
export const grantTokensSaga = (
  grantTokens: (
    recipient: string,
    amount: BigNumber,
    cliffPeriods: number,
    vestingPeriods: number
  ) => Promise<void>
) =>
  function*({
    payload: { amount, recipient, cliffPeriods, vestingPeriods },
  }: {
    type: any
    payload: GrantTokenPayload
  }) {
    try {
      yield call(
        grantTokens,
        recipient,
        fnBigNumber.create(amount),
        cliffPeriods,
        vestingPeriods
      )
      yield put(actions.grantTokens.success())
      yield put(reset('grantTokens'))
    } catch (error) {
      yield put(actions.grantTokens.failure(error.message))
    }
  }

export const createGrantTokensSaga = (blockchain: Blockchain) =>
  function* watchGrantTokensRequest() {
    yield takeLatest(
      getType(actions.grantTokens.request),
      grantTokensSaga(blockchain.grantTokens)
    )
  }
