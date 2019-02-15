import * as R from 'ramda'
import * as selectors from '../../../selectors'
import { State } from '../../../selectors'

export const timeLeftInDays: (timeLeft: number) => string = R.pipe(
  R.flip(R.divide)(60 * 60 * 24),
  Math.round,
  R.toString,
  R.flip(R.concat)(' days')
)

export const timeLeftInSeconds: (timeLeft: number) => string = R.pipe(
  Math.round,
  R.toString,
  R.flip(R.concat)(' seconds')
)

export const timeToNextVestingEventWithCorrectUnits: (
  state: State
) => string = R.cond([
  [
    selectors.getOnTestNet,
    R.pipe(
      selectors.getTimeToNextVestingEvent,
      timeLeftInSeconds
    ),
  ],
  [
    R.T,
    R.pipe(
      selectors.getTimeToNextVestingEvent,
      timeLeftInDays
    ),
  ],
])
