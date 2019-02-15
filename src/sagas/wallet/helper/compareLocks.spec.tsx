import test from 'tape'
import * as FnBigNumer from '../../../utils/fnBignumber'
import { locksAreDifferent } from './compareLocks'

const DEFAULT_LOCK = {
  cliff: 2,
  end: 10,
  start: 1,
  totalAmount: FnBigNumer.create(10),
  vestedAmount: FnBigNumer.create(10),
}

test('Saga helper to comapre locks', t => {
  t.test('Locks are equal', assert => {
    const lock2 = {
      cliff: 2,
      end: 10,
      start: 1,
      totalAmount: FnBigNumer.create(10),
      vestedAmount: FnBigNumer.create(10),
    }
    assert.equal(locksAreDifferent(DEFAULT_LOCK, lock2), false)
    assert.end()
  })

  t.test('Locks are different, different BigNumber', assert => {
    const lock2 = {
      cliff: 2,
      end: 10,
      start: 1,
      totalAmount: FnBigNumer.create(10),
      vestedAmount: FnBigNumer.create(1),
    }
    assert.equal(locksAreDifferent(DEFAULT_LOCK, lock2), true)
    assert.end()
  })

  t.test('Locks are different, different number', assert => {
    const lock2 = {
      cliff: 2,
      end: 11,
      start: 1,
      totalAmount: FnBigNumer.create(10),
      vestedAmount: FnBigNumer.create(10),
    }
    assert.equal(locksAreDifferent(DEFAULT_LOCK, lock2), true)
    assert.end()
  })
})
