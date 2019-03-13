import * as R from 'ramda'
import test from 'tape'
import { input, output } from './example-data.json'
import { parseEtherscanReply } from './index'

const ADDRESS = '0xceC7a6E1883b9bA85D5608717C5F9D78c288cBCB'

test('Transactions helpers', t => {
  t.test('Result parsing', assert => {
    R.zipWith(assert.deepEqual, parseEtherscanReply(ADDRESS, input), output)
    assert.end()
  })
})
