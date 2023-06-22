import { useState } from "react";
import {secp256k1} from 'ethereum-cryptography/secp256k1';
import { utf8ToBytes, toHex } from"ethereum-cryptography/utils";
import server from "./server";

function Transfer({ address, setBalance, privateKey, setAddress, setPrivateKey}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  const hashMessage = (message) => {
    const messageBytes = utf8ToBytes(message);
    const messageHash = toHex(messageBytes);
    return messageHash;
  };

  async function transfer(evt) {
    evt.preventDefault();
    const message= `${address} sends ${sendAmount} to ${recipient}`
    const messageHash = hashMessage(message);
    const publicKey = toHex(secp256k1.getPublicKey(privateKey));
    const verify = toHex(secp256k1.getPublicKey(privateKey).slice(1)).slice(-20)
    if (address.slice(2) !== verify) return alert("Invalid signature");
    const signature = secp256k1.sign(messageHash, privateKey);
    const isSigned = secp256k1.verify(signature, messageHash, publicKey);
    
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        isSigned,
      });
      alert(message);
      setAddress("");
      setPrivateKey("");
      setSendAmount("");
      setRecipient("");
      setBalance(0)
    } catch (ex) {
      alert(ex.message)
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
