import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import NumberFormatCustom from "utils/NumberFormatCustom";

const ArticleDialog = ({
	isDialogOpened,
	handleCloseDialog,
	handleSaveDialog,
}) => {
	const [article, setArticle] = useState({
		name: "",
		description: "",
		price: "0",
		owner: null,
	});
	const [errorName, setErrorName] = useState(false);
	const [errorDescription, setErrorDescription] = useState(false);
	const [errorPrice, setErrorPrice] = useState(false);

	const onChange = (e) => {
		setArticle({
			...article,
			[e.target.name]: e.target.value,
		});
	};

	const handleSave = () => {
		let error = false;

		setErrorName(false);
		if (article.name === "") {
			error = true;
			setErrorName(true);
		}

		setErrorDescription(false);
		if (article.description === "") {
			error = true;
			setErrorDescription(true);
		}

		setErrorPrice(false);
		if (Number(article.price) === 0) {
			error = true;
			setErrorPrice(true);
		}

		if (!error) {
			handleCloseDialog(false);
			handleSaveDialog(article);
		}
	};

	const handleCancel = () => {
		handleCloseDialog(false);
	};

	return (
		<div>
			<Dialog
				open={isDialogOpened}
				onClose={handleCancel}
				aria-labelledby="article-dialog"
			>
				<DialogTitle id="article-dialog">Article</DialogTitle>
				<DialogContent>
					<TextField
						error={errorName}
						helperText={errorName ? "A name is required" : ""}
						autoFocus
						margin="dense"
						name="name"
						value={article.name}
						label="Enter the name of the article"
						fullWidth
						onChange={onChange}
					/>
					<TextField
						error={errorDescription}
						helperText={errorDescription ? "A description is required" : ""}
						margin="dense"
						name="description"
						value={article.description}
						label="Enter the description of the article"
						fullWidth
						onChange={onChange}
					/>
					<TextField
						error={errorPrice}
						helperText={
							errorPrice ? "The price must be greater than 0 ETH" : ""
						}
						label="Price in ETH"
						value={article.price}
						onChange={onChange}
						name="price"
						InputProps={{
							inputComponent: NumberFormatCustom,
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancel} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSave} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

ArticleDialog.propTypes = {
	isDialogOpened: PropTypes.bool.isRequired,
	handleCloseDialog: PropTypes.func.isRequired,
	handleSaveDialog: PropTypes.func.isRequired,
};

export default ArticleDialog;
