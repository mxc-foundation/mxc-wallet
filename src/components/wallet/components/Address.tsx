import { applySpec } from 'ramda'
import * as React from 'react'
import { connect } from 'react-redux'
import { State } from '../../../selectors'
import * as selectors from '../../../selectors'

interface AddressProps {
  address: string
  url: string
}

const Address = ({ address, url }: AddressProps) => (
  <span>
    <a href={url} target="_blank" title="Open on etherscan">
      {address}
    </a>
  </span>
)

const mapStateToProps: (state: State) => AddressProps = applySpec({
  address: selectors.getAddress,
  url: selectors.getEtherscanUrl,
})

export default connect(mapStateToProps)(Address)
