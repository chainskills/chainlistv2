import React, { useState } from "react";
import { Container, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArticleDialog from "./ArticleDialog";
import ArticleCard from "./ArticleCard";


const Articles = () => {
	const classes = useStyles();

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
			<div>
				<Container className={classes.cardGrid} maxWidth="md">
					<Fab
						aria-label="Add"
						className={classes.fab}
						color="primary"
						onClick={handleOpen}
					>
						<AddIcon />
					</Fab>

					<ArticleDialog
						isDialogOpened={isOpen}
						handleCloseDialog={() => setIsOpen(false)}
						handleSaveDialog={onSellArticle}
					/>

					{article.name !== "" && (
						<Grid container spacing={4}>
							<ArticleCard article={article} />
						</Grid>
					)}
				</Container>
			</div>
		</div>
	);
};

export default Articles;
