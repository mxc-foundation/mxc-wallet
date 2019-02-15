import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import * as FnBigNumber from './fnBignumber'

const cliffNotYetReached = (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  now: number
): boolean => R.lt(now, cliff)

const allVested = (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  now: number
): boolean => R.gte(now, end)

const totalTimeOfVestingPhase = (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  now: number
): number => R.subtract(end, start)

const vestingRate = (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  now: number
): BigNumber =>
  FnBigNumber.dividedBy(
    FnBigNumber.create(
      totalTimeOfVestingPhase(start, end, cliff, totalAmount, vestedAmount, now)
    ),
    totalAmount
  )

const timeSinceTokensHaveBeengranted = (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  now: number
): BigNumber => FnBigNumber.create(R.subtract(now, start))

const totalVestedTokens: (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  now: number
) => BigNumber = R.converge(FnBigNumber.multipliedBy, [
  timeSinceTokensHaveBeengranted,
  vestingRate,
])

export const getVestedAmount: (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  now: number
) => BigNumber = R.nthArg(4)

const calcVestableAmount = (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  now: number
): BigNumber => {
  if (cliffNotYetReached(start, end, cliff, totalAmount, vestedAmount, now)) {
    return FnBigNumber.create(0)
  }
  if (allVested(start, end, cliff, totalAmount, vestedAmount, now)) {
    return FnBigNumber.subtract(vestedAmount, totalAmount)
  }
  return FnBigNumber.subtract(
    getVestedAmount(start, end, cliff, totalAmount, vestedAmount, now),
    totalVestedTokens(start, end, cliff, totalAmount, vestedAmount, now)
  )
}

export const timeSinceStart: (
  periodLength: number,
  start: number,
  now: number
) => number = R.converge(R.subtract, [R.nthArg(2), R.nthArg(1)])

export const remainder: (
  periodLength: number,
  start: number,
  now: number
) => number = R.converge(R.modulo, [timeSinceStart, R.nthArg(0)])

export const roundNow: (
  periodLength: number,
  start: number,
  now: number
) => number = R.converge(R.subtract, [R.nthArg(2), remainder])

export type FromTimeLock<ReturnType> = (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  periodLength: number,
  now: number
) => ReturnType

const wrapper: FromTimeLock<BigNumber> = (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  periodLength: number,
  now: number
) =>
  FnBigNumber.create(
    calcVestableAmount(
      start,
      end,
      cliff,
      totalAmount,
      vestedAmount,
      roundNow(periodLength, start, now)
    ).toPrecision(4)
  )

export default wrapper
