import { createStandardAction } from 'typesafe-actions'
import { LockStorage } from './reducers'

export const setAddress = createStandardAction('wallet/SET_ADDRESS')<string>()

export const setEtherBalance = createStandardAction('wallet/SET_ETHER_BALANCE')<
  string
>()

export const setTokenBalance = createStandardAction('wallet/SET_TOKEN_BALANCE')<
  string
>()

export const setTotalAmount = createStandardAction('wallet/SET_TOTAL_AMOUNT')<
  string
>()

export const setVestedAmount = createStandardAction('wallet/SET_VESTED_AMOUNT')<
  string
>()
export const setNow = createStandardAction('wallet/SET_NOW')<number>()

export const setLock = createStandardAction('wallet/SET_LOCK')<LockStorage>()

export const setNetwork = createStandardAction('wallet/SET_NETWORK')<string>()
