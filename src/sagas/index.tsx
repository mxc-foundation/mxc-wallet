import { all } from 'redux-saga/effects'
import { createGrantTokensSaga } from '../components/home/components/Forms/GrantTokensForm/sagas'
import createRedeemTokensButtonSaga from '../components/home/components/Forms/RedeemTokensPanel/sagas'
import { createsendEtherSaga } from '../components/home/components/Forms/SendEtherForm/sagas'
import { createSendTokensSaga } from '../components/home/components/Forms/SendTokensForm/sagas'
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
      createGrantTokensSaga(blockchain)(),
    ])
  }

export default (blockchain: Blockchain) => createSagas(blockchain)
