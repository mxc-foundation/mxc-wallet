import * as R from 'ramda'
import { FromTimeLock } from './calcVestableAmount'

const takeEnd = R.nthArg(1)
const takeCliff = R.nthArg(2)
const takeNow = R.nthArg(6)
const takePeriodLength = R.nthArg(5)
const takeStart = R.nthArg(0)

export const nowLowerOrEqualCliff = R.converge(R.lte, [takeNow, takeCliff])

export const nowLowerOrEqualEnd: FromTimeLock<boolean> = R.converge(R.lte, [
  takeNow,
  takeEnd,
])

const nowMinusStart = R.converge(R.subtract, [takeNow, takeStart])

const timePassedOfCurrentPeriod = R.converge(R.modulo, [
  nowMinusStart,
  takePeriodLength,
])

const timeToNextPeriod = R.converge(R.subtract, [
  takePeriodLength,
  timePassedOfCurrentPeriod,
])

const cliffPlusOne = R.pipe(
  takeCliff,
  R.add(1)
)

const startPlusPeriodLenth = R.converge(R.add, [takeStart, takePeriodLength])

const firstTimeRedemptionPossible = R.converge(R.max, [
  cliffPlusOne,
  startPlusPeriodLenth,
])

const firstTimeRedemptionPossibleMinusNow = R.converge(R.subtract, [
  firstTimeRedemptionPossible,
  takeNow,
])

const nowLowerThanFirstTimeRedemptionPossible = R.converge(R.lt, [
  takeNow,
  firstTimeRedemptionPossible,
])

export const timeUntilNextVestingPossible: FromTimeLock<number> = R.cond([
  [
    nowLowerThanFirstTimeRedemptionPossible,
    firstTimeRedemptionPossibleMinusNow,
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
