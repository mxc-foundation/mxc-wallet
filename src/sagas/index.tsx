import { all } from 'redux-saga/effects'
import createRedeemTokensButtonSaga from '../components/content/components/RedeemTokensForm/sagas'
import { createSendTokensSaga } from '../components/content/components/SendTokensForm/sagas'
import { Blockchain } from '../utils/blockchain'
import { createErrorRecoverSagas } from './errors/sagas'
import createWalletWatcherSaga from './wallet/sagas'
export const createSagas = (blockchain: Blockchain) =>
  function* defaultSaga() {
    yield all([
      createWalletWatcherSaga(blockchain)(),
      createErrorRecoverSagas(blockchain).recoverErrorsSaga(),
      createRedeemTokensButtonSaga(blockchain)(),
      createSendTokensSaga(blockchain)(),
    ])
  }

export default (blockchain: Blockchain) => createSagas(blockchain)
