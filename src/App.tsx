import { ConnectedRouter } from "connected-react-router"
import * as React from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"
import Header from "./components/header"
import Navbar from "./components/navbar"
import Error from "./components/errors"
import { getHasMainError, State } from "./selectors"
import Content from "./components/content"
import { History } from "history"

const AppContent = () => (
  <div>
    <Header />
    <Navbar />
    <Content />
  </div>
)
const Router = () => <Route exact path="/" component={AppContent} />

interface AppProps {
  mainError: boolean
  history: History
}

const App = ({ mainError, history }: AppProps) => (
  <ConnectedRouter history={history}>
    {mainError ? <Error /> : <Router />}
  </ConnectedRouter>
)

const mapStateToProps = (state: State) => ({
  mainError: getHasMainError(state)
})

export default connect(mapStateToProps)(App)
