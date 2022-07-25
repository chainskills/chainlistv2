//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ChainList {
    // Custom types
    struct Article {
        uint256 id;
        address payable owner;
        string name;
        string description;
        uint256 price;
    }

    // State variables
    uint256 x;
    mapping(uint256 => Article) public articles;
    uint256 articleCounter;

    fallback() external {
        x = 1;
    }

    // Events
    event SellArticleEvent(
        uint256 indexed _id,
        address indexed _seller,
        string _name,
        uint256 _price
    );

    event BuyArticleEvent(
        uint256 indexed _id,
        address indexed _seller,
        address indexed _buyer,
        string _name,
        uint256 _price
    );

    // sell a new article
    function sellArticle(
        string memory _name,
        string memory _description,
        uint256 _price
    ) public {
        // a name is required
        bytes memory name = bytes(_name);
        require(name.length > 0, "A name is required");

        // a description is required
        bytes memory description = bytes(_description);
        require(description.length > 0, "A description is required");

        // the price can be 0 if seller decides to give the article

        // a new article
        articleCounter++;

        // store this article
        articles[articleCounter] = Article(
            articleCounter,
            payable(msg.sender),
            _name,
            _description,
            _price
        );

        // trigger the event to inform that a new article is for sale
        emit SellArticleEvent(articleCounter, msg.sender, _name, _price);
    }

    // buy an article
    function buyArticle(uint256 _id) public payable {
        // we check whether there is an article for sale
        require(articleCounter > 0, "No articles to buy");

        // we check that the article exists
        require(_id > 0 && _id <= articleCounter, "Article doesn't exist");

        // we retrieve the article
        Article storage article = articles[_id];

        // we don't allow the seller to buy his own article
        require(
            msg.sender != article.owner,
            "Seller cannot buy his own article"
        );

        // we check that the value sent corresponds to the price of the article
        require(msg.value == article.price, "Price doesn't match");

        // keep the seller address
        address payable seller = article.owner;

        // the buyer can pay the seller
        seller.transfer(msg.value);

        // the buyer becomes the new owner
        article.owner = payable(msg.sender);

        // trigger the event that the article is sold
        emit BuyArticleEvent(
            _id,
            seller,
            msg.sender,
            article.name,
            article.price
        );

        // trigger the event to inform that a new article is for sale
        emit SellArticleEvent(_id, msg.sender, article.name, article.price);
    }

    // fetch the number of articles in the contract
    function getNumberOfArticles() public view returns (uint256) {
        return articleCounter;
    }

    // fetch and return all articles for sale not owned by the current account
    function getArticlesForSale() public view returns (Article[] memory) {
        // prepare output array
        uint256[] memory articleIds = new uint256[](articleCounter);

        uint256 nbArticles = 0;
        // iterate over articles
        for (uint256 i = 1; i <= articleCounter; i++) {
            // keep the ID if the article is for sale
            if (
                (articles[i].owner != msg.sender) &&
                (articles[i].owner != address(0x0))
            ) {
                articleIds[nbArticles] = articles[i].id;
                nbArticles++;
            }
        }

        // returns all the articles for sale
        return (buildArticles(articleIds, nbArticles));
    }

    // fetch and return all articles for sale owned by the current account
    function getMyArticles() public view returns (Article[] memory) {
        // prepare output array
        uint256[] memory articleIds = new uint256[](articleCounter);

        uint256 nbArticles = 0;
        // iterate over articles
        for (uint256 i = 1; i <= articleCounter; i++) {
            // keep the ID if the article is still for sale
            if (articles[i].owner == msg.sender) {
                articleIds[nbArticles] = articles[i].id;
                nbArticles++;
            }
        }

        // returns all your articles
        return (buildArticles(articleIds, nbArticles));
    }

    // build an array of articles
    function buildArticles(uint256[] memory articleIds, uint256 nbArticles)
        internal
        view
        returns (Article[] memory)
    {
        Article[] memory allArticles = new Article[](nbArticles);
        for (uint256 i = 0; i < nbArticles; i++) {
            Article memory _article = articles[articleIds[i]];
            // we don't cannot use push() because this function is not allowed memory types
            allArticles[i] = _article;
        }
        return allArticles;
    }
}
