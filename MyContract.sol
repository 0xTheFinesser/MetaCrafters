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
