import React from "react";

const ETHER_ADDRESS = "0x35bEhjq93n7BB4230FCB86Df41e8B502E96hjd7en";

const AddressComponent = ({ address }: { address: string }) => (
  <div>{address}</div>
);

export default () => <AddressComponent address={ETHER_ADDRESS} />; // TODO use connect to get the actual address
