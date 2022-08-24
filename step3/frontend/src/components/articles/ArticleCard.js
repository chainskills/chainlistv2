import React from "react";
import PropTypes from "prop-types";
import { Typography, Grid, Card, CardContent } from "@mui/material";

const ArticleCard = ({ article }) => {
  return (
    <Grid item xs={12} sm={12} md={12}>
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
            {article.price} ETH
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
        </CardContent>
      </Card>
    </Grid>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleCard;
