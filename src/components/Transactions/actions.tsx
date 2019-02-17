import { createAsyncAction } from 'typesafe-actions'
import { TransactionProps } from './index'

export const refreshTransactions = createAsyncAction(
  'transactions/REFRESH_TRANSACTIONS_REQUEST',
  'transactions/REFRESH_TRANSACTIONS_SUCCESS',
  'transactions/REFRESH_TRANSACTIONS_FAILURE'
)<void, TransactionProps[], Error>()

export const fetchTransactions = createAsyncAction(
  'transactions/FETCH_TRANSACTIONS_REQUEST',
  'transactions/FETCH_TRANSACTIONS_SUCCESS',
  'transactions/FETCH_TRANSACTIONS_FAILURE'
)<void, TransactionProps[], Error>()
