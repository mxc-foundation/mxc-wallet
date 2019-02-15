import { join, map, pipe, prop } from 'ramda'
import * as R from 'ramda'
import * as React from 'react'
import { connect } from 'react-redux'
import { Col, Container, Jumbotron, Row } from 'reactstrap'
import { getNetworkName } from '../../../selectors'
import { NetworkList, whiteList } from '../networkList'

const joinNames: (whiteList: NetworkList) => string = pipe(
  map(prop('name')) as (whiteList: NetworkList) => ReadonlyArray<string>,
  join(', ')
)
const NETWORK_WHITELIST: string = joinNames(whiteList)

interface UseSupportedNetworkProps {
  networkDisplayName: string
}

const UseSupportedNetwork = ({
  networkDisplayName = 'Network',
}: UseSupportedNetworkProps): any => (
  <Container>
    <Row>
      <Col>
        <Jumbotron className="text-center">
          <h1 className="display-4">'{networkDisplayName}' is not supported</h1>
          <p className="lead">
            Please switch to a supported network in MetaMask. Supported
            networks: {NETWORK_WHITELIST}
          </p>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
)

const mapStateToProps = R.applySpec({
  networkDisplayName: getNetworkName,
})

export const UseSupportedNetworkCTA = connect(mapStateToProps)(
  UseSupportedNetwork
)
