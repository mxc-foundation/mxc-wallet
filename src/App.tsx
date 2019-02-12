import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import * as React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import Content from './components/content'
import Error from './components/errors'
import Header from './components/header'
import Navbar from './components/navbar'
import { Transactions } from './components/Transactions'
import { getHasMainError, State } from './selectors'

const AppContent = () => (
  <div>
    <Header />
    <Navbar />
    <div>
      <Route exact path="/" component={Content} />
      <Route exact path="/grant" component={Content} />
      <Route path="/transactions" component={Transactions} />
    </div>
  </div>
)

interface AppProps {
  mainError: boolean
  history: History
}

const App = ({ mainError, history }: AppProps) => (
  <ConnectedRouter history={history}>
    {mainError ? <Error /> : <AppContent />}
  </ConnectedRouter>
)

const mapStateToProps = (state: State) => ({
  mainError: getHasMainError(state),
})

export default connect(mapStateToProps)(App)
