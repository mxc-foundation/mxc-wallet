import test from 'tape'
import { parseResult, reply } from './example-data.json'
import { parseEtherscanReply } from './index'
const ADDRESS = '0xceC7a6E1883b9bA85D5608717C5F9D78c288cBCB'
test('Transactions helpers', t => {
  t.test('Result parsing', assert => {
    assert.plan(2)
    assert.deepEqual(
      parseEtherscanReply(ADDRESS, reply.result)[0],
      parseResult[0]
    )
    assert.deepEqual(
      parseEtherscanReply(ADDRESS, reply.result)[1],
      parseResult[1]
    )
  })
})
