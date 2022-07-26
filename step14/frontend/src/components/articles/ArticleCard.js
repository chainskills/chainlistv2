import PropTypes from "prop-types";
import {
	Button,
	Typography,
	Grid,
	Card,
	CardContent,
	CardActions,
} from "@mui/material";
import { ethers } from "ethers";

const ArticleCard = ({ article, account, handleBuyArticle }) => {
	return (
		<Grid item key={article.id} xs={12} sm={12} md={12}>
			{article.id && (
				<Card
					elevation={2}
					sx={{ height: "100%", display: "flex", flexDirection: "column" }}
				>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{article.name}
						</Typography>
						<Typography
							sx={{
								marginBottom: 3,
							}}
							color="textSecondary"
							component="h3"
						>
							{ethers.utils.formatEther(article.price)} ETH
						</Typography>
						<Typography
							sx={{
								marginBottom: 2,
							}}
							variant="body2"
							component="p"
						>
							{article.description}
						</Typography>
						<Typography
							sx={{
								marginBottom: 2,
							}}
							variant="body2"
							component="p"
						>
							Sold by {article.owner === account ? "You" : article.owner}
						</Typography>
					</CardContent>
					<CardActions>
						{article.owner !== account && (
							<Button
								size="small"
								color="primary"
								variant="contained"
								onClick={async () => {
									await handleBuyArticle(article);
								}}
							>
								Buy
							</Button>
						)}
					</CardActions>
				</Card>
			)}
		</Grid>
	);
};

ArticleCard.propTypes = {
	article: PropTypes.array.isRequired,
	account: PropTypes.string.isRequired,
	handleBuyArticle: PropTypes.func.isRequired,
};

export default ArticleCard;
