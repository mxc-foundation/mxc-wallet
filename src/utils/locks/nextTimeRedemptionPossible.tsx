import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import * as FnBigNumber from '../fnBignumber'
import {
  allRedeemableTokens,
  allRedeemed,
  FromTimeLock
} from './redeemableTokens'

const takeStart = R.nthArg(0)
const takeEnd = R.nthArg(1)
const takeCliff = R.nthArg(2)
const takeTotalAmount = R.nthArg(3)
const takeVestedAmount = R.nthArg(4)
const takePeriodLength = R.nthArg(5)
const takeNow = R.nthArg(6)

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

export const timeToNextPeriod: FromTimeLock<number> = R.converge(R.subtract, [
  takePeriodLength,
  timePassedOfCurrentPeriod,
])

const beginningOfNextPeriod: FromTimeLock<number> = R.converge(R.add, [
  takeNow,
  timeToNextPeriod,
])

const cliffPlusOne: FromTimeLock<number> = R.pipe(
  takeCliff,
  R.add(1)
)

const cliffPlusOneMinusNow = R.converge(R.subtract, [cliffPlusOne, takeNow])

const timeToEnd = R.converge(R.subtract, [takeEnd, takeNow])

const amountOfTokensTokensRedeemable = (
  shiftNow: FromTimeLock<number>
): FromTimeLock<BigNumber> =>
  R.converge(
    R.pipe(
      FnBigNumber.subtract,
      FnBigNumber.dp(0)
    ),
    [
      takeVestedAmount,
      R.pipe(
        R.converge(allRedeemableTokens, [
          takeStart,
          takeEnd,
          takeCliff,
          takeTotalAmount,
          takeVestedAmount,
          takePeriodLength,
          shiftNow,
        ])
      ),
    ]
  )

export const canRedeemSomethingOneSecondAfterCliff: FromTimeLock<
  boolean
> = R.pipe(
  amountOfTokensTokensRedeemable(cliffPlusOne) as any,
  FnBigNumber.isZero,
  R.not
)

export const canRedeemSomethingAtBeginningOfNextPeriod: FromTimeLock<
  boolean
> = R.pipe(
  amountOfTokensTokensRedeemable(beginningOfNextPeriod) as any,
  FnBigNumber.isZero,
  R.not
)

const nowAfterEnd = R.converge(R.gt, [takeNow, takeEnd])

const endOfFirstPeriod = R.converge(R.add, [takeStart, takePeriodLength])

const endBeforeEndOfFirstPeriod = R.converge(R.gt, [endOfFirstPeriod, takeEnd])

const endMinusNow = R.converge(R.subtract, [takeEnd, takeNow])

export const timeUntilNextRedemptionPossible: FromTimeLock<number> = R.cond([
  [allRedeemed, R.always(-1)],
  [nowAfterEnd, R.always(-1)],
  [
    endBeforeEndOfFirstPeriod,
    R.pipe(
      endMinusNow,
      R.max(0)
    ),
  ],
  [
    canRedeemSomethingOneSecondAfterCliff,
    R.pipe(
      cliffPlusOneMinusNow,
      R.max(0)
    ),
  ],
  [canRedeemSomethingAtBeginningOfNextPeriod, timeToNextPeriod],
  [nowLowerOrEqualEnd, R.converge(R.min, [timeToNextPeriod, timeToEnd])],
  [R.T, R.always(-1)],
])
