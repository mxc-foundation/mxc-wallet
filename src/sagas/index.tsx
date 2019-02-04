import { all } from "redux-saga/effects"
import { Blockchain } from "../utils/blockchain"
import { createErrorRecoverSagas } from "./errors/sagas"
import createWalletWatcherSaga from "./wallet/sagas"
export const createSagas = (blockchain: Blockchain) =>
  function* defaultSaga() {
    yield all([
      createWalletWatcherSaga(blockchain)(),
      createErrorRecoverSagas(blockchain).recoverErrorsSaga()
    ])
  }

export default (blockchain: Blockchain) => createSagas(blockchain)
