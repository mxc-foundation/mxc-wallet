import { createAsyncAction } from 'typesafe-actions'

export const redeemTokens = createAsyncAction(
  'wallet/REDEEM_TOKENS_REQUEST',
  'wallet/REDEEM_TOKENS_SUCCESS',
  'wallet/REDEEM_TOKENS_FAILURE'
)<void, void, string>()
