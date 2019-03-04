import test from 'tape'
import * as FnBigNumber from '../fnBignumber'
import {
  canRedeemSomethingAtBeginningOfNextPeriod,
  canRedeemSomethingOneSecondAfterCliff,
  nowLowerOrEqualCliff,
  nowLowerOrEqualEnd,
  timeToNextPeriod,
  timeUntilNextRedemptionPossible
} from './nextTimeRedemptionPossible'

const DEFAULT_PERIOD_LENGTH = 10
const DEFAULT_TOTAL_AMOUNT = FnBigNumber.create('1000000000000000')
const DEFAULT_VESTED_AMOUNT = FnBigNumber.create(0)
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
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      true
    )
    assert.equal(
      timeUntilNextRedemptionPossible(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
      timeUntilNextRedemptionPossible(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      1
    )
    assert.end()
  })

  t.test('Current time is one second after cliff', assert => {
    const NOW = 21
    assert.ok(
      canRedeemSomethingOneSecondAfterCliff(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ),
      'It is possible to redeem something one second after the cliff'
    )
    assert.equal(
      timeUntilNextRedemptionPossible(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
      timeUntilNextRedemptionPossible(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
        timeUntilNextRedemptionPossible(
          DEFAULT_START,
          DEFAULT_END,
          DEFAULT_CLIFF,
          DEFAULT_TOTAL_AMOUNT,
          DEFAULT_VESTED_AMOUNT,
          DEFAULT_PERIOD_LENGTH,
          NOW
        ),
        0
      )
      assert.end()
    }
  )

  t.test(
    'Current time after cliff but before end and at the vesting point',
    assert => {
      const NOW = 30

      assert.equal(
        timeUntilNextRedemptionPossible(
          DEFAULT_START,
          DEFAULT_END,
          DEFAULT_CLIFF,
          DEFAULT_TOTAL_AMOUNT,
          DEFAULT_VESTED_AMOUNT,
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
        timeUntilNextRedemptionPossible(
          DEFAULT_START,
          DEFAULT_END,
          CLIFF,
          DEFAULT_TOTAL_AMOUNT,
          DEFAULT_VESTED_AMOUNT,
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
      timeUntilNextRedemptionPossible(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
      timeUntilNextRedemptionPossible(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
    assert.notOk(
      canRedeemSomethingOneSecondAfterCliff(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      )
    )
    assert.equal(
      timeToNextPeriod(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      28,
      '28 seconds left in this period'
    )
    assert.ok(
      canRedeemSomethingAtBeginningOfNextPeriod(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      'Can redeem someting at the beginning of the second period.'
    )
    assert.equal(
      timeUntilNextRedemptionPossible(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
      timeUntilNextRedemptionPossible(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      33,
      'Can redeem after 33 seconds'
    )
    assert.end()
  })
  t.test(
    'Cliff is somewhen in the second period and now is 2 seconds after cliff.',
    assert => {
      const NOW = 46
      const START = 10
      const CLIFF = 44
      const END = 73
      const PERIOD_LENGTH = 30
      assert.equal(
        timeUntilNextRedemptionPossible(
          START,
          END,
          CLIFF,
          DEFAULT_TOTAL_AMOUNT,
          DEFAULT_VESTED_AMOUNT,
          PERIOD_LENGTH,
          NOW
        ),
        0,
        'Can redeem after 0 seconds'
      )
      assert.end()
    }
  )
  t.test('End is in the first period.', assert => {
    const NOW = 0
    const START = 0
    const CLIFF = 0
    const END = 1
    const PERIOD_LENGTH = 30
    assert.equal(
      timeUntilNextRedemptionPossible(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
      timeUntilNextRedemptionPossible(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
      timeUntilNextRedemptionPossible(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
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
      timeUntilNextRedemptionPossible(
        START,
        END,
        CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        DEFAULT_VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ),
      61,
      'Can redeem after 61 seconds'
    )
    assert.end()
  })
  t.test('Cliff is at the end of first period.', assert => {
    const START = 1551444663
    const NOW = START + 123
    const CLIFF = 1551444786
    const END = 1551444970
    const PERIOD_LENGTH = 60
    assert.ok(
      canRedeemSomethingAtBeginningOfNextPeriod(
        START,
        END,
        CLIFF,
        FnBigNumber.create('100000000000000'),
        FnBigNumber.create('40000000000000'),
        PERIOD_LENGTH,
        NOW
      )
    )
    assert.equal(
      timeUntilNextRedemptionPossible(
        START,
        END,
        CLIFF,
        FnBigNumber.create('100000000000000'),
        FnBigNumber.create('40000000000000'),
        PERIOD_LENGTH,
        NOW
      ),
      57,
      'Can redeem after 57 seconds'
    )
    assert.end()
  })
})
