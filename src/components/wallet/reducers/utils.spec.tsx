import BigNumber from 'bn.js'
import test from 'tape'
import { create, toString } from '../../../utils/fnBignumber'

test('Functional Programming utils Tests', t => {
  t.test('it should by successfully', assert => {
    const bigNumber = toString(new BigNumber(42))
    assert.equal(bigNumber, '42', 'convert a BigNumber into a string')

    assert.ok(
      new BigNumber(0).eq(create('0')),
      'convert a string of "0" into a BigNumber'
    )
    assert.ok(
      new BigNumber(1).eq(create('1')),
      'convert a string of "1" into a BigNumber'
    )
    assert.end()
  })
})
