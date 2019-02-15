import test from 'tape'
import { timeLeftInDays, timeLeftInSeconds } from './timeLeftWithUnits'

test('Converting second', t => {
  t.test('get seconds with units', assert => {
    assert.equal(timeLeftInSeconds(127), '127 seconds')
    assert.end()
  })

  t.test('get days with unit', assert => {
    assert.equal(timeLeftInDays(20 * 60 * 60 * 24), '20 days')
    assert.end()
  })
})
