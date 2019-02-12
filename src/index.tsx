import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './configureStore'
import Root from './Root'

export const App = () => {
  const { store, history, blockchain } = configureStore()
  return <Root history={history} store={store} blockchain={blockchain} />
}

ReactDOM.render(<App />, document.getElementById('root'))
