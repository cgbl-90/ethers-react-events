import { useState } from "react";
const { ethers } = require("ethers");
const INFURA_ID = "5b37779062e04102a6e9efda4c5f5cb9";
const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export default function InspectEvents() {
  let [block, setBlock] = useState(0);
  let [address, setAddress] = useState("");

  async function requestHistory(event) {
    event.preventDefault();
    let contract = new ethers.Contract(address, ERC20_ABI, provider);
    let reply = await contract.queryFilter("Transfer", block - 10, block);
    console.log(reply);
  }

  return (
    <main>
      <span>
        <form>
          <h1>Inspect Events</h1>
          <br />
          <span>
            <h3>For Address</h3>
            <input
              type="text"
              onChange={(event) => setAddress(event.target.value.trim())}
            />
          </span>
          <br />
          <span>
            <h3>In Block</h3>
            <input
              type="text"
              onChange={(event) => setBlock(Number(event.target.value.trim()))}
            />
          </span>
          <br />
          <button onClick={requestHistory}>SEARCH</button>
        </form>
        <br />
        <h4>Open console log!</h4>
      </span>
    </main>
  );
}
