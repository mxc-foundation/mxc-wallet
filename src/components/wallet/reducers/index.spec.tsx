import BigNumber from 'bignumber.js'
import test from 'tape'
import * as FnBigNumber from '../../../utils/fnBignumber'
import * as walletActions from '../actions'
import {
  getAmountAtNextVesting,
  getBalance,
  getEtherBalance,
  getEtherscanUrl,
  getLockedTokensBalance,
  getRedeemableTokensBalance,
  getTimeToNextVestingEvent,
  getTokenBalance,
  lock as lockReducer,
  now as nowReducer,
  WalletState
} from './index'

const ADDRESS = '0x46abcba22b03817fa23b6ab48db211029314fc00'

const mockState: WalletState = Object.freeze({
  address: ADDRESS,
  balances: {
    ether: FnBigNumber.toWei(FnBigNumber.create(2)).toString(),
    token: FnBigNumber.toWei(FnBigNumber.create(100)).toString(),
  },
  fetchingTransactions: false,
  lock: {
    cliff: 0,
    end: 0,
    start: 0,
    totalAmount: '0',
    vestedAmount: '0',
  },
  network: 42,
  now: 0,
  transactions: [],
})

test('Wallet reducers tests', t => {
  t.test('Lock reducer', assert => {
    assert.plan(1)
    const TEST_LOCK = {
      cliff: 1,
      end: 10,
      start: 0,
      totalAmount: '10',
      vestedAmount: '0',
    }
    assert.deepEqual(
      lockReducer(undefined, walletActions.setLock(TEST_LOCK)),
      TEST_LOCK
    )
  })

  t.test('Now reducer', assert => {
    assert.deepEqual(nowReducer(undefined, walletActions.setNow(10)), 10)
    assert.deepEqual(nowReducer(15, walletActions.setNow(20)), 20)
    assert.end()
  })
})

test('Wallet selectors tests', t => {
  t.test('Ether balance object selector', assert => {
    assert.plan(1)
    const expectedEtherBalance: BigNumber = FnBigNumber.create(
      '2000000000000000000'
    )
    assert.deepEqual(getEtherBalance(mockState), expectedEtherBalance)
  })
  t.test('Token balance as number selector', assert => {
    assert.plan(1)
    assert.deepEqual(
      getBalance('token')(mockState),
      FnBigNumber.create('100000000000000000000')
    )
  })

  t.test('Token balance as object selector', assert => {
    assert.plan(1)
    const expectedTokenBalance: BigNumber = FnBigNumber.create(
      '100000000000000000000'
    )
    assert.deepEqual(getTokenBalance(mockState), expectedTokenBalance)
  })

  t.test('Locked tokens balance selector', assert => {
    assert.plan(1)
    const TEST_WALLET_STATE = {
      ...mockState,

      lock: {
        cliff: 0,
        end: 0,
        start: 0,
        totalAmount: '10',
        vestedAmount: '5',
      },
      now: 3,
    }
    assert.deepEqual(
      getLockedTokensBalance(TEST_WALLET_STATE),
      FnBigNumber.create(5)
    )
  })

  t.test('Redeemable tokens balance selector', assert => {
    assert.plan(1)
    const TEST_WALLET_STATE = {
      ...mockState,

      lock: {
        cliff: 125,
        end: 603,
        start: 3,
        totalAmount: '10',
        vestedAmount: '2',
      },
      now: 183,
    }
    assert.deepEqual(
      getRedeemableTokensBalance(TEST_WALLET_STATE),
      FnBigNumber.create(1)
    )
  })

  t.test('Time to next vesting event selector', assert => {
    assert.plan(1)
    const TEST_WALLET_STATE = {
      ...mockState,
      lock: {
        cliff: 290,
        end: 600,
        start: 0,
        totalAmount: '10',
        vestedAmount: '0',
      },
      now: 200,
    }
    assert.deepEqual(getTimeToNextVestingEvent(TEST_WALLET_STATE), 91)
  })

  t.test('Amount at next vesting event, now is before cliff', assert => {
    assert.plan(1)
    const TEST_WALLET_STATE = {
      ...mockState,
      lock: {
        cliff: 63,
        end: 603,
        start: 3,
        totalAmount: '10',
        vestedAmount: '0',
      },
      now: 10,
    }
    assert.deepEqual(
      getAmountAtNextVesting(TEST_WALLET_STATE),
      FnBigNumber.create(1)
    )
  })

  t.test('Amount at next vesting event, now is at cliff', assert => {
    assert.plan(1)
    const TEST_WALLET_STATE = {
      ...mockState,
      lock: {
        cliff: 63,
        end: 603,
        start: 3,
        totalAmount: '10',
        vestedAmount: '0',
      },
      now: 63,
    }
    assert.deepEqual(
      getAmountAtNextVesting(TEST_WALLET_STATE),
      FnBigNumber.create(2)
    )
  })
  t.test('Amount at next vesting event, now is after cliff', assert => {
    assert.plan(1)
    const TEST_WALLET_STATE = {
      ...mockState,
      lock: {
        cliff: 63,
        end: 603,
        start: 3,
        totalAmount: '10',
        vestedAmount: '0',
      },
      now: 73,
    }
    assert.deepEqual(
      getAmountAtNextVesting(TEST_WALLET_STATE),
      FnBigNumber.create(2)
    )
  })
  t.test(
    'Amount at next vesting event, now is after cliff, one token redeemed',
    assert => {
      assert.plan(1)
      const TEST_WALLET_STATE = {
        ...mockState,
        lock: {
          cliff: 63,
          end: 603,
          start: 3,
          totalAmount: '10',
          vestedAmount: '1',
        },
        now: 73,
      }
      assert.deepEqual(
        getAmountAtNextVesting(TEST_WALLET_STATE),
        FnBigNumber.create(1)
      )
    }
  )
  t.test('Etherscan URL', assert => {
    assert.plan(2)
    assert.equal(
      getEtherscanUrl({
        ...mockState,
        network: 1,
      }),
      `https://etherscan.io/token/0x5ca381bbfb58f0092df149bd3d243b08b9a8386e?a=${ADDRESS}`
    )

    assert.equal(
      getEtherscanUrl(mockState),
      `https://kovan.etherscan.io/token/0x27dA64984b8b18e8B807BB15205534F45bfE6955?a=${ADDRESS}`
    )
  })
})
