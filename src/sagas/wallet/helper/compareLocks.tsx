import * as R from 'ramda'
import { Lock } from '../../../components/wallet/reducers'
import * as FnBigNumber from '../../../utils/fnBignumber'

const valuesEqualAt = R.curry(
  (
    comparator: (arg1: any, arg2: any) => boolean,
    key: string
  ): ((lock1: Lock, lock2: Lock) => boolean) =>
    R.converge(comparator, [
      R.prop(key),
      R.pipe(
        R.nthArg(1),
        R.prop(key)
      ),
    ])
)

const bigNumbersEqualAt = valuesEqualAt(FnBigNumber.isEqualTo)
const valueTypesEqualAt = valuesEqualAt(R.equals)

const locksEqual: (lock1: Lock, lock2: Lock) => boolean = R.allPass([
  valueTypesEqualAt('start'),
  valueTypesEqualAt('end'),
  valueTypesEqualAt('cliff'),
  bigNumbersEqualAt('totalAmount'),
  bigNumbersEqualAt('vestedAmount'),
])

export const locksAreDifferent: (lock1: Lock, lock2: Lock) => boolean = R.pipe(
  locksEqual,
  R.not
)
