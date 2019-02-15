import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { State } from '../../../selectors'
import * as selectors from '../../../selectors'
import * as FnBigNumber from '../../../utils/fnBignumber'
import { timeToNextVestingEventWithCorrectUnits } from '../helpers/timeLeftWithUnits'

interface TimeLeftProps {
  timeToNextVestingEvent: string
  nextAmount: string
}

const TimeLeft = ({ timeToNextVestingEvent, nextAmount }: TimeLeftProps) => (
  <span>{`You have currrently no tokens to redeem. In ${timeToNextVestingEvent} you can redeem ${nextAmount} tokens.`}</span>
)

const mapStateToTimeLeftProps: (state: State) => TimeLeftProps = R.applySpec({
  nextAmount: R.pipe(
    selectors.getAmountAtNextVesting,
    FnBigNumber.fromWei,
    FnBigNumber.toString
  ),
  timeToNextVestingEvent: timeToNextVestingEventWithCorrectUnits,
})

const ConnectedTimeLeft = connect(mapStateToTimeLeftProps)(TimeLeft)

export { ConnectedTimeLeft as TimeLeft }
