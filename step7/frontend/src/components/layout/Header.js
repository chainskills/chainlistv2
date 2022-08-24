import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";

const Header = () => {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <StorefrontIcon
            edge="start"
            sx={{
              marginRight: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            ChainList
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
