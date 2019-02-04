import React from "react";

const MXC_TOKENS = 10;

const MxcTokensComponent = ({ mxcTokens }: { mxcTokens: number }) => (
  <div>{`${mxcTokens} MXC`}</div>
);

export default () => <MxcTokensComponent mxcTokens={MXC_TOKENS} />;
