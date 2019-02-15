import styled from 'styled-components'

export const Wrapper = styled.div`
  overflow: hidden;
`
export const SpreadHorizontally = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Container = styled(SpreadHorizontally)`
  margin: 0 -20px;
`
export const Vertically = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 20px;
`

export const VerticallyStretched = styled(Vertically)`
  flex-grow: 2;
`
export const TestNetWarning = styled.span`
  color: #00ffd9;
`
