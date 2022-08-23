import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useStore } from "context/StoreProvider";

const Header = () => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    if (showEventsStatus) {
      showEvents(state, dispatch);
    } else {
      hideEvents(state, dispatch);
    }
    // eslint-disable-next-line
  }, [showEventsStatus]);

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
