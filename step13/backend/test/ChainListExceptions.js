const { expect, assert, use } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("ChainList - Unhappy Path", function () {
  let chainListInstance;
  let seller;
  let buyer;
  const articleName1 = "article 1";
  const articleDescription1 = "Description for article 1";
  const articlePrice1 = 0.5;
  const badArticlePrice1 = 0.42;

  before("setup contract for each test", async () => {
    const ChainList = await ethers.getContractFactory("ChainList");
    chainListInstance = await ChainList.deploy();
    await chainListInstance.deployed();
    [owner, seller, buyer] = await ethers.getSigners();
  });

  it("should be initialized with empty values", async () => {
    const article = await chainListInstance.getArticle();

    expect(article._owner, "owner must be empty").to.equal(
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

  // no article for sale yet
  it("should throw an exception if you try to buy an article when there is no article for sale yet", async () => {
    // try to buy the article
    await expect(
      chainListInstance.connect(buyer).buyArticle({
        value: ethers.utils.parseEther(articlePrice1.toString()),
      })
    ).to.be.revertedWith("No article to buy");
  });

  // buying the article you are selling
  it("should throw an exception if you try to buy your own article", async () => {
    // first we need to sell an article
    const transaction = await chainListInstance
      .connect(seller)
      .sellArticle(
        articleName1,
        articleDescription1,
        ethers.utils.parseEther(articlePrice1.toString())
      );

    // wait for the transaction to complete
    await transaction.wait();

    // try to buy our own article
    await expect(
      chainListInstance.connect(seller).buyArticle({
        value: ethers.utils.parseEther(articlePrice1.toString()),
      })
    ).to.be.revertedWith("Seller cannot buy his own article");
  });

  // incorrect price
  it("should throw an exception if you try to buy an article for a value different from its price", async () => {
    // try to buy the article
    await expect(
      chainListInstance.connect(buyer).buyArticle({
        value: ethers.utils.parseEther(badArticlePrice1.toString()),
      })
    ).to.be.revertedWith("Price doesn't match");
  });
});
