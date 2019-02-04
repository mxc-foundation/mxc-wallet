import { BigNumber } from 'bignumber.js'
import test from 'tape'
import { create, toNumber } from '../../../utils/fnBignumber'

test('Functional Programming utils Tests', (t) => {
  t.test('it should by successfully', (assert) => {
    const bigNumber = toNumber(new BigNumber(42))
    assert.equal(bigNumber, 42, 'to convert a BigNumber into a number')

    assert.ok(
      new BigNumber(0).equals(create('0')),
      'to convert a string of "0" into a BigNumber'
    )
    assert.ok(
      new BigNumber(1).equals(create('1')),
      'to convert a string of "1" into a BigNumber'
    )
    assert.end()
  })
})
