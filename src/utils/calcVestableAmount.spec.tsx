import test from 'tape'
import calcVestableAmount, {
  getVestedAmount,
  remainder,
  roundNow,
  timeSinceStart
} from './calcVestableAmount'
import * as FnBigNumber from './fnBignumber'

const DEFAULT_TOTAL_AMOUNT = FnBigNumber.create(100)
const DEFAULT_CLIFF = 2
const DEFAULT_END = 10
const DEFAULT_START = 0
const DEFAULT_PERIOD_LENGTH = 1

test('Calculation of vestable tokens', t => {
  t.test('Current time is before cliff', assert => {
    assert.plan(1)
    const VESTED_AMOUNT = FnBigNumber.create(0)
    const NOW = 1
    const vestableTokens = calcVestableAmount(
      DEFAULT_START,
      DEFAULT_END,
      DEFAULT_CLIFF,
      DEFAULT_TOTAL_AMOUNT,
      VESTED_AMOUNT,
      DEFAULT_PERIOD_LENGTH,
      NOW
    )
    assert.true(vestableTokens.eq(FnBigNumber.create(0)))
    assert.end()
  })
  t.test('Current time is at cliff', assert => {
    assert.plan(1)
    const VESTED_AMOUNT = FnBigNumber.create(0)
    const NOW = DEFAULT_CLIFF
    const vestableTokens = calcVestableAmount(
      DEFAULT_START,
      DEFAULT_END,
      DEFAULT_CLIFF,
      DEFAULT_TOTAL_AMOUNT,
      VESTED_AMOUNT,
      DEFAULT_PERIOD_LENGTH,
      NOW
    )
    assert.deepEqual(vestableTokens, FnBigNumber.create(20))
    assert.end()
  })
  t.test(
    'No tokens have been redeemed. Current time is past end time.',
    assert => {
      assert.plan(1)
      const VESTED_AMOUNT = FnBigNumber.create(0)
      const NOW = 11
      const vestableTokens = calcVestableAmount(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      )
      assert.deepEqual(vestableTokens, FnBigNumber.create(100))
      assert.end()
    }
  )
  t.test(
    'Current time is past end time, 50 tokens have already been redeemed.',
    assert => {
      assert.plan(1)
      const VESTED_AMOUNT = FnBigNumber.create(50)
      const NOW = 11
      const vestableTokens = calcVestableAmount(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      )
      assert.deepEqual(vestableTokens, FnBigNumber.create(50))
      assert.end()
    }
  )
  t.test(
    'Current time is after cliff, no tokens have been redeemed.',
    assert => {
      assert.plan(1)
      const VESTED_AMOUNT = FnBigNumber.create(0)
      const NOW = 5
      const vestableTokens = calcVestableAmount(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      )
      assert.deepEqual(vestableTokens, FnBigNumber.create(50))
      assert.end()
    }
  )
  t.test(
    'Current time is in the middle of a period. The amount of tokens should be same as for the beginning of the period.',
    assert => {
      assert.plan(1)
      const VESTED_AMOUNT = FnBigNumber.create(0)
      const NOW = 5.5
      const vestableTokens = calcVestableAmount(
        DEFAULT_START,
        DEFAULT_END,
        DEFAULT_CLIFF,
        DEFAULT_TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      )
      assert.deepEqual(vestableTokens, FnBigNumber.create(50))
      assert.end()
    }
  )
  t.test('Some tokens have been redeemed.', assert => {
    assert.plan(1)
    const VESTED_AMOUNT = FnBigNumber.create(20)
    const NOW = 5
    const vestableTokens = calcVestableAmount(
      DEFAULT_START,
      DEFAULT_END,
      DEFAULT_CLIFF,
      DEFAULT_TOTAL_AMOUNT,
      VESTED_AMOUNT,
      DEFAULT_PERIOD_LENGTH,
      NOW
    )
    assert.deepEqual(vestableTokens, FnBigNumber.create(30))
    assert.end()
  })
  t.test(
    'Starting point is not zero. Current time is past end of vesting',
    assert => {
      const TOTAL_AMOUNT = FnBigNumber.create('1000000')
      const VESTED_AMOUNT = FnBigNumber.create('0')
      const START = 10
      const CLIFF = 20
      const END = 110
      const NOW = 120
      assert.equal(
        calcVestableAmount(
          START,
          END,
          CLIFF,
          TOTAL_AMOUNT,
          VESTED_AMOUNT,
          DEFAULT_PERIOD_LENGTH,
          NOW
        ).toString(),
        FnBigNumber.create(1000000).toString()
      )

      assert.end()
    }
  )

  t.test('Starting point is not zero. Current time is at cliff', assert => {
    const TOTAL_AMOUNT = FnBigNumber.create('1000000')
    const VESTED_AMOUNT = FnBigNumber.create('0')
    const START = 100010
    const CLIFF = 100020
    const END = 100110
    const NOW = 100020
    assert.equal(
      calcVestableAmount(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        DEFAULT_PERIOD_LENGTH,
        NOW
      ).toString(),
      FnBigNumber.create(100000).toString()
    )
    assert.end()
  })
  t.test(
    'Starting point is not zero. Current time is at cliff. Other period length',
    assert => {
      const TOTAL_AMOUNT = FnBigNumber.create('1000000')
      const VESTED_AMOUNT = FnBigNumber.create('0')
      const START = 100010
      const CLIFF = 100070
      const END = 100610
      const NOW = 100130
      const PERIOD_LENGTH = 60
      assert.equal(
        calcVestableAmount(
          START,
          END,
          CLIFF,
          TOTAL_AMOUNT,
          VESTED_AMOUNT,
          PERIOD_LENGTH,
          NOW
        ).toString(),
        FnBigNumber.create(200000).toString()
      )
      assert.end()
    }
  )
  t.test('Less than one token per period.', assert => {
    const TOTAL_AMOUNT = FnBigNumber.create('400')
    const VESTED_AMOUNT = FnBigNumber.create('0')
    const START = 10
    const CLIFF = 20
    const END = 410
    const NOW = 30
    const PERIOD_LENGTH = 20
    assert.equal(
      calcVestableAmount(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ).toString(),
      FnBigNumber.create(20).toString()
    )
    assert.end()
  })

  t.test('From actual blockchain data.', assert => {
    const TOTAL_AMOUNT = FnBigNumber.create('1000000')
    const VESTED_AMOUNT = FnBigNumber.create('0')
    const START = 1549527448
    const CLIFF = 1549527458
    const END = 1559527448
    const NOW = 1549527648
    const PERIOD_LENGTH = 10
    assert.equal(
      calcVestableAmount(
        START,
        END,
        CLIFF,
        TOTAL_AMOUNT,
        VESTED_AMOUNT,
        PERIOD_LENGTH,
        NOW
      ).toString(),
      FnBigNumber.create(20).toString()
    )
    assert.end()
  })
})

