import { ActionType, createAsyncAction } from 'typesafe-actions'

export interface SendTokenPayload {
  amount: string
  recipient: string
}

export const sendTokens = createAsyncAction(
  'sendTokens/SEND_TOKENS_REQUEST',
  'sendTokens/SEND_TOKENS_SUCCESS',
  'sendTokens/SEND_TOKENS_FAILURE'
)<SendTokenPayload, void, Error>()

export type SendTokenAction = ActionType<typeof sendTokens>
