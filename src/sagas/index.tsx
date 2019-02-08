import { all } from 'redux-saga/effects'
import createRedeemTokensButtonSaga from '../components/content/components/Forms/RedeemTokensForm/sagas'
import { createsendEtherSaga } from '../components/content/components/Forms/SendEtherForm/sagas'
import { createSendTokensSaga } from '../components/content/components/Forms/SendTokensForm/sagas'
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
      createsendEtherSaga(blockchain)(),
    ])
  }

export default (blockchain: Blockchain) => createSagas(blockchain)
