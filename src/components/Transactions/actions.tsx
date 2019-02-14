import { createStandardAction } from 'typesafe-actions'
import { TransactionProps } from './index'

export const setTransactions = createStandardAction(
  'transactions/SET_TRANSACTIONS'
)<TransactionProps[]>()
