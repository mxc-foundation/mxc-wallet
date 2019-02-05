import * as R from 'ramda'
import { ActionType, getType } from 'typesafe-actions'
import * as errorActions from './actions'

export type ErrorsAction = ActionType<typeof errorActions>

export interface ErrorsState {
  metaMaskNotInstalled: boolean
  metaMaskLocked: boolean
  unsupportedNetwork: boolean
}

export default (
  state: ErrorsState = {
    metaMaskLocked: false,
    metaMaskNotInstalled: false,
    unsupportedNetwork: false,
  },
  action: ErrorsAction
): ErrorsState => {
  switch (action.type) {
    case getType(errorActions.setMetamaskLocked):
      // below action type is narrowed to: { type: "todos/ADD"; payload: Todo; }
      return {
        ...state,
        ['metaMaskLocked']: true,
      }
    case getType(errorActions.unsetMetmaskLocked):
      return {
        ...state,
        ['metaMaskLocked']: false,
      }
    case getType(errorActions.setMissingMetaMask):
      return {
        ...state,
        ['metaMaskNotInstalled']: true,
      }
    case getType(errorActions.unsetMissingMetaMask):
      return {
        ...state,
        ['metaMaskNotInstalled']: false,
      }
    case getType(errorActions.setUnsupportedNetwork):
      return {
        ...state,
        ['unsupportedNetwork']: true,
      }
    case getType(errorActions.unsetUnsupportedNetwork):
      return {
        ...state,
        ['unsupportedNetwork']: false,
      }
    default:
      return {
        ...state,
      }
  }
}

export const getMetmaskLockedError: (state: ErrorsState) => boolean = R.prop(
  'metaMaskLocked'
)
export const getHasMainError: (state: ErrorsState) => boolean = R.pipe(
  R.toPairs as any,
  R.reduce((acc, [error, state]) => (state ? R.reduced(true) : acc), false)
)
