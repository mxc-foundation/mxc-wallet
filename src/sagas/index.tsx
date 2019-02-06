import { all } from 'redux-saga/effects'
import createRedeemTokensButtonSaga from '../components/content/components/RedeemButton/sagas'
import { Blockchain } from '../utils/blockchain'
import { createErrorRecoverSagas } from './errors/sagas'
import createWalletWatcherSaga from './wallet/sagas'
export const createSagas = (blockchain: Blockchain) =>
  function* defaultSaga() {
    yield all([
      createWalletWatcherSaga(blockchain)(),
      createErrorRecoverSagas(blockchain).recoverErrorsSaga(),
      createRedeemTokensButtonSaga(blockchain)(),
    ])
  }

export default (blockchain: Blockchain) => createSagas(blockchain)
