import React, { useState, useEffect } from "react";
import {
	Container,
	Grid,
	Fab,
	Box,
	Typography,
	Tabs,
	Tab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArticleDialog from "./ArticleDialog";
import ArticleCard from "./ArticleCard";
import { useStore } from "context/StoreProvider";
import {
	getMyArticles,
	getMarketplace,
	sellArticle,
	buyArticle,
} from "context/web3Actions";

const Articles = () => {
	const [state, dispatch] = useStore();

	// flag used to display or hide the modal dialog box
	const [isOpen, setIsOpen] = useState(false);

	const [selectedTab, setSelectedTab] = useState(1);

	const handleChangeSelector = async (event, newSelection) => {
		setSelectedTab(newSelection);
	};

	// manage the display of the dialog box
	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		async function fetchArticles() {
			if (state.account !== null) {
				if (selectedTab === 0) {
					/* It's a debugging statement. */
					// marketplace
					await getMarketplace(state, dispatch);
				} else {
					await getMyArticles(state, dispatch);
				}
			}
		}
		fetchArticles();
		// eslint-disable-next-line
	}, [state.account, selectedTab]);

	// called when we add the article to be sold
	const onSellArticle = async (_article) => {
		await sellArticle(state, dispatch, _article);
	};

	// called when we buy the article
	const onBuyArticle = async (article) => {
		await buyArticle(state, dispatch, article);
	};

	return (
		<div>
			<div>
				<Container>
					<Tabs
						value={selectedTab}
						onChange={handleChangeSelector}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="Marketplace" />
						<Tab label="My Articles" />
					</Tabs>
				</Container>

				<Container fixed>
					<Fab
						aria-label="add"
						color="primary"
						onClick={handleOpen}
						sx={{
							position: "fixed",
							bottom: 16,
							right: 16,
						}}
					>
						<AddIcon />
					</Fab>

					<ArticleDialog
						isDialogOpened={isOpen}
						handleCloseDialog={() => setIsOpen(false)}
						handleSaveDialog={onSellArticle}
					/>

					{state.articles.length === 0 && (
						<Box component="span" m={1}>
							<Typography align="center" color="inherit" variant="h6">
								No articles to display
							</Typography>
						</Box>
					)}

					<Grid container spacing={4}>
						{state.articles.map((article) => (
							<ArticleCard
								key={article.id}
								article={article}
								account={state.account}
								handleBuyArticle={onBuyArticle}
							/>
						))}
					</Grid>
				</Container>
			</div>
		</div>
	);
};

export default Articles;
