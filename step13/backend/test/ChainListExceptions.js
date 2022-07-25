const { expect, assert, use } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");

use(solidity);

describe("ChainList - Unhappy Path", function () {
  let chainListInstance;
  let seller;
  let buyer;
  const articleID1 = 1;
  const articleID2 = 2;
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
    const nbArticles = await chainListInstance.getNumberOfArticles();
    expect(nbArticles, "number of articles must be zero").to.equal(0);

    const articlesForSale = await chainListInstance.getArticlesForSale();
    expect(
      articlesForSale.length,
      "there shouldn't be any article for sale"
    ).to.equal(0);
  });

  // no article for sale yet
  it("should throw an exception if you try to buy an article when there is no article for sale yet", async () => {
    // try to buy the article
    await expect(
      chainListInstance.connect(buyer).buyArticle(articleID1, {
        value: ethers.utils.parseEther(articlePrice1.toString()),
      })
    ).to.be.revertedWith("No articles to buy");

    const nbArticles = await chainListInstance.getNumberOfArticles();
    expect(nbArticles, "number of articles must be zero").to.equal(0);
  });

  // buy an article that does not exist
  it("should throw an exception if you try to buy an article that doesn't exist", async () => {
    // first we sell an article
    const transaction = await chainListInstance
      .connect(seller)
      .sellArticle(
        articleName1,
        articleDescription1,
        ethers.utils.parseEther(articlePrice1.toString())
      );

    // wait for the transaction to complete
    await transaction.wait();

    // try to buy the article not yet for sale on the marketplace
    await expect(
      chainListInstance.connect(buyer).buyArticle(articleID2, {
        value: ethers.utils.parseEther(articlePrice1.toString()),
      })
    ).to.be.revertedWith("Article doesn't exist");
  });

  // buying an article you are selling
  it("should throw an exception if you try to buy your own article", async () => {
    // try to buy our own article
    await expect(
      chainListInstance.connect(seller).buyArticle(articleID1, {
        value: ethers.utils.parseEther(articlePrice1.toString()),
      })
    ).to.be.revertedWith("Seller cannot buy his own article");
  });

  // incorrect price
  it("should throw an exception if you try to buy an article for a value different from its price", async () => {
    // try to buy the article
    await expect(
      chainListInstance.connect(buyer).buyArticle(articleID1, {
        value: ethers.utils.parseEther(badArticlePrice1.toString()),
      })
    ).to.be.revertedWith("Price doesn't match");
  });
});
