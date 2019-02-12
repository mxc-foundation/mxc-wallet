import { ActionType, createAsyncAction } from 'typesafe-actions'

export interface GrantTokenPayload {
  amount: string
  vestingPeriods: number
  cliffPeriods: number
  recipient: string
}

export const grantTokens = createAsyncAction(
  'sendTokens/GRANT_TOKENS_REQUEST',
  'sendTokens/GRANT_TOKENS_SUCCESS',
  'sendTokens/GRANT_TOKENS_FAILURE'
)<GrantTokenPayload, void, Error>()

export type SendTokenAction = ActionType<typeof grantTokens>
