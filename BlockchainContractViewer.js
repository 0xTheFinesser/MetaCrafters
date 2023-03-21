import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const MyContractABI = [
  {
    "inputs": [],
    "name": "myNumber",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "myString",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_number",
        "type": "uint256"
      }
    ],
    "name": "setNumber",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_string",
        "type": "string"
      }
    ],
    "name": "setString",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const MyContractAddress = '0x...'; // Replace with your contract address

function App() {
  const [myNumber, setMyNumber] = useState(0);
  const [myString, setMyString] = useState('');

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(MyContractABI, MyContractAddress);
    const myNumber = await contract.methods.myNumber().call();
    const myString = await contract.methods.myString().call();
    setMyNumber(myNumber);
    setMyString(myString);
  }

  async function setNumber(value) {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(MyContractABI, MyContractAddress);
    await contract.methods.setNumber(value).send({ from: '0x...' }); // Replace with your address
    setMyNumber(value);
  }

  async function setString(value) {
    const web3 = window.web3;
    const contract = new web3.eth.Contract(MyContractABI, MyContractAddress);
    await contract.methods.setString(value).send({ from: '0x...' }); // Replace with your address
    setMyString(value);
  }

  return (
    <div>
      <p>My Number: {myNumber}</p>
      <p>My String: {myString}</p>
      <button onClick={() => setNumber(42)}>Set Number to 42</button>
      <button onClick={() => setString('Hello World')}>Set String to "Hello World"</button>
    </div>
  );
}

export default App;
