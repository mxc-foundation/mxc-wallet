import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { State } from '../../../selectors'
import * as selectors from '../../../selectors'
import { TimeLeft } from './TimeLeft'

export interface VestingStatusProps {
  allVested: boolean
}

const allTokensAreVested: (state: State) => boolean = R.pipe(
  selectors.getTimeToNextVestingEvent,
  R.equals(-1)
)

const AllVested = () => <span>All tokens are vested.</span>

const VestingStatus = ({ allVested }: { allVested: boolean }) =>
  allVested ? <AllVested /> : <TimeLeft />

const mapStateToStatusProps: (state: State) => VestingStatusProps = R.applySpec(
  {
    allVested: allTokensAreVested,
  }
)

const ConnectedVestingStatus = connect(mapStateToStatusProps)(VestingStatus)

export { ConnectedVestingStatus as VestingStatus }
