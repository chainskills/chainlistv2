import React from "react";
import { Container, Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        pt: 12,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          ChainList
        </Typography>
        <Typography variant="h4" align="center" color="textSecondary" paragraph>
          Sell and buy articles over the Ethereum blockchain.
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
