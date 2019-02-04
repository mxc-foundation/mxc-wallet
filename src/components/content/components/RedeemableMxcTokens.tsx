import React from "react";

const REDEEMABLE_MXC_TOKENS = 7;

const RedeemableMxcTokensComponent = ({
  redeemableMXCTokens
}: {
  redeemableMXCTokens: number;
}) => <div>{redeemableMXCTokens}</div>;

export default () => (
  <RedeemableMxcTokensComponent redeemableMXCTokens={REDEEMABLE_MXC_TOKENS} />
);
