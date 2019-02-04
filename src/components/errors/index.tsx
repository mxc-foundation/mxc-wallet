import * as React from 'react'
import { connect } from 'react-redux'
import { getAllMainErrors, State } from '../../selectors'
import { InstallMetamaskCTA, UnlockMetamaskCTA } from './fixMetamask'
import { ErrorsState } from './reducers'
import { UseSupportedNetworkCTA } from './unsupportedNetwork'
const Error = ({
  metaMaskLocked,
  unsupportedNetwork,
  metaMaskNotInstalled,
}: ErrorsState) => {
  if (metaMaskLocked) {
    return <UnlockMetamaskCTA />
  }
  if (unsupportedNetwork) {
    return <UseSupportedNetworkCTA />
  }
  if (metaMaskNotInstalled) {
    return <InstallMetamaskCTA />
  }
  return null
}

const mapStateToProps = (state: State): ErrorsState => {
  return getAllMainErrors(state)
}

export default connect(mapStateToProps)(Error)
