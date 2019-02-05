import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import test from 'tape'
import { getType } from 'typesafe-actions'
import * as actions from '../../components/errors/actions'
import { ErrorsState } from '../../components/errors/reducers'
// import * as selectors from '../../selectors'
import { createTestBlockchain } from '../../tests/blockchain'
import { createErrorRecoverSagas } from './sagas'

const blockchain = createTestBlockchain()

test('Error Recover Sagas', t => {
  t.test('recover from unsupported network', assert => {
    assert.plan(4)
    const { recoverUnsupportedNetwork } = createErrorRecoverSagas(blockchain)
    const generator = recoverUnsupportedNetwork()

    assert.deepEqual(
      generator.next().value,
      call(delay, 1000),
      'test delay of 1 second'
    )
    assert.deepEqual(
      generator.next().value,
      call(blockchain.checkNetwork),
      'call to check network'
    )
    assert.deepEqual(
      generator.next().value,
      put(actions.unsetUnsupportedNetwork()),
      'put unsetUnsupportedNetwork'
    )

    assert.true(generator.next().done, 'generator is at end')
  })

  t.test('recover from unsupported network saga', assert => {
    assert.plan(1)
    const {
      recoverUnsupportedNetworkSaga,
      recoverUnsupportedNetwork,
    } = createErrorRecoverSagas(blockchain)
    const generator = recoverUnsupportedNetworkSaga()

    assert.deepEqual(
      generator.next().value,
      takeLatest(
        getType(actions.setUnsupportedNetwork),
        recoverUnsupportedNetwork
      ),
      'recover from unsupported network saga handles latest only'
    )
  })

  t.test('recover from metaMaskLocked', assert => {
    assert.plan(3)
    const { recoverLockedMetaMask } = createErrorRecoverSagas(blockchain)
    const generator = recoverLockedMetaMask()

    assert.deepEqual(
      generator.next().value,
      call(delay, 1000),
      'test delay of 1 second'
    )
    assert.deepEqual(
      generator.next().value,
      call(blockchain.getAddress),
      'call to check network'
    )
    const mockError: ErrorsState = {
      metaMaskLocked: true,
      metaMaskNotInstalled: false,
      unsupportedNetwork: false,
    }
    assert.deepEqual(
      generator.next(mockError).value,
      put(actions.unsetMetmaskLocked()),
      'state recovers from metaMaskLocked'
    )
  })

  t.test('recover from locked MetaMask saga', assert => {
    assert.plan(1)
    const {
      recoverLockedMetaMask,
      recoverLockedMetaMaskSaga,
    } = createErrorRecoverSagas(blockchain)
    const generator = recoverLockedMetaMaskSaga()

    assert.deepEqual(
      generator.next().value,
      takeLatest(getType(actions.setMetamaskLocked), recoverLockedMetaMask),
      'recover from locked MetaMask saga handles latest only'
    )
  })
})
