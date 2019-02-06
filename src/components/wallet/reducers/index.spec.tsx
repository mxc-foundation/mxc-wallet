import test from 'tape'
import * as FnBigNumber from '../../../utils/fnBignumber'

import Web3 from 'web3'

import {
  Balance,
  getBalanceValue,
  getEtherBalance,
  getTokenBalance,
  WalletState
} from './index'

const mockState: WalletState = Object.freeze({
  address: '0x46abcba22b03817fa23b6ab48db211029314fc00',
  balances: {
    ether: {
      animation: {
        duration: 0,
        lastBalance: '0',
        show: false,
      },
      value: Web3.utils.toWei(FnBigNumber.create(2), 'ether').toString(),
    },
    token: {
      animation: {
        duration: 0,
        lastBalance: '0',
        show: false,
      },
      value: Web3.utils.toWei(FnBigNumber.create(100), 'ether').toString(),
    },
  },
  etherToEuroRate: '344.4433',
  etherToTokenRate: '10',
  network: '',
  whitelistStatus: false,
})

test('Wallet selectors tests', t => {
  t.test('Ether balance object selector', assert => {
    assert.plan(1)
    const expectedEtherBalance: Balance = {
      value: FnBigNumber.create('2000000000000000000'),
    }
    assert.deepEqual(getEtherBalance(mockState), expectedEtherBalance)
  })
  t.test('Token balance as number selector', assert => {
    assert.plan(1)
    assert.deepEqual(
      getBalanceValue('token')(mockState),
      FnBigNumber.create('100000000000000000000')
    )
  })

  t.test('Token balance as object selector', assert => {
    assert.plan(1)
    const expectedTokenBalance: Balance = {
      value: FnBigNumber.create('100000000000000000000'),
    }
    assert.deepEqual(getTokenBalance(mockState), expectedTokenBalance)
  })
})
