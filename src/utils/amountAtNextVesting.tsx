import BigNumber from 'bignumber.js'
import * as R from 'ramda'
import { calculateTimeToNextVesting } from './calculateTimeToNextVesting'
import calcVestableAmount, { FromTimeLock } from './calcVestableAmount'

export const amountAtNextVesting: FromTimeLock<BigNumber> = R.converge(
  calcVestableAmount,
  [
    R.nthArg(0),
    R.nthArg(1),
    R.nthArg(2),
    R.nthArg(3),
    R.nthArg(4),
    R.nthArg(5),
    R.converge(R.add, [R.nthArg(6), calculateTimeToNextVesting]),
  ]
)
