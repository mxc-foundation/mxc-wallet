import { ActionType, createAsyncAction } from 'typesafe-actions'

export interface SendEtherPayload {
  amount: string
  recipient: string
}

export const sendEther = createAsyncAction(
  'sendEther/SEND_ETHER_REQUEST',
  'sendEther/SEND_ETHER_REQUEST',
  'sendEther/SEND_ETHER_REQUEST'
)<SendEtherPayload, void, Error>()

export type SendTokenAction = ActionType<typeof sendEther>
