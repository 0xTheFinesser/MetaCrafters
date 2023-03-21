import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// This section of the code imports the necessary dependencies for the application. React is imported, along with two functions from the React library: 
// useState and useEffect. These functions allow us to define and update state variables within our React components. 
// We also import the Web3 library, which is used to interact with the blockchain.

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

// These lines define the ABI (Application Binary Interface) and address of the Solidity contract we're interacting with. 
// The ABI is a JSON file that describes the functions and variables of the contract, while the address is a unique identifier for the contract on the blockchain.

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

// This is the main component of the React application, defined as a function called App. 
// The useState function is used to define two state variables, myNumber and myString, which are initialized to 0 and an empty string.
// The useEffect function is called when the component is mounted, and it calls two other functions, loadWeb3 and loadBlockchainData. 
// These functions are defined later in the code and are used to connect to the blockchain and retrieve data from the Solidity contract.
// The setNumber and setString functions are used to update the state variables when the user clicks on the corresponding buttons. They call the corresponding functions in the Solidity contract using the Web3 library.
// Finally, the component returns some JSX code, which is used to define the layout and content of the web page. It displays the values of myNumber and myString using two <p> tags, and it includes two buttons that call the setNumber and setString functions when clicked.
