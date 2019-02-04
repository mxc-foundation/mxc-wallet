import { applySpec } from 'ramda'
import * as React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { connect } from 'react-redux'
import { State } from '../../../selectors'
import * as selectors from '../../../selectors'

interface AddressProps {
  address: string
}

const Address = ({ address }: AddressProps) => (
  <span>
    {address}
    &nbsp; &nbsp;
    <CopyToClipboard text={address}>
      <a
        href="#"
        className="fa fa-clipboard text-success"
        title="Copy to clipboard"
      />
    </CopyToClipboard>
  </span>
)

const mapStateToProps: (state: State) => AddressProps = applySpec({
  address: selectors.getAddress,
})

export default connect(mapStateToProps)(Address)
