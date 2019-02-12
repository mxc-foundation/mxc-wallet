import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import * as errorActions from './components/errors/actions'
import createErrorsSaga from './components/errors/sagas'
import { createRootReducer } from './reducers'
import createWatcherSagas from './sagas'
import createBlockchain from './utils/blockchain'
import * as errors from './utils/errors'
import createWeb3 from './utils/web3'

export default () => {
  const history = createBrowserHistory()
  const sagaMiddleware = createSagaMiddleware()

  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  )
  try {
    const web3 = createWeb3()
    const blockchain = createBlockchain(web3)
    sagaMiddleware.run(createErrorsSaga(web3))
    sagaMiddleware.run(createWatcherSagas(blockchain))
    return { store, history, blockchain }
  } catch (error) {
    switch (error.message) {
      case errors.ERROR_METAMASK_NOT_INSTALLED:
        store.dispatch(errorActions.setMissingMetaMask())
        break
      default:
        throw error
    }
    return { store, history }
  }
}
