import BigNumber from 'bignumber.js'
import test from 'tape'
import * as FnBigNumber from '../../../utils/fnBignumber'

const ADDRESS = '0x46abcba22b03817fa23b6ab48db211029314fc00'

import {
  getBalance,
  getEtherBalance,
  getEtherscanUrl,
  getTokenBalance,
  WalletState
} from './index'

const mockState: WalletState = Object.freeze({
  address: ADDRESS,
  balances: {
    ether: FnBigNumber.toWei(FnBigNumber.create(2)).toString(),
    lockedTokens: FnBigNumber.toWei(FnBigNumber.create(100)).toString(),
    token: FnBigNumber.toWei(FnBigNumber.create(100)).toString(),
  },
  network: 42,
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
      `https://kovan.etherscan.io/token/0xaed023ec19031e1004304ea7ef36852a87db5f67?a=${ADDRESS}`
    )
  })
})
