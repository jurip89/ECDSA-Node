import server from "./server";
import {secp256k1} from 'ethereum-cryptography/secp256k1';
import {toHex} from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey}) {
  
  const onChangeAdress = e => {
    setAddress(e.target.value);
  }
  const onChangePrivateKey = e => {
    setPrivateKey(e.target.value);
  };
  async function getBalance(evt) {
    evt.preventDefault();
    if(!privateKey || !address) return alert('Please fill in all fields')
    const verify = toHex(secp256k1.getPublicKey(privateKey).slice(1)).slice(-20)
    if (address.slice(2) === verify) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
    <form onSubmit={getBalance}>
      <label>
        Address
        <input placeholder="Type your Address" onChange={onChangeAdress} value={address}/>
      </label>
      <label>
        Private Key
        <input placeholder="Type your Private Key" onChange={onChangePrivateKey} value={privateKey}/>
      </label>
      <button className="button">Get Balance</button>
    </form>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
