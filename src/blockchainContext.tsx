import React from 'react'
import { Blockchain } from './utils/blockchain'

const BlockchainContext = React.createContext<Blockchain | undefined>(undefined)

export const BlockchainProvider = BlockchainContext.Provider

export const withBlockchain = (Component: any): React.FunctionComponent => (
  props: any
) => (
  <BlockchainContext.Consumer>
    {(blockchain) => <Component {...props} blockchain={blockchain} />}
  </BlockchainContext.Consumer>
)
