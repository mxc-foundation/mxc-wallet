import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import * as selectors from '../../../selectors'
import { TestNetWarning } from '../../home/components/Forms/StyledComponents'

interface HeaderNetworkProps {
  onMainNet: boolean
}

const TestNet = () => (
  <TestNetWarning>Attention your are not on the Main Net!</TestNetWarning>
)

const MainNet = () => <span>Main Net</span>

const HeaderNetworkComponent = ({ onMainNet }: HeaderNetworkProps) => (
  <div className="balanceStatus inline-block">
    <span className="t-s-bold">
    	<i className="icon icon-feed"></i>
    	Network &nbsp;
    </span>
    <span className="t-s">
    {onMainNet ? <MainNet /> : <TestNet />}
    &nbsp;
    &nbsp;
    </span>
  </div>
)

const mapStateToProps: (
  state: selectors.State
) => HeaderNetworkProps = R.applySpec({
  onMainNet: selectors.getOnMainNet,
})

export default connect(mapStateToProps)(HeaderNetworkComponent)
