// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

// Reference for calculating fees in percentage
// https://www.youtube.com/watch?v=nsf46dzgCog

contract BatchSender is Ownable {
  uint256 public fee;

  constructor(uint256 _fee) {
    fee = _fee;
  }

  function setPlatformFee(uint256 _fee) public onlyOwner {
    fee = _fee;
  }

  function multisendEther(address[] calldata _contributors, uint256[] calldata _balances) external payable {
    uint256 total = msg.value;
    uint256 i = 0;
    for (i; i < _contributors.length; i++) {
      require(total >= _balances[i]);
      assert(total - _balances[i] >= 0);
      total = total - _balances[i];
      uint256 netValue = _balances[i] - calculateFee(_balances[i]);
      (bool success, ) = _contributors[i].call{value: netValue}("");
      require(success, "Transfer failed.");
    }
  }

  function withdraw() public onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }

  function calculateFee(uint amount) public view returns(uint) {
    require((amount / 10000) * 10000 == amount, "amount too small");
    return amount * fee / 10000;
  }

}
