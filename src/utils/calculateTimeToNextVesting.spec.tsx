import test from 'tape'
import {
  calculateTimeToNextVesting,
  nowLowerOrEqualCliff,
  nowLowerOrEqualEnd
} from './calculateTimeToNextVesting'
import * as FnBigNumber from './fnBignumber'

const DEFAULT_PERIOD_LENGTH = 10
const TOTAL_AMOUNT = FnBigNumber.create(0)
const VESTED_AMOUNT = FnBigNumber.create(0)
const DEFAULT_START = 10
const DEFAULT_CLIFF = 20
const DEFAULT_END = 110

test('getTimeToNextVesting', t => {
  t.test('Current time is before cliff', assert => {
    const NOW = 4
    assert.equal(
      nowLowerOrEqualCliff(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      true
    )
    assert.equal(
      nowLowerOrEqualCliff(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW + 50
      ),
      false
    )
    assert.equal(
      nowLowerOrEqualEnd(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      true
    )
    assert.equal(
      calculateTimeToNextVesting(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      16
    )
    assert.end()
  })

  t.test('Current time is at cliff', assert => {
    const NOW = 20

    assert.equal(
      calculateTimeToNextVesting(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      0
    )
    assert.end()
  })

  t.test('Current time is after end', assert => {
    const NOW = 120

    assert.equal(
      calculateTimeToNextVesting(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      -1
    )
    assert.end()
  })

  t.test(
    'Current time after cliff but before end and within a period',
    assert => {
      const NOW = 26

      assert.equal(
        calculateTimeToNextVesting(
          DEFAULT_START,
          DEFAULT_END,
          DEFAULT_CLIFF,
          TOTAL_AMOUNT,
          VESTED_AMOUNT,
          DEFAULT_PERIOD_LENGTH,
          NOW
        ),
        4
      )
      assert.end()
    }
  )

  t.test(
    'Current time after cliff but before end and at the vesting point',
    assert => {
      const NOW = 30

      assert.equal(
        calculateTimeToNextVesting(
          DEFAULT_START,
          DEFAULT_END,
          DEFAULT_CLIFF,
          TOTAL_AMOUNT,
          VESTED_AMOUNT,
          DEFAULT_PERIOD_LENGTH,
          NOW
        ),
        0
      )
      assert.end()
    }
  )
  t.test(
    'Current time before cliff and cliff not a vesting period end.',
    assert => {
      const NOW = 10
      const CLIFF = 25
      assert.equal(
        calculateTimeToNextVesting(
          DEFAULT_START,
          DEFAULT_END,
          CLIFF,
          TOTAL_AMOUNT,
          VESTED_AMOUNT,
          DEFAULT_PERIOD_LENGTH,
          NOW
        ),
        20
      )
      assert.end()
    }
  )
})
