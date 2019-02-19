import test from 'tape'
import calcVestableAmount, { timeSinceStart } from './calcVestableAmount'
import * as FnBigNumber from './fnBignumber'

const DEFAULT_TOTAL_AMOUNT = FnBigNumber.create(100)
const DEFAULT_CLIFF = 2
const DEFAULT_END = 10
const DEFAULT_START = 0
const DEFAULT_PERIOD_LENGTH = 1
const MONTH = 60 * 60 * 24 * 30

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
  t.test('Real world example', assert => {
    assert.plan(1)
    const vestedAmount = calcVestableAmount(
      1506859200,
      1633089600,
      1569931200,
      FnBigNumber.create('170588000000000000000000'),
      FnBigNumber.create('0'),
      MONTH,
      1569931201
    )
    assert.deepEqual(
      vestedAmount,
      FnBigNumber.create('85294000000000000000008')
    )
  })
})
