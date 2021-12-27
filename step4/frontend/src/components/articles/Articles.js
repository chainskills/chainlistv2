import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ArticleDialog from "./ArticleDialog";
import ArticleCard from "./ArticleCard";

// define the styles of our component
const useStyles = makeStyles((theme) => ({
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(3),
	},
	box: {
		height: 100,
		display: "flex",
		border: "0px solid black",
		padding: 8,
	},
	container: {
		display: "flex",
		justifyContent: "center",
	},
}));

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
