pragma solidity ^0.8.0;

contract MyContract {
    uint256 public myNumber;
    string public myString;

    function setNumber(uint256 _number) public {
        myNumber = _number;
    }

    function setString(string memory _string) public {
        myString = _string;
    }

    function getValues() public view returns (uint256, string memory) {
        return (myNumber, myString);
    }
}

// This contract has two public state variables myNumber and myString, which can be read by any user of the contract. It also has three functions:
setNumber which allows the user to set the value of myNumber.
setString which allows the user to set the value of myString.
getValues which allows the user to retrieve the current values of myNumber and myString.
