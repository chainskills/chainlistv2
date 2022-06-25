import React from "react";
import PropTypes from "prop-types";
import {
	Button,
	Typography,
	Grid,
	Card,
	CardContent,
	CardActions,
} from "@mui/material";

const ArticleCard = ({
	seller,
	name,
	description,
	price,
	account,
	handleBuyArticle,
}) => {
	return (
		<Grid item xs={12} sm={12} md={12}>
			<Card
				elevation={2}
				sx={{ height: "100%", display: "flex", flexDirection: "column" }}
			>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{name}
					</Typography>
					<Typography
						sx={{
							marginBottom: 3,
						}}
						color="textSecondary"
						component="h3"
					>
						{price} ETH
					</Typography>
					<Typography
						sx={{
							marginBottom: 2,
						}}
						variant="body2"
						component="p"
					>
						{description}
					</Typography>
					<Typography
						sx={{
							marginBottom: 2,
						}}
						variant="body2"
						component="p"
					>
						Sold by {seller === account ? "You" : seller}
					</Typography>
				</CardContent>
				<CardActions>
					{seller !== account && (
						<Button
							size="small"
							color="primary"
							variant="contained"
							onClick={async () => {
								await handleBuyArticle();
							}}
						>
							Buy
						</Button>
					)}
				</CardActions>
			</Card>
		</Grid>
	);
};

ArticleCard.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
};

export default ArticleCard;
