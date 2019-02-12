import BigNumber from 'bignumber.js'
import { prop } from 'ramda'
import { Router } from 'react-router'
import { createSelector } from 'reselect'

import { Network } from '../components/errors/networkList'
import * as fromErrors from '../components/errors/reducers'
import * as fromWallet from '../components/wallet/reducers'
import { WalletState } from '../components/wallet/reducers'
const walletSelector = prop('wallet')
const errorSelector = prop('errors')

export interface State {
  errors: fromErrors.ErrorsState
  wallet: WalletState
  router?: Router
}

export const getAddress: (state: State) => string = createSelector(
  walletSelector,
  fromWallet.getAddress
)

export const getEtherBalance: (state: State) => BigNumber = createSelector(
  walletSelector,
  fromWallet.getEtherBalance
)

export const getTokenBalance: (state: State) => BigNumber = createSelector(
  walletSelector,
  fromWallet.getTokenBalance
)

export const getLockedTokensBalance: (
  state: State
) => BigNumber = createSelector(
  walletSelector,
  fromWallet.getLockedTokensBalance
)

export const getRedeemableTokensBalance: (
  state: State
) => BigNumber = createSelector(
  walletSelector,
  fromWallet.getRedeemableTokensBalance
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
