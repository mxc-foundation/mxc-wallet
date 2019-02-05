import BigNumber from 'bn.js'
import { eventChannel } from 'redux-saga'
import { put } from 'redux-saga/effects'
import test from 'tape'
import * as walletActions from '../../components/wallet/actions'
import * as notificationsActions from '../../notifications/actions'
import { createTestBlockchain } from '../../tests/blockchain'
import { eventTypes } from '../channels'
import { createWalletWatcherSagas } from './sagas'

const createChannel = () => {
  return eventChannel(() => () => undefined)
}

const blockchain = createTestBlockchain()

test('Watcher Sagas', t => {
  t.test(
    'First successful balance fetch should trigger SET_ETHER_BALANCE action',
    assert => {
      assert.plan(1)
      const { watchEtherBalanceSaga } = createWalletWatcherSagas(blockchain)
      const gen = watchEtherBalanceSaga()
      gen.next()
      gen.next(createChannel())
      assert.deepEqual(
        gen.next({
          type: eventTypes.walletChange,
          value: new BigNumber(0),
        }).value,
        put(walletActions.setEtherBalance(new BigNumber(0))),
        'Triggered SET_ETHER_BALANCE action with correct value'
      )
    }
  )
  t.test(
    'Incoming Payment should trigger INCOMING_ETHER_PAYMENT nofitication',
    assert => {
      assert.plan(1)
      const { watchEtherBalanceSaga } = createWalletWatcherSagas(blockchain)
      const generator = watchEtherBalanceSaga()
      generator.next()
      generator.next(createChannel())
      generator.next({
        type: eventTypes.incomingPayment,
        value: new BigNumber(500),
      })
      assert.deepEqual(
        generator.next().value,
        put(notificationsActions.receivedEther()),
        'Triggered INCOMING_ETHER_PAYMENT notification'
      )
    }
  )
  t.test(
    'Incoming Tokens should trigger INCOMING_TOKENS nofitication',
    assert => {
      assert.plan(1)
      const { watchTokenBalanceSaga } = createWalletWatcherSagas(blockchain)
      const generator = watchTokenBalanceSaga()
      generator.next()
      generator.next(createChannel())
      generator.next({
        type: eventTypes.incomingPayment,
        value: new BigNumber(500),
      })
      generator.next({
        animation: {
          lastBalance: new BigNumber(100),
        },
      })
      assert.deepEqual(
        generator.next().value,
        put(notificationsActions.receivedTokens()),
        'Triggered INCOMING_ETHER_PAYMENT notification'
      )
    }
  )
})
