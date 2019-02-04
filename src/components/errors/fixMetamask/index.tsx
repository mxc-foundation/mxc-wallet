import * as React from "react"
import { Col, Container, Jumbotron, Row } from "reactstrap"
import * as metamaskBanner from "../../../static/metamask.png"

export const InstallMetamaskCTA = () => (
  <Container>
    <Row>
      <Col>
        <Jumbotron className="text-center">
          <h1 className="display-4">Metamask not found!</h1>
          <p className="lead">
            In order to use this app to participate in the Fundament ICO you
            need to have Metamask installed and configured.
          </p>
          <hr className="my-4" />
          <p>
            Please klick the banner below to visit the Metamask website and
            follow the installation instructions.
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
