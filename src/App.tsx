import { ConnectedRouter } from 'connected-react-router'
import { History } from 'history'
import * as React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import Error from './components/errors'
import GrantTokens from './components/grant'
import Header from './components/header'
import Home from './components/home'
import Navbar from './components/navbar'
import SendEther from './components/send-ether'
import SendTokens from './components/send-tokens'
import terms from './components/terms'
import { Transactions } from './components/Transactions'
import { getHasMainError, State } from './selectors'

const AppContent = () => (
  <div>
    <Header />
    <Navbar />
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/grant" component={GrantTokens} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/send-tokens" component={SendTokens} />
      <Route path="/send-ether" component={SendEther} />
      <Route path="/terms-and-conditions" component={terms} />
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
