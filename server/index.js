const express = require("express");

const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xb0f8d338bf9f3d0859cb": 100, //PrivateKey:  54ccc47ad603d7382ad5e5c71773d3b010158a3ff71d5b12e5375a43192bdb6f
  "0xc612eeb4cb3c5d93cae5": 50, //PrivateKey:  3b3ef6a4aaba6aad1b39c0cf20fcb98eaa66a81b6b8a59b119c77c98c494f4d6
  "0xa09e09295dcd66e1357d": 75, //PrivateKey:  32869e35cab10051d10c06e836a7fb6e51d871bb02fd8a2c25f60b8d8b5b5649
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const {
    sender,
    recipient,
    amount,
    isSigned,
  } = req.body;
  
  setInitialBalance(sender);
  setInitialBalance(recipient);
 if (!isSigned) {
    res.status(400).send({ message: "Invalid signature!" });
  };
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
