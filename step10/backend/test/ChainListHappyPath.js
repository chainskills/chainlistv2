const { expect, use } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("ChainList - Happy Path", function () {
  let chainListInstance;
  let owner;
  let seller;
  const articleName1 = "article 1";
  const articleDescription1 = "Description for article 1";
  const articlePrice1 = 0.5;

  before("setup contract for each test", async () => {
    const ChainList = await ethers.getContractFactory("ChainList");
    chainListInstance = await ChainList.deploy();
    await chainListInstance.deployed();
    [owner, seller] = await ethers.getSigners();
  });

  it("should be initialized with empty values", async () => {
    const article = await chainListInstance.getArticle();

    expect(article._seller, "seller must be empty").to.equal(
      ethers.constants.AddressZero
    );
    expect(article._name, "article's name must be empty").to.equal("");
    expect(
      article._description,
      "article's description must be empty"
    ).to.equal("");
    expect(article._price, "article's price must be zero").to.equal(
      ethers.constants.Zero
    );
  });

  it("should let us sell an article", async () => {
    const transaction = await chainListInstance
      .connect(seller)
      .sellArticle(
        articleName1,
        articleDescription1,
        ethers.utils.parseEther(articlePrice1.toString())
      );

    // wait for the transaction to complete
    const receipt = await transaction.wait();

    // check if the appropriate event has been emitted
    expect(receipt.events.length).to.equal(1);
    expect(
      receipt.events[0].event,
      "event should be SellArticleEvent"
    ).to.equal("SellArticleEvent");
    expect(
      receipt.events[0].args._seller,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      receipt.events[0].args._name,
      "article name must be " + articleName1
    ).to.equal(articleName1);
    expect(
      receipt.events[0].args._price.toString(),
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));

    // check the article
    const article = await chainListInstance.getArticle();
    expect(article._name, "article name must be " + articleName1).to.equal(
      articleName1
    );
    expect(
      article._description,
      "article description must be " + articleDescription1
    ).to.equal(articleDescription1);
    expect(
      article._price,
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));
  });
});
