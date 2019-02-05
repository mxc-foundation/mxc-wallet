import BigNumber from 'bn.js'
import { pipe, prop } from 'ramda'
import * as R from 'ramda'
import { createSelector } from 'reselect'

import { Router } from 'react-router'
import { Form } from 'redux-form'

import { Network } from '../components/errors/networkList'
import * as fromErrors from '../components/errors/reducers'
import * as fromWallet from '../components/wallet/reducers'
import { WalletState } from '../components/wallet/reducers'
const walletSelector = prop('wallet')
const accessSelector = prop('access')
const adminPanelSelector = prop('admin')
const errorSelector = prop('errors')

export interface State {
  errors: fromErrors.ErrorsState
  notifications: Notification[]
  wallet: WalletState
  router?: Router
}

export const getAddress: (state: State) => string = createSelector(
  walletSelector,
  fromWallet.getAddress
)

export const getEtherBalance: (
  state: State
) => fromWallet.Balance = createSelector(
  walletSelector,
  fromWallet.getEtherBalance
)

export const getTokenBalance: (
  state: State
) => fromWallet.Balance = createSelector(
  walletSelector,
  fromWallet.getTokenBalance
)

export const getNetwork: (state: State) => Network = createSelector(
  walletSelector,
  fromWallet.getNetwork
)

export const getLockedMetamaskError: (state: State) => boolean = createSelector(
  errorSelector,
  fromErrors.getMetmaskLockedError
)

export const getHasMainError: (state: State) => boolean = createSelector(
  errorSelector,
  fromErrors.getHasMainError
)

export const getAllMainErrors = errorSelector
