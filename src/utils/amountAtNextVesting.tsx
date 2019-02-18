import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import { calculateTimeToNextVesting } from './calculateTimeToNextVesting'
import calcVestableAmount, { FromTimeLock } from './calcVestableAmount'

const getStart = R.nthArg(0)
const getEnd = R.nthArg(1)
const getCliff = R.nthArg(2)
const getTotalAmount = R.nthArg(3)
const getVestedAmount = R.nthArg(4)
const getPeriodLength = R.nthArg(5)
const getNow = R.nthArg(6)

export const amountAtNextVesting: FromTimeLock<BigNumber> = R.converge(
  calcVestableAmount,
  [
    getStart,
    getEnd,
    getCliff,
    getTotalAmount,
    getVestedAmount,
    getPeriodLength,
    R.converge(R.add, [getNow, calculateTimeToNextVesting]),
  ]
)
