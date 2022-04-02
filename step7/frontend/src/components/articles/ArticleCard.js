import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
  position: {
    marginBottom: 12,
  },
}));

const ArticleCard = ({ name, description, price }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography
            className={classes.position}
            color="textSecondary"
            component="h3"
          >
            {price} ETH
          </Typography>
          <Typography
            className={classes.position}
            variant="body2"
            component="p"
          >
            {description}
          </Typography>
        </CardContent>
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
