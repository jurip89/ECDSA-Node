import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
      />
      <Transfer
      setBalance={setBalance}
      setAddress={setAddress}
      setPrivateKey={setPrivateKey}
      address={address}
      privateKey={privateKey}
      />
      <div className="wallets">
        <p>"0xb0f8d338bf9f3d0859cb": 100, //PrivateKey:  54ccc47ad603d7382ad5e5c71773d3b010158a3ff71d5b12e5375a43192bdb6f</p>
        <p>"0xc612eeb4cb3c5d93cae5": 50, //PrivateKey:  3b3ef6a4aaba6aad1b39c0cf20fcb98eaa66a81b6b8a59b119c77c98c494f4d6</p>
        <p>"0xa09e09295dcd66e1357d": 75, //PrivateKey:  32869e35cab10051d10c06e836a7fb6e51d871bb02fd8a2c25f60b8d8b5b5649</p>
      </div>
    </div>
  );
}

export default App;
