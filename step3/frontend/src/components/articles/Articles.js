import React, { useState } from "react";
import { Container, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArticleDialog from "./ArticleDialog";
import ArticleCard from "./ArticleCard";

const Articles = () => {
	const [article, setArticle] = useState({
		name: "",
		description: "",
		price: 0,
	});

	// flag used to display or hide the modal dialog box
	const [isOpen, setIsOpen] = useState(false);

	// manage the display of the dialog box
	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	// called when we add the article to be sold
	const onSellArticle = async (_article) => {
		setArticle(_article);
	};

	return (
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

				{article.name !== "" && (
					<Grid container spacing={4} sx={{ pb: 2 }}>
						<ArticleCard article={article} />
					</Grid>
				)}
			</Container>
		</div>
	);
};

export default Articles;
