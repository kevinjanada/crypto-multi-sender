import { ethers } from "hardhat";
import { expect } from "chai";


describe("BatchSender", () => {
  let batchSender;

  describe("Deployment", () => {
    it("Should set the correct parameters", async () => {
      const FEE = 500 // 500 basis points = 5 pct
      const BatchSender = await ethers.getContractFactory("BatchSender");
      batchSender = await BatchSender.deploy(FEE);

      const fee = await batchSender.fee();
      expect(fee).to.equal(FEE);
    })
  });

  describe("Administrator functions", () => {
    it("Should be able to set new platform fee", async () => {
    });

    it("Should be able to witdhraw ether from contract", async () => {
    });
  });

  describe("Multisend Ether", () => {
    it("Should send correct amounts to respective addresses", () => {
    });

    it("Should get platform fee correctly", () => {
    });
  });
});