test('Helpers', t => {
  t.test(
    'Calculate the time difference between start and beginning',
    assert => {
      const NOW = 17
      const PERIOD_LENGTH = 3
      assert.equal(timeSinceStart(PERIOD_LENGTH, 0, NOW), 17)
      assert.equal(timeSinceStart(PERIOD_LENGTH, 1, NOW), 16)
      assert.equal(timeSinceStart(75, 1549527448, 1549527648), 200)
      assert.end()
    }
  )
  t.test('Calculate the remainder', assert => {
    const NOW = 17
    const PERIOD_LENGTH = 3
    assert.equal(remainder(PERIOD_LENGTH, 0, NOW), 2)
    assert.equal(remainder(PERIOD_LENGTH, 1, NOW), 1)
    assert.end()
  })

  t.test('Round the current now to a fraction of the period length', assert => {
    const PERIOD_LENGTH = 3
    let START = 0
    const NOW = 17
    assert.equal(roundNow(PERIOD_LENGTH, START, NOW), 15)
    START = 1
    assert.equal(roundNow(PERIOD_LENGTH, START, NOW), 16)
    START = 15
    assert.equal(roundNow(PERIOD_LENGTH, START, NOW), 15)
    assert.equal(roundNow(13, 53, 77), 66)
    assert.end()
  })

  t.test('Get the amount of vested tokens', assert => {
    const VESTED_AMOUNT = FnBigNumber.create(20)
    const NOW = 17
    const vestedAmount = getVestedAmount(
      DEFAULT_START,
      DEFAULT_END,
      DEFAULT_CLIFF,
      DEFAULT_TOTAL_AMOUNT,
      VESTED_AMOUNT,
      NOW
    )
    assert.deepEqual(vestedAmount, FnBigNumber.create(20))
    assert.end()
  })
})
