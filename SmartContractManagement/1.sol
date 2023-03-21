pragma solidity ^0.8.0;

contract MyContract {
    uint256 public myNumber;
    string public myString;
    
// This contract has two public state variables myNumber and myString, which can be read by any user of the contract. It also has three functions:

    function setNumber(uint256 _number) public {
        myNumber = _number;
    }

// setNumber which allows the user to set the value of myNumber.

    function setString(string memory _string) public {
        myString = _string;
    }

// setString which allows the user to set the value of myString.

    function getValues() public view returns (uint256, string memory) {
        return (myNumber, myString);
    }
}

// getValues which allows the user to retrieve the current values of myNumber and myString.
