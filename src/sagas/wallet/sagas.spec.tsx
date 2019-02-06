import { put } from 'redux-saga/effects'
import test from 'tape'
import * as walletActions from '../../components/wallet/actions'
import { createTestBlockchain } from '../../tests/blockchain'
import * as FnBigNumber from '../../utils/fnBignumber'
import { watchEtherBalanceSaga } from './sagas'

const blockchain = createTestBlockchain()

test('Watcher Sagas', t => {
  t.test(
    'First successful balance fetch should trigger SET_ETHER_BALANCE action',
    assert => {
      assert.plan(1)
      const gen = watchEtherBalanceSaga(blockchain.getEtherBalance)
      gen.next()
      gen.next({ value: FnBigNumber.create('0') })
      assert.deepEqual(
        gen.next(FnBigNumber.create('1')).value,
        put(walletActions.setEtherBalance('1')),
        'Triggered SET_ETHER_BALANCE action with correct value'
      )
    }
  )
})
