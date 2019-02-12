import { createStandardAction } from 'typesafe-actions'

export const setAddress = createStandardAction('wallet/SET_ADDRESS')<string>()

export const setEtherBalance = createStandardAction('wallet/SET_ETHER_BALANCE')<
  string
>()

export const setTokenBalance = createStandardAction('wallet/SET_TOKEN_BALANCE')<
  string
>()

export const setLockedTokensBalance = createStandardAction(
  'wallet/SET_LOCKED_TOKENS_BALANCE'
)<string>()

export const setRedeemableTokensBalance = createStandardAction(
  'wallet/SET_REDEEMABLE_TOKENS_BALANCE'
)<string>()

export const setNetwork = createStandardAction('wallet/SET_NETWORK')<string>()
