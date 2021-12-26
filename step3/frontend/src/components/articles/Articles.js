import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ArticleDialog from "./ArticleDialog";
import ArticleCard from "./ArticleCard";

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

	const [isOpen, setIsOpen] = useState(false);

	const [selectedTab, setSelectedTab] = React.useState(0);

	const handleChangeSelector = async (event, newSelection) => {
		setSelectedTab(newSelection);
	};

	const onSellArticle = async (_article) => {
		setArticle(_article);
	};

	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div>
			<div>
				<Container className={classes.container}>
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
