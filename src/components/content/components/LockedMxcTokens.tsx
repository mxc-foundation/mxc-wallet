import React from 'react'

const LOCKED_MXC_TOKENS = 3

const LockedMxcTokensComponent = ({
  lockedMXCTokens,
}: {
  lockedMXCTokens: number;
}) => <div>{lockedMXCTokens}</div>

export default () => (
  <LockedMxcTokensComponent lockedMXCTokens={LOCKED_MXC_TOKENS} />
)
