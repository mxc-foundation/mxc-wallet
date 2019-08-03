import { all, call, put, select } from 'redux-saga/effects'
import * as selectors from '../../selectors'
import * as actions from './actions'
import { getTransactions, isRecipientContract } from './helpers'
import { TransactionProps } from './index'

export function* refreshTransactions() {
  const address = yield select(selectors.getAddress)
  const network = yield select(selectors.getNetworkId)
  if (address) {
    const transactions = yield call(getTransactions, address, network)
    yield put(actions.refreshTransactions.success(transactions))
  }
}

/**
 * Return the result of fetching and modifying all transactions for a given address and network.
 * If the transaction recipient is found to be a contract address then the transaction is labelled
 * as a contract interaction by setting the transaction's `isRecipientContract` property value to true.
 * If the transaction recipient is found to be the sender's address then the transaction's
 * `isRecipientSender` property value is set to true.
 */
export function* fetchTransactions() {
  yield put(actions.fetchTransactions.request())
  try {
    const address = yield select(selectors.getAddress)
    const network = yield select(selectors.getNetworkId)
    if (address) {
      const transactions = yield call(getTransactions, address, network)
      const newTxs = yield all(transactions.map(async (tx: TransactionProps) => {
        if (!tx || !tx.fromTo) {
          return tx
        }
        if (await isRecipientContract(tx.fromTo, network)) {
          tx.isRecipientContract = true
        }
        if (address === tx.fromTo) {
          tx.isRecipientSender = true
        }
        return tx
      }))

      // const newTxsWithoutDups = newTxs.filter((value: any, index: number, array: any) => {
      //   // Always keep the 0th element as there is nothing before it
      //   // Then check if each element is different than the one before it
      //   return value.hash !== (array[index-1] && array[index-1].hash
      // })

      yield put(actions.fetchTransactions.success(newTxs))
    } else {
      yield put(
        actions.fetchTransactions.failure(new Error('No address found.'))
      )
    }
  } catch (error) {
    yield put(actions.refreshTransactions.failure(error))
  }
}
