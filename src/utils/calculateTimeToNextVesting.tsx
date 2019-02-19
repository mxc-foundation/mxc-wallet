import * as R from 'ramda'
import { FromTimeLock } from './calcVestableAmount'

const takeEnd = R.nthArg(1)
const takeCliff = R.nthArg(2)
const takeNow = R.nthArg(6)
const takePeriodLength = R.nthArg(5)

export const nowLowerOrEqualCliff = R.converge(R.lte, [takeNow, takeCliff])

export const nowLowerOrEqualEnd: FromTimeLock<boolean> = R.converge(R.lte, [
  takeNow,
  takeEnd,
])

const cliffMinusNow = R.converge(R.subtract, [takeCliff, takeNow])

const endMinusNow = R.converge(R.subtract, [takeEnd, takeNow])

const timeToNextPeriod = R.converge(R.modulo, [endMinusNow, takePeriodLength])

export const timeUntilNextVestingPossible: FromTimeLock<number> = R.cond([
  [
    nowLowerOrEqualCliff,
    R.pipe(
      cliffMinusNow,
      R.add(1)
    ),
  ],
  [
    nowLowerOrEqualEnd,
    R.ifElse(
      R.pipe(
        timeToNextPeriod,
        R.lt(0)
      ),
      timeToNextPeriod,
      takePeriodLength
    ),
  ],
  [R.T, R.always(-1)],
])
