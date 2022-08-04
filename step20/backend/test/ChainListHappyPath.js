const { expect, use } = require("chai");
const { ethers } = require("hardhat");

describe("ChainList - Happy Path", function () {
  let chainListInstance;
  let owner;
  let seller;
  let buyer;
  const articleID1 = 1;
  const articleName1 = "article 1";
  const articleDescription1 = "Description for article 1";
  const articlePrice1 = 0.5;
  const articleID2 = 2;
  const articleName2 = "article 2";
  const articleDescription2 = "Description for article 2";
  const articlePrice2 = 0.7;
  let sellerBalanceBeforeSale, sellerBalanceAfterSale;
  let buyerBalanceBeforeSale, buyerBalanceAfterSale;

  before("setup contract for each test", async () => {
    const ChainList = await ethers.getContractFactory("ChainList");
    chainListInstance = await ChainList.deploy();
    await chainListInstance.deployed();
    [owner, seller, buyer] = await ethers.getSigners();
  });

  it("should be initialized with empty values", async () => {
    let nbArticles = await chainListInstance
      .connect(seller)
      .getNumberOfArticles();
    expect(nbArticles, "number of articles must be zero").to.equal(0);

    let marketplace = await chainListInstance
      .connect(seller)
      .getMarketplace();
    expect(
      marketplace.length,
      "there shouldn't be any article fetched for the seller"
    ).to.equal(0);

    nbArticles = await chainListInstance.connect(buyer).getNumberOfArticles();
    expect(nbArticles, "number of articles must be zero").to.equal(0);

    marketplace = await chainListInstance
      .connect(buyer)
      .getMarketplace();
    expect(
      marketplace.length,
      "there shouldn't be any article fetched for the buyer"
    ).to.equal(0);
  });

  // sell a first article
  it("should let us add a first article", async () => {
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
    expect(receipt.logs.length).to.equal(1);
    expect(
      receipt.events[0].event,
      "event should be SellArticleEvent"
    ).to.equal("SellArticleEvent");
    expect(receipt.events[0].args._id, "ID must be " + articleID1).to.equal(
      articleID1
    );
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
    let nbArticles = await chainListInstance
      .connect(seller)
      .getNumberOfArticles();
    expect(nbArticles, "number of articles must be 1").to.equal(1);

    let marketplace = await chainListInstance
      .connect(seller)
      .getMarketplace();
    expect(
      marketplace.length,
      "there must be no article for sale for the seller (seller cannot sell his own article)"
    ).to.equal(0);

    sellerArticles = await chainListInstance.connect(seller).getMyArticles();

    expect(sellerArticles[0].id, "article id must be 1").to.equal(articleID1);
    expect(
      sellerArticles[0].owner,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      sellerArticles[0].name,
      "article name must be " + articleName1
    ).to.equal(articleName1);
    expect(
      sellerArticles[0].description,
      "article description must be " + articleDescription1
    ).to.equal(articleDescription1);
    expect(
      sellerArticles[0].price,
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));

    // the buyer checks the article on the marketplace
    nbArticles = await chainListInstance.connect(buyer).getNumberOfArticles();
    expect(nbArticles, "number of articles must be 1").to.equal(1);

    marketplace = await chainListInstance
      .connect(buyer)
      .getMarketplace();
    expect(
      marketplace.length,
      "there buyer must see one article on the marketplace"
    ).to.equal(1);

    expect(marketplace[0].id, "article id must be 1").to.equal(articleID1);
    expect(
      marketplace[0].owner,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      marketplace[0].name,
      "article name must be " + articleName1
    ).to.equal(articleName1);
    expect(
      marketplace[0].description,
      "article description must be " + articleDescription1
    ).to.equal(articleDescription1);
    expect(
      marketplace[0].price,
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));
  });

  // sell a second article
  it("should let us add a second article", async () => {
    const transaction = await chainListInstance
      .connect(seller)
      .sellArticle(
        articleName2,
        articleDescription2,
        ethers.utils.parseEther(articlePrice2.toString())
      );

    // wait for the transaction to complete
    const receipt = await transaction.wait();

    // check if the appropriate event has been emitted
    expect(receipt.logs.length).to.equal(1);
    expect(
      receipt.events[0].event,
      "event should be SellArticleEvent"
    ).to.equal("SellArticleEvent");
    expect(receipt.events[0].args._id, "ID must be " + articleID2).to.equal(
      articleID2
    );
    expect(
      receipt.events[0].args._seller,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      receipt.events[0].args._name,
      "article name must be " + articleName2
    ).to.equal(articleName2);
    expect(
      receipt.events[0].args._price.toString(),
      "article price must be " + articlePrice2 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice2.toString()));

    // check the article
    let nbArticles = await chainListInstance
      .connect(seller)
      .getNumberOfArticles();
    expect(nbArticles, "number of articles must be 2").to.equal(2);

    let marketplace = await chainListInstance
      .connect(seller)
      .getMarketplace();
    expect(
      marketplace.length,
      "there must be no article for sale for the seller (seller cannot sell his own article)"
    ).to.equal(0);

    sellerArticles = await chainListInstance.connect(seller).getMyArticles();

    expect(sellerArticles[0].id, "article id must be 1").to.equal(articleID1);
    expect(
      sellerArticles[0].owner,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      sellerArticles[0].name,
      "article name must be " + articleName1
    ).to.equal(articleName1);
    expect(
      sellerArticles[0].description,
      "article description must be " + articleDescription1
    ).to.equal(articleDescription1);
    expect(
      sellerArticles[0].price,
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));

    expect(sellerArticles[1].id, "article id must be 2").to.equal(articleID2);
    expect(
      sellerArticles[1].owner,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      sellerArticles[1].name,
      "article name must be " + articleName2
    ).to.equal(articleName2);
    expect(
      sellerArticles[1].description,
      "article description must be " + articleDescription2
    ).to.equal(articleDescription2);
    expect(
      sellerArticles[1].price,
      "article price must be " + articlePrice2 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice2.toString()));

    // the buyer checks the article on the marketplace
    nbArticles = await chainListInstance.connect(buyer).getNumberOfArticles();
    expect(nbArticles, "number of articles must be 2").to.equal(2);

    marketplace = await chainListInstance
      .connect(buyer)
      .getMarketplace();
    expect(
      marketplace.length,
      "there buyer must see two articles on the marketplace"
    ).to.equal(2);

    expect(marketplace[0].id, "article id must be 1").to.equal(articleID1);
    expect(
      marketplace[1].owner,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      marketplace[0].name,
      "article name must be " + articleName1
    ).to.equal(articleName1);
    expect(
      marketplace[0].description,
      "article description must be " + articleDescription1
    ).to.equal(articleDescription1);
    expect(
      marketplace[0].price,
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));

    expect(marketplace[1].id, "article id must be 2").to.equal(articleID2);
    expect(
      marketplace[1].owner,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      marketplace[1].name,
      "article name must be " + articleName2
    ).to.equal(articleName2);
    expect(
      marketplace[1].description,
      "article description must be " + articleDescription2
    ).to.equal(articleDescription2);
    expect(
      marketplace[1].price,
      "article price must be " + articlePrice2 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice2.toString()));
  });

  // buy the first article
  it("should let us buy the first article", async () => {
    // record balances of seller and buyer before the sale
    sellerBalanceBeforeSale = await seller.getBalance();
    buyerBalanceBeforeSale = await buyer.getBalance();

    // buy the article
    const transaction = await chainListInstance
      .connect(buyer)
      .buyArticle(articleID1, {
        value: ethers.utils.parseEther(articlePrice1.toString(), "ether"),
      });

    // wait for the transaction to complete
    const receipt = await transaction.wait();

    // check if the appropriate events have been emitted

    // check the first event
    expect(receipt.logs.length).to.equal(2);
    expect(receipt.events[0].event, "event should be BuyArticleEvent").to.equal(
      "BuyArticleEvent"
    );
    expect(
      receipt.events[0].args._seller,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      receipt.events[0].args._buyer,
      "buyer must be " + buyer.address
    ).to.equal(buyer.address);
    expect(
      receipt.events[0].args._name,
      "article name must be " + articleName1
    ).to.equal(articleName1);
    expect(
      receipt.events[0].args._price.toString(),
      "event article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));

    // check the second event
    expect(
      receipt.events[1].event,
      "event should be SellArticleEvent"
    ).to.equal("SellArticleEvent");
    expect(
      receipt.events[1].args._seller,
      "seller must be " + buyer.address
    ).to.equal(buyer.address);
    expect(
      receipt.events[1].args._name,
      "article name must be " + articleName1
    ).to.equal(articleName1);
    expect(
      receipt.events[1].args._price.toString(),
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));

    // record balances of seller and buyer after the sale
    sellerBalanceAfterSale = await seller.getBalance();
    buyerBalanceAfterSale = await buyer.getBalance();

    expect(
      sellerBalanceAfterSale,
      "seller should have earned " + articlePrice1 + " ETH"
    ).to.equal(
      sellerBalanceBeforeSale.add(
        ethers.utils.parseUnits(articlePrice1.toString(), "ether")
      )
    );

    expect(
      buyerBalanceAfterSale,
      "buyer should have spent " + articlePrice1 + " ETH"
    ).to.be.lte(
      buyerBalanceBeforeSale.sub(
        ethers.utils.parseUnits(articlePrice1.toString(), "ether")
      )
    );

    // check that the first article is now owned by the buyer
    let article = await chainListInstance.articles(articleID1);
    expect(article.id, "article id must be 1").to.equal(articleID1);
    expect(article.owner, "new seller must be " + buyer.address).to.equal(
      buyer.address
    );
    expect(article.name, "article name must be " + articleName1).to.equal(
      articleName1
    );
    expect(
      article.description,
      "description must be " + articleDescription1
    ).to.equal(articleDescription1);
    expect(
      article.price,
      "article price must be " + articlePrice1 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice1.toString()));

    // check that the buyer sees only one article to purchase
    marketplace = await chainListInstance
      .connect(buyer)
      .getMarketplace();
    expect(
      marketplace.length,
      "there buyer must see one article on the marketplace"
    ).to.equal(1);

    expect(marketplace[0].id, "article id must be 2").to.equal(articleID2);
    expect(
      marketplace[0].owner,
      "seller must be " + seller.address
    ).to.equal(seller.address);
    expect(
      marketplace[0].name,
      "article name must be " + articleName2
    ).to.equal(articleName2);
    expect(
      marketplace[0].description,
      "article description must be " + articleDescription2
    ).to.equal(articleDescription2);
    expect(
      marketplace[0].price,
      "article price must be " + articlePrice2 + " ETH"
    ).to.equal(ethers.utils.parseEther(articlePrice2.toString()));
  });
});
