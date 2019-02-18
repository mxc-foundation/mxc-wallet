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

const cliffMinusStart = R.converge(R.subtract, [takeCliff, takeStart])

const beginningOfPeriodToCliff = R.converge(R.modulo, [
  cliffMinusStart,
  takePeriodLength,
])

const cliffToPeriodEnd = R.converge(R.subtract, [
  takePeriodLength,
  beginningOfPeriodToCliff,
])

const periodEndAfterCliff = R.converge(R.add, [takeCliff, cliffToPeriodEnd])

const cliffMinusNow = R.converge(R.subtract, [takeCliff, takeNow])

const periodEndAfterCliffMinusNow = R.cond([
  [
    R.pipe(
      beginningOfPeriodToCliff,
      R.equals(0)
    ),
    cliffMinusNow,
  ],
  [R.T, R.converge(R.subtract, [periodEndAfterCliff, takeNow])],
])

const endMinusNow = R.converge(R.subtract, [takeEnd, takeNow])

const timeToNextPeriod = R.converge(R.modulo, [endMinusNow, takePeriodLength])

export const calculateTimeToNextVesting: FromTimeLock<number> = R.cond([
  [nowLowerOrEqualCliff, periodEndAfterCliffMinusNow],
  [nowLowerOrEqualEnd, timeToNextPeriod],
  [R.T, R.always(-1)],
])
