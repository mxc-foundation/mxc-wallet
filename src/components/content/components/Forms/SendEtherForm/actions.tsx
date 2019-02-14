import { ActionType, createAsyncAction } from 'typesafe-actions'

export interface SendEtherPayload {
  amount: string
  recipient: string
}

export const sendEther = createAsyncAction(
  'sendEther/SEND_ETHER_REQUEST',
  'sendEther/SEND_ETHER_SUCCESS',
  'sendEther/SEND_ETHER_FAILURE'
)<SendEtherPayload, void, Error>()

export type SendTokenAction = ActionType<typeof sendEther>
