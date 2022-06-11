import React, { useState } from "react";
import { Container, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArticleDialog from "./ArticleDialog";
import ArticleCard from "./ArticleCard";
import { useStore } from "context/StoreProvider";
import { sellArticle } from "context/web3Actions";

const Articles = () => {
	const [state, dispatch] = useStore();

	// flag used to display or hide the modal dialog box
	const [isOpen, setIsOpen] = useState(false);

	// manage the display of the dialog box
	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	// called when we add the article to be sold
	const onSellArticle = async (_article) => {
		await sellArticle(state, dispatch, _article);
	};

	return (
		<div>
			<div>
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

					{state.articleName !== "" && (
						<Grid container spacing={4} sx={{ pb: 2 }}>
							<ArticleCard
								name={state.articleName}
								description={state.articleDescription}
								price={state.articlePrice}
							/>
						</Grid>
					)}
				</Container>
			</div>
		</div>
	);
};

export default Articles;
