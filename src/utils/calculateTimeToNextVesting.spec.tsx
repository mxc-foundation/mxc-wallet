import test from 'tape'
import {
  nowLowerOrEqualCliff,
  nowLowerOrEqualEnd,
  timeUntilNextVestingPossible
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
      true,
      'Should return true for a now which is before the cliff.'
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
      timeUntilNextVestingPossible(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      17,
      'Next vesting will be in 17 seconds.'
    )
    assert.end()
  })

  t.test('Current time is at cliff', assert => {
    const NOW = 20

    assert.equal(
      timeUntilNextVestingPossible(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      1
    )
    assert.end()
  })

  t.test('Current time is one second after cliff', assert => {
    const NOW = 21

    assert.equal(
      timeUntilNextVestingPossible(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      9
    )
    assert.end()
  })
  t.test('Current time is after end', assert => {
    const NOW = 120

    assert.equal(
      timeUntilNextVestingPossible(
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
        timeUntilNextVestingPossible(
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
        timeUntilNextVestingPossible(
          DEFAULT_START,
          DEFAULT_END,
          DEFAULT_CLIFF,
          TOTAL_AMOUNT,
          VESTED_AMOUNT,
          DEFAULT_PERIOD_LENGTH,
          NOW
        ),
        10
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
        timeUntilNextVestingPossible(
          DEFAULT_START,
          DEFAULT_END,
          CLIFF,
          TOTAL_AMOUNT,
          VESTED_AMOUNT,
          DEFAULT_PERIOD_LENGTH,
          NOW
        ),
        16
      )
      assert.end()
    }
  )
  t.test('Current time at start and cliff.', assert => {
    const NOW = 10
    const START = 10
    const CLIFF = 10
    const END = 70
    const PERIOD_LENGTH = 30
    assert.equal(
      timeUntilNextVestingPossible(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      30,
      'Can redeem after one period which is 30 seconds'
    )
    assert.end()
  })
  t.test('Current time shortly after start and cliff.', assert => {
    const NOW = 12
    const START = 10
    const CLIFF = 10
    const END = 70
    const PERIOD_LENGTH = 30
    assert.equal(
      timeUntilNextVestingPossible(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      28,
      'Can redeem after 28 seconds'
    )
    assert.end()
  })
  t.test('Cliff is somewhen in the first period.', assert => {
    const NOW = 12
    const START = 10
    const CLIFF = 14
    const END = 73
    const PERIOD_LENGTH = 30
    assert.equal(
      timeUntilNextVestingPossible(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      28,
      'Can redeem after 28 seconds'
    )
    assert.end()
  })
  t.test('Cliff is somewhen in the second period.', assert => {
    const NOW = 12
    const START = 10
    const CLIFF = 44
    const END = 73
    const PERIOD_LENGTH = 30
    assert.equal(
      timeUntilNextVestingPossible(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      33,
      'Can redeem after 33 seconds'
    )
    assert.end()
  })
  t.test('Cliff is somewhen in the second period.', assert => {
    const NOW = 46
    const START = 10
    const CLIFF = 44
    const END = 73
    const PERIOD_LENGTH = 30
    assert.equal(
      timeUntilNextVestingPossible(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      24,
      'Can redeem after 24 seconds'
    )
    assert.end()
  })
  t.test('End is in the first period.', assert => {
    const NOW = 0
    const START = 0
    const CLIFF = 0
    const END = 1
    const PERIOD_LENGTH = 30
    assert.equal(
      timeUntilNextVestingPossible(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      1,
      'Can redeem after 1 seconds'
    )
    assert.end()
  })
  t.test('Cliff is in the second period.', assert => {
    const NOW = 12
    const START = 0
    const CLIFF = 34
    const END = 68
    const PERIOD_LENGTH = 30
    assert.equal(
      timeUntilNextVestingPossible(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      23,
      'Can redeem after 23 seconds'
    )
    assert.end()
  })
  t.test('Cliff is at the end of first period.', assert => {
    const NOW = 17
    const START = 15
    const CLIFF = 45
    const END = 8383
    const PERIOD_LENGTH = 30
    assert.equal(
      timeUntilNextVestingPossible(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      29,
      'Can redeem after 29 seconds'
    )
    assert.end()
  })
  t.test('Cliff is at the end of first period.', assert => {
    const NOW = 1551442103
    const START = 1551442103
    const CLIFF = 1551442163
    const END = 1551442223
    const PERIOD_LENGTH = 60
    assert.equal(
      timeUntilNextVestingPossible(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      61,
      'Can redeem after 61 seconds'
    )
    assert.end()
  })
})
