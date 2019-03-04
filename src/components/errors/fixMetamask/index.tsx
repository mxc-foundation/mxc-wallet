import * as React from 'react'
import { Col, Container, Jumbotron, Row } from 'reactstrap'
import * as metamaskBanner from '../../../static/metamask.png'

export const InstallMetamaskCTA = () => (
  <Container>
    <Row>
      <Col>
        <Jumbotron className="text-center">
          <h1 className="display-4">You're missing Metamask!</h1>
          <p className="lead">
            This applications requires you to install Metamask.
            <br/>
            Please install Metamask, then reload this page.
          </p>
          <a href="https://metamask.io" target="_blank">
            <img
              className="img-fluid"
              src={(metamaskBanner as unknown) as string}
              alt="Metamask banner"
            />
          </a>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
)

export const UnlockMetamaskCTA = () => (
  <Container>
    <Row>
      <Col>
        <Jumbotron className="text-center">
          <h1 className="display-4">Metamask is locked!</h1>
          <p className="lead">Please unlock Metamask with your password.</p>
        </Jumbotron>
      </Col>
    </Row>
  </Container>
)
