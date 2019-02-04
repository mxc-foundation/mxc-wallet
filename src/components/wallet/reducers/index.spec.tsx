import test from 'tape'
import * as FnBigNumber from '../../../utils/fnBignumber'

import Web3 from 'web3'

import {
  Balance,
  getBalanceInFiat,
  getBalanceValue,
  getEtherBalance,
  getEtherToTokenConverter,
  getTokenBalance,
  getTokensToEtherConverter,
  WalletState,
} from './index'

const web3 = new Web3()

const mockState: WalletState = Object.freeze({
  address: '0x46abcba22b03817fa23b6ab48db211029314fc00',
  balances: {
    ether: {
      animation: {
        duration: 0,
        lastBalance: '0',
        show: false,
      },
      value: web3.toWei(FnBigNumber.create(2), 'ether').toString(),
    },
    token: {
      animation: {
        duration: 0,
        lastBalance: '0',
        show: false,
      },
      value: web3.toWei(FnBigNumber.create(100), 'ether').toString(),
    },
  },
  etherToEuroRate: '344.4433',
  etherToTokenRate: '10',
  network: '',
  whitelistStatus: false,
})

test('Wallet selectors tests', (t) => {
  t.test('Ether balance in fiat selector', (assert) => {
    assert.plan(1)
    assert.equal(
      getBalanceInFiat('ether')(mockState).toNumber(),
      FnBigNumber.create(688.8866).toNumber()
    )
  })

  t.test('Ether balance object selector', (assert) => {
    assert.plan(1)
    const expectedEtherBalance: Balance = {
      animation: {
        duration: 0,
        lastBalance: FnBigNumber.create(0),
        show: false,
      },
      fiatValue: FnBigNumber.create(688.8866),
      value: FnBigNumber.create('2000000000000000000'),
    }
    assert.deepEqual(getEtherBalance(mockState), expectedEtherBalance)
  })
  t.test('Token balance as number selector', (assert) => {
    assert.plan(1)
    assert.deepEqual(
      getBalanceValue('token')(mockState),
      FnBigNumber.create('100000000000000000000')
    )
  })
  t.test('Token balance in fiat selector', (assert) => {
    assert.plan(1)
    assert.deepEqual(
      getBalanceInFiat('token')(mockState),
      FnBigNumber.create(3444.433)
    )
  })

  t.test('Token balance as object selector', (assert) => {
    assert.plan(1)
    const expectedTokenBalance: Balance = {
      animation: {
        duration: 0,
        lastBalance: FnBigNumber.create('0'),
        show: false,
      },
      fiatValue: FnBigNumber.create(3444.433),
      value: FnBigNumber.create('100000000000000000000'),
    }
    assert.deepEqual(getTokenBalance(mockState), expectedTokenBalance)
  })

  t.test('Test TokensToEther converter', (assert) => {
    assert.plan(1)
    const etherToTokenConverter = getEtherToTokenConverter(mockState)
    const etherAmount = FnBigNumber.create(2)
    const etherInToken = etherToTokenConverter(etherAmount)
    assert.true(etherInToken.equals(FnBigNumber.create(20)))
  })
  t.test('Test EtherToToken converter', (assert) => {
    assert.plan(1)
    const tokenToEtherConverter = getTokensToEtherConverter(mockState)
    const tokenAmount = FnBigNumber.create(30)
    const etherInToken = tokenToEtherConverter(tokenAmount)
    assert.true(etherInToken.equals(FnBigNumber.create(3)))
  })
})
