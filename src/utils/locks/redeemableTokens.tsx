import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import * as FnBigNumber from '../fnBignumber'

export type FromTimeLock<ReturnType> = (
  start: number,
  end: number,
  cliff: number,
  totalAmount: BigNumber,
  vestedAmount: BigNumber,
  periodLength: number,
  now: number
) => ReturnType

const takeEnd = R.nthArg(1)
const takeStart = R.nthArg(0)
const takeNow = R.nthArg(6)
const takeCliff = R.nthArg(2)
const takePeriodLength = R.nthArg(5)
const takeTotalAmount = R.nthArg(3)
const takeVestedAmount = R.nthArg(4)

const cliffNotYetReached = R.converge(R.lt, [takeNow, takeCliff])

const endPassed = R.converge(R.gte, [takeNow, takeEnd])

const totalTimeOfVestingPhase = R.converge(R.subtract, [takeEnd, takeStart])

const totalPeriods = R.converge(
  R.pipe(
    R.divide,
    Math.floor,
    R.ifElse(R.equals(0), R.always(1), R.identity)
  ),
  [totalTimeOfVestingPhase, takePeriodLength]
)

const tokensPerPeriod: FromTimeLock<BigNumber> = R.converge(
  R.pipe(
    FnBigNumber.dividedBy,
    FnBigNumber.dp(0)
  ),
  [totalPeriods, takeTotalAmount]
)

export const timeSinceStart: FromTimeLock<number> = R.converge(R.subtract, [
  takeNow,
  takeStart,
])

const periodsPassed: FromTimeLock<BigNumber> = R.converge(
  R.pipe(
    R.divide,
    Math.floor,
    FnBigNumber.create
  ),
  [timeSinceStart, takePeriodLength]
)

export const allRedeemableTokens: FromTimeLock<BigNumber> = R.converge(
  FnBigNumber.multipliedBy,
  [periodsPassed, tokensPerPeriod]
)

const remainingAmount = R.converge(FnBigNumber.subtract, [
  takeVestedAmount,
  takeTotalAmount,
])

export const allRedeemed = R.converge(FnBigNumber.isEqualTo, [
  takeTotalAmount,
  takeVestedAmount,
])

const redeemableTokens: FromTimeLock<BigNumber> = R.cond([
  [cliffNotYetReached, R.always(FnBigNumber.create(0))],
  [allRedeemed, R.always(FnBigNumber.create(0))],
  [endPassed, remainingAmount],
  [
    R.T,
    R.pipe(
      R.converge(FnBigNumber.subtract, [takeVestedAmount, allRedeemableTokens]),
      FnBigNumber.dp(0)
    ),
  ],
])

export default redeemableTokens
