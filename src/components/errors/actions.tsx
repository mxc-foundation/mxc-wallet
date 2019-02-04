import { createStandardAction } from 'typesafe-actions'

export const setMissingMetaMask = createStandardAction(
  'error/SSET_METAMASK_MISSING'
)<void>()
export const unsetMissingMetaMask = createStandardAction(
  'error/UNSET_METAMASK_MISSING'
)<void>()
export const setUnsupportedNetwork = createStandardAction(
  'error/SET_UNSUPPORTED_NETWORK'
)<void>()
export const unsetUnsupportedNetwork = createStandardAction(
  'error/UNSET_UNSUPPORTED_NETWORK'
)<void>()

export const setMetamaskLocked = createStandardAction(
  'error/SET_METAMASK_LOCKED'
)<void>()
export const unsetMetmaskLocked = createStandardAction(
  'error/UNSET_METAMASK_LOCKED'
)<void>()
