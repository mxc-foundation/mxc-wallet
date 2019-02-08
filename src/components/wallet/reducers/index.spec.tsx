import BigNumber from 'bignumber.js'
import test from 'tape'
import Web3 from 'web3'
import * as FnBigNumber from '../../../utils/fnBignumber'

import {
  Balance,
  getBalance,
  getEtherBalance,
  getTokenBalance,
  WalletState
} from './index'

const mockState: WalletState = Object.freeze({
  address: '0x46abcba22b03817fa23b6ab48db211029314fc00',
  balances: {
    ether: FnBigNumber.toWei(FnBigNumber.create(2)).toString(),
    lockedTokens: FnBigNumber.toWei(FnBigNumber.create(100)).toString(),
    token: FnBigNumber.toWei(FnBigNumber.create(100)).toString(),
  },
  network: '',
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
})
