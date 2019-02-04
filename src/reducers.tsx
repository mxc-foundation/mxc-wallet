import { connectRouter } from "connected-react-router"
import { History } from "history"
import { combineReducers } from "redux"
import { reducer as form } from "redux-form"
import errorsReducer from "./components/errors/reducers"
import walletReducer from "./components/wallet/reducers"

export const createRootReducer = (history: History) =>
  combineReducers({
    errors: errorsReducer,
    form,
    router: connectRouter(history),
    wallet: walletReducer
  })
